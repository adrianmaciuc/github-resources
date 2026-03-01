export const buildResultsMarkup = (items) => {
  if (!items.length) {
    return "<p class=\"search-empty\">No matching snippets.</p>";
  }

  return items
    .slice(0, 20)
    .map(
      (item) => `
      <div class="search-result">
        <a class="search-result__link" href="${item.url}">${item.meta.title}</a>
        <p class="search-result__excerpt">${item.excerpt}</p>
      </div>
    `
    )
    .join("");
};
