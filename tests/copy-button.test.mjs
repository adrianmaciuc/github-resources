import { describe, it, expect } from "vitest";
import { parseHTML } from "linkedom";

const renderSnippetCard = (snippet) => {
  return `
    <article class="snippet-card">
      <section class="snippet-card__code" data-copy-scope>
        <button class="code-copy" type="button" data-copy-button>Copy</button>
        ${snippet.content}
      </section>
    </article>
  `;
};

describe("copy button markup", () => {
  it("renders a copy button for code blocks", () => {
    const snippet = {
      content: "<pre><code>test</code></pre>",
    };

    const { document } = parseHTML(renderSnippetCard(snippet));
    const button = document.querySelector(".code-copy");
    expect(button).toBeTruthy();
  });
});
