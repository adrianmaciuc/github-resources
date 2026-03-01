import { describe, it, expect } from "vitest";
import { parseHTML } from "linkedom";

describe("search DOM behavior", () => {
  it("filters cards and highlights matches, then clears highlights on empty input", async () => {
    const html = `
      <div>
        <div class="snippet-list">
          <article class="snippet-card" data-snippet-url="/snippets/one" data-snippet-slug="one">
            <section class="snippet-card__code"><pre><code>console.log('one');</code></pre></section>
          </article>
          <article class="snippet-card" data-snippet-url="/snippets/two" data-snippet-slug="two">
            <section class="snippet-card__code"><pre><code>console.log('two');</code></pre></section>
          </article>
        </div>
        <input data-search-input />
        <div data-search-results></div>
      </div>
    `;

    const { document, window } = parseHTML(html);
    // expose DOM globals expected by the module
    globalThis.document = document;
    globalThis.window = window;

    // mock pagefind to return a result for '/snippets/one' when query contains 'one'
    window.pagefind = async () => ({
      search: async (query) => {
        const results = [];
        if (query.toLowerCase().includes("one")) {
          results.push({ data: async () => ({ url: "/snippets/one" }) });
        }
        return { results };
      },
    });

    // import module after DOM and pagefind are in place
    await import("../src/assets/search.js");

    const input = document.querySelector("[data-search-input]");
    const cards = document.querySelectorAll(".snippet-card");

    // trigger a search for 'one'
    input.value = "one";
    input.dispatchEvent(new window.Event("input", { bubbles: true }));
    await new Promise((r) => setTimeout(r, 20));

    const first = cards[0];
    const second = cards[1];

    // first card should be visible, second hidden
    expect(first.classList.contains("is-hidden")).toBe(false);
    expect(first.style.display).not.toBe("none");
    expect(second.classList.contains("is-hidden")).toBe(true);

    // highlight should be present in first card
    const hits = first.querySelectorAll(".search-hit");
    expect(hits.length).toBeGreaterThan(0);

    // clear the input
    input.value = "";
    input.dispatchEvent(new window.Event("input", { bubbles: true }));
    await new Promise((r) => setTimeout(r, 20));

    // both cards should be visible again and highlights removed
    expect(first.classList.contains("is-hidden")).toBe(false);
    expect(second.classList.contains("is-hidden")).toBe(false);
    expect(document.querySelectorAll(".search-hit").length).toBe(0);
  });
});
