import { describe, it, expect } from "vitest";
import { parseHTML } from "linkedom";

const renderSnippetCard = (snippet) => {
  return `
    <article class="snippet-card" data-category="${snippet.category}">
      <header class="snippet-card__header">
        <h2 class="snippet-card__title">${snippet.title}</h2>
        <p class="snippet-card__description">${snippet.description}</p>
      </header>
      <ul class="snippet-card__tags">
        ${snippet.tags.map((tag) => `<li class=\"tag\">${tag}</li>`).join("")}
      </ul>
      <section class="snippet-card__code">${snippet.content}</section>
    </article>
  `;
};

describe("SnippetCard HTML", () => {
  it("renders title, description, tags, and code", () => {
    const snippet = {
      title: "Title",
      description: "Desc",
      category: "Tooling",
      tags: ["a", "b"],
      content: "<pre><code>test</code></pre>",
    };

    const { document } = parseHTML(renderSnippetCard(snippet));
    expect(document.querySelector(".snippet-card__title")?.textContent).toBe(
      "Title"
    );
    expect(
      document.querySelector(".snippet-card__description")?.textContent
    ).toBe("Desc");
    expect(document.querySelectorAll(".tag").length).toBe(2);
    expect(document.querySelector(".snippet-card__code pre code")).toBeTruthy();
  });
});
