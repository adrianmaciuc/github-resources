import { describe, it, expect } from "vitest";

const isValidSnippet = (data) => {
  if (!data) return false;
  if (typeof data.title !== "string" || data.title.trim() === "") return false;
  if (typeof data.description !== "string" || data.description.trim() === "") return false;
  if (typeof data.category !== "string" || data.category.trim() === "") return false;
  if (!Array.isArray(data.tags) || data.tags.length === 0) return false;
  if (typeof data.language !== "string" || data.language.trim() === "") return false;
  if (typeof data.date !== "string" || data.date.trim() === "") return false;
  return true;
};

const compareByDateDesc = (a, b) => {
  const aDate = new Date(a.date).getTime();
  const bDate = new Date(b.date).getTime();
  if (Number.isNaN(aDate) || Number.isNaN(bDate)) return 0;
  return bDate - aDate;
};

describe("snippet metadata", () => {
  it("validates required frontmatter fields", () => {
    expect(
      isValidSnippet({
        title: "Title",
        description: "Desc",
        category: "Cat",
        tags: ["a"],
        language: "js",
        date: "2026-03-01",
      })
    ).toBe(true);

    expect(
      isValidSnippet({
        title: "",
        description: "Desc",
        category: "Cat",
        tags: ["a"],
        language: "js",
        date: "2026-03-01",
      })
    ).toBe(false);
  });

  it("sorts snippets by date descending", () => {
    const items = [
      { date: "2026-03-01", title: "A" },
      { date: "2025-01-10", title: "B" },
      { date: "2026-02-15", title: "C" },
    ];

    const sorted = [...items].sort(compareByDateDesc);
    expect(sorted.map((item) => item.title)).toEqual(["A", "C", "B"]);
  });
});
