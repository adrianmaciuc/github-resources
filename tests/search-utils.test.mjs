import { describe, it, expect } from "vitest";
import { buildResultsMarkup } from "../src/assets/search-utils.js";

describe("search utils", () => {
  it("renders results markup for items", () => {
    const items = [
      {
        url: "/a",
        meta: { title: "First" },
        excerpt: "Alpha",
      },
      {
        url: "/b",
        meta: { title: "Second" },
        excerpt: "Beta",
      },
    ];

    const markup = buildResultsMarkup(items);
    expect(markup).toContain("search-result");
    expect(markup).toContain("First");
    expect(markup).toContain("Second");
  });

  it("returns empty message when no items", () => {
    const markup = buildResultsMarkup([]);
    expect(markup).toContain("No matching snippets.");
  });
});
