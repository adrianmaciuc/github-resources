++ (function () {
  // runtime search script (non-module) for browsers. This duplicates the
  // small utilities from search-utils.js to avoid needing ESM imports at
  // runtime (keeps the bundle compatible with the shipped pagefind bundle).

  const normalizePath = function (url) {
    try {
      const parsed = new URL(url, "http://local");
      return parsed.pathname.replace(/\/$/, "");
    } catch (e) {
      return String(url).replace(/\/$/, "");
    }
  };

  const getVisibleUrlSet = function (items) {
    return new Set(items.map(function (item) { return normalizePath(item.url); }));
  };

  const getSlugFromUrl = function (url) {
    const path = normalizePath(url);
    const parts = path.split("/").filter(Boolean);
    return parts.length ? parts[parts.length - 1] : "";
  };

  const getVisibleSlugSet = function (items) {
    return new Set(items.map(function (item) { return getSlugFromUrl(item.url); }));
  };

  const buildResultsMessage = function (count) {
    if (!count) return "No matching snippets.";
    return "Showing " + count + " result" + (count === 1 ? "" : "s") + ".";
  };

  const input = document.querySelector("[data-search-input]");
  const results = document.querySelector("[data-search-results]");
  const list = document.querySelector(".snippet-list");
  const cards = Array.from(document.querySelectorAll("[data-snippet-url]"));

  if (!input || !results) return;

  var setResultsMessage = function (text) {
    if (!results) return;
    results.textContent = text;
  };

  var toggleListVisibility = function (show) {
    if (!list) return;
    list.style.display = show ? "" : "none";
  };

  var renderSearchResults = function (items) {
    if (!results) return;
    var visible = getVisibleUrlSet(items);
    var slugs = getVisibleSlugSet(items);
    cards.forEach(function (card) {
      var url = normalizePath(card.dataset.snippetUrl || "");
      var slug = card.dataset.snippetSlug || "";
      var show = visible.has(url) || slugs.has(slug);
      if (show) {
        card.classList.remove("is-hidden");
        card.style.display = "";
      } else {
        card.classList.add("is-hidden");
        setTimeout(function () {
          if (card.classList.contains("is-hidden")) card.style.display = "none";
        }, 240);
      }
    });
    var visibleCount = Array.from(cards).filter(function (c) { return !c.classList.contains("is-hidden"); }).length;
    results.textContent = buildResultsMessage(visibleCount);
    toggleListVisibility(true);
  };

  var clearSearch = function () {
    if (results) results.textContent = "";
    cards.forEach(function (card) {
      card.classList.remove("is-hidden");
      card.style.display = "";
      var code = card.querySelector('.snippet-card__code');
      if (code && code.dataset.originalHtml) {
        code.innerHTML = code.dataset.originalHtml;
      }
    });
    toggleListVisibility(true);
  };

  var waitForPagefind = function (timeout) {
    timeout = timeout || 3000;
    var start = Date.now();
    return new Promise(function (resolve) {
      (function poll() {
        if (window.pagefind) return resolve(window.pagefind);
        if (Date.now() - start > timeout) return resolve(null);
        setTimeout(poll, 50);
      })();
    });
  };

  (async function init() {
    var pagefindInit = await waitForPagefind();
    if (!pagefindInit) return;
    var pagefind = await pagefindInit();

    input.addEventListener("input", async function () {
      var query = (input.value || "").trim();
      if (!query) {
        clearSearch();
        return;
      }

      var search = await pagefind.search(query);
      var data = await Promise.all(search.results.map(function (r) { return r.data(); }));
      renderSearchResults(data);

      var terms = query.split(/\s+/).filter(Boolean).map(function (t) { return t.toLowerCase(); });
      cards.forEach(function (card) {
        var code = card.querySelector('.snippet-card__code');
        if (!code) return;
        if (code.dataset.originalHtml) {
          code.innerHTML = code.dataset.originalHtml;
        } else {
          code.dataset.originalHtml = code.innerHTML;
        }
        if (!card.classList.contains('is-hidden')) {
          var html = code.innerHTML;
          terms.forEach(function (term) {
            var re = new RegExp('(' + term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&') + ')', 'ig');
            html = html.replace(re, '<span class="search-hit">$1</span>');
          });
          code.innerHTML = html;
        }
      });
    });
  })();

})();
