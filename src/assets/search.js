import { buildResultsMessage, getVisibleUrlSet, normalizePath, getVisibleSlugSet } from "./search-utils.js";

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
    if (show) {
      card.classList.remove("is-hidden");
      card.style.display = "";
    } else {
      card.classList.add("is-hidden");
      // leave in layout for animation, but shrink after 220ms
      setTimeout(() => {
        if (card.classList.contains("is-hidden")) card.style.display = "none";
      }, 240);
    }
  });
  const visibleCount = Array.from(cards).filter((c) => !c.classList.contains("is-hidden")).length;
  results.textContent = buildResultsMessage(visibleCount);
  toggleListVisibility(true);
};

const clearSearch = () => {
  if (results) results.textContent = "";
  cards.forEach((card) => {
    // restore visible state
    card.classList.remove("is-hidden");
    card.style.display = "";

    // restore original code content (remove highlights) if we saved it
    const code = card.querySelector('.snippet-card__code');
    if (code && code.dataset.originalHtml) {
      code.innerHTML = code.dataset.originalHtml;
    }
  });
  toggleListVisibility(true);
};

const init = async () => {
  if (!input || !results) return;

  // Use a lightweight client-side search over rendered cards. This avoids
  // fighting the different ways pagefind is shipped and ensures search is
  // functional without the full pagefind UI integration.
  const localSearch = (query) => {
    const terms = query.split(/\s+/).filter(Boolean).map((t) => t.toLowerCase());
    cards.forEach((card) => {
      const title = (card.querySelector('.snippet-card__title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.snippet-card__description')?.textContent || '').toLowerCase();
      const tags = Array.from(card.querySelectorAll('.tag')).map((n) => n.textContent.toLowerCase()).join(' ');
      const codeText = (card.querySelector('.snippet-card__code')?.textContent || '').toLowerCase();
      const hay = `${title} ${desc} ${tags} ${codeText}`;
      const show = terms.every((t) => hay.includes(t));
      if (show) {
        card.classList.remove('is-hidden');
        card.style.display = '';
      } else {
        card.classList.add('is-hidden');
        setTimeout(() => {
          if (card.classList.contains('is-hidden')) card.style.display = 'none';
        }, 240);
      }

      const code = card.querySelector('.snippet-card__code');
      if (code) {
        if (!code.dataset.originalHtml) code.dataset.originalHtml = code.innerHTML;
        if (!card.classList.contains('is-hidden')) {
          let html = code.dataset.originalHtml;
          terms.forEach((term) => {
            const re = new RegExp('(' + term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&') + ')', 'ig');
            html = html.replace(re, '<span class="search-hit">$1</span>');
          });
          code.innerHTML = html;
        } else if (code.dataset.originalHtml) {
          code.innerHTML = code.dataset.originalHtml;
        }
      }
    });
    const visibleCount = Array.from(cards).filter((c) => !c.classList.contains('is-hidden')).length;
    setResultsMessage(buildResultsMessage(visibleCount));
    toggleListVisibility(true);
  };

  input.addEventListener('input', () => {
    const query = input.value.trim();
    if (!query) {
      clearSearch();
      return;
    }
    localSearch(query);
  });
};

init();
