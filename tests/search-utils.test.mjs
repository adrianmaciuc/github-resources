import { describe, it, expect } from "vitest";
import { buildResultsMessage, getVisibleUrlSet, normalizePath } from "../src/assets/search-utils.js";
import { getVisibleSlugSet, extractSlug } from "../src/assets/search-utils.js";

describe("search utils", () => {
  it("normalizes URLs by removing trailing slash", () => {
    expect(normalizePath("/a/"))
      .toBe("/a");
  });

  it("builds a visible URL set from items", () => {
    const items = [
      { url: "/a/" },
      { url: "/b" },
    ];
    const set = getVisibleUrlSet(items);
    expect(set.has("/a")).toBe(true);
    expect(set.has("/b")).toBe(true);
  });

  it("builds visible slug set and extract slug", () => {
    const items = [{ url: "/content/snippets/one/" }, { url: "/content/snippets/two" }];
    const set = getVisibleSlugSet(items);
    expect(set.has("one")).toBe(true);
    expect(set.has("two")).toBe(true);
    expect(extractSlug("/a/b/c")).toBe("c");
  });

  it("returns a results message", () => {
    expect(buildResultsMessage(0)).toBe("No matching snippets.");
    expect(buildResultsMessage(1)).toBe("Showing 1 result.");
    expect(buildResultsMessage(2)).toBe("Showing 2 results.");
  });
});
