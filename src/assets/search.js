import { buildResultsMessage, getVisibleUrlSet, normalizePath } from "./search-utils.js";

const input = document.querySelector("[data-search-input]");
const results = document.querySelector("[data-search-results]");
const list = document.querySelector(".snippet-list");
const cards = Array.from(document.querySelectorAll("[data-snippet-url]"));

const setResultsMessage = (text) => {
  if (!results) return;
  results.textContent = text;
};

const toggleListVisibility = (show) => {
  if (!list) return;
  list.style.display = show ? "" : "none";
};

const renderSearchResults = (items) => {
  if (!results) return;
  const visible = getVisibleUrlSet(items);
  // also compute slugs to match per-snippet slugs
  const slugs = getVisibleSlugSet(items);
  cards.forEach((card) => {
    const url = normalizePath(card.dataset.snippetUrl || "");
    const slug = card.dataset.snippetSlug || "";
    const show = visible.has(url) || slugs.has(slug);
    card.style.display = show ? "" : "none";
  });
  results.textContent = buildResultsMessage(
    Array.from(cards).filter((c) => c.style.display !== "none").length
  );
  toggleListVisibility(true);
};

const clearSearch = () => {
  if (results) results.textContent = "";
  cards.forEach((card) => {
    card.style.display = "";
  });
  toggleListVisibility(true);
};

const init = async () => {
  if (!input || !results) return;
  if (!window.pagefind) return;

  const pagefind = await window.pagefind();
  input.addEventListener("input", async () => {
    const query = input.value.trim();
    if (!query) {
      clearSearch();
      return;
    }

    const search = await pagefind.search(query);
    const data = await Promise.all(search.results.map((r) => r.data()));
    renderSearchResults(data);
  });
};

init();
