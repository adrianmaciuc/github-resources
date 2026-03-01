import { buildResultsMarkup } from "./search-utils.js";

const input = document.querySelector("[data-search-input]");
const results = document.querySelector("[data-search-results]");
const list = document.querySelector(".snippet-list");

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
  results.innerHTML = buildResultsMarkup(items);
  toggleListVisibility(false);
};

const clearSearch = () => {
  if (results) results.innerHTML = "";
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
