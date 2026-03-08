import { buildResultsMessage, getVisibleUrlSet, normalizePath, getVisibleSlugSet } from "./search-utils.js";

const input = document.querySelector("[data-search-input]");
const results = document.querySelector("[data-search-results]");
const list = document.querySelector(".snippet-list");
const cards = Array.from(document.querySelectorAll("[data-snippet-url]"));

let pagefind = null;

const setResultsMessage = (text) => {
  if (!results) return;
  results.textContent = text;
};

const toggleListVisibility = (show) => {
  if (!list) return;
  list.style.display = show ? "" : "none";
};

const highlightCode = (card, terms) => {
  const code = card.querySelector('.snippet-card__code');
  if (!code) return;

  if (!code.dataset.originalHtml) {
    code.dataset.originalHtml = code.innerHTML;
  }

  // Always restore original first to clear old highlights
  code.innerHTML = code.dataset.originalHtml;

  if (terms && terms.length > 0 && !card.classList.contains('is-hidden')) {
    let html = code.innerHTML;
    terms.forEach((term) => {
      // Simple regex for highlighting - mostly safe for code blocks unless term is a common tag char
      try {
        const re = new RegExp('(' + term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&') + ')', 'ig');
        html = html.replace(re, '<span class="search-hit">$1</span>');
      } catch (e) {
        // ignore invalid regex
      }
    });
    code.innerHTML = html;
  }
};

const renderSearchResults = (items) => {
  const visible = getVisibleUrlSet(items);
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
      setTimeout(() => {
        if (card.classList.contains("is-hidden")) card.style.display = "none";
      }, 240);
    }
  });

  const visibleCount = Array.from(cards).filter((c) => !c.classList.contains("is-hidden")).length;
  setResultsMessage(buildResultsMessage(visibleCount));
  toggleListVisibility(true);
};

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

    highlightCode(card, terms);
  });

  const visibleCount = Array.from(cards).filter((c) => !c.classList.contains('is-hidden')).length;
  setResultsMessage(buildResultsMessage(visibleCount));
  toggleListVisibility(true);
};

const clearSearch = () => {
  if (results) results.textContent = "";
  cards.forEach((card) => {
    card.classList.remove("is-hidden");
    card.style.display = "";
    highlightCode(card, null);
  });
  toggleListVisibility(true);
};

const initPagefind = async () => {
  // Wait for window.pagefind to be available
  const waitForPagefind = () => {
    return new Promise((resolve) => {
      let count = 0;
      const check = () => {
        if (window.pagefind) {
          resolve(window.pagefind);
        } else if (count < 50) { // Try for ~2.5s
          count++;
          setTimeout(check, 50);
        } else {
          resolve(null);
        }
      };
      check();
    });
  };

  const pfFactory = await waitForPagefind();
  if (pfFactory) {
    try {
      pagefind = await pfFactory();
      // If there's already input, re-run search with pagefind
      if (input.value.trim()) {
         input.dispatchEvent(new Event('input'));
      }
    } catch (e) {
      console.error("Failed to initialize Pagefind", e);
    }
  }
};

const init = () => {
  if (!input) return;

  // Start checking for Pagefind availability in background
  initPagefind();

  input.addEventListener('input', async () => {
    const query = input.value.trim();
    
    if (!query) {
      clearSearch();
      return;
    }

    if (pagefind) {
      try {
        const search = await pagefind.search(query);
        const data = await Promise.all(search.results.map((r) => r.data()));
        renderSearchResults(data);
        
        // Highlight terms using the query words
        const terms = query.split(/\s+/).filter(Boolean).map((t) => t.toLowerCase());
        cards.forEach(card => highlightCode(card, terms));
      } catch (e) {
        console.error("Pagefind search failed, falling back to local", e);
        localSearch(query);
      }
    } else {
      localSearch(query);
    }
  });
};

init();
