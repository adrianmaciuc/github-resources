export const normalizePath = (url) => {
  try {
    const parsed = new URL(url, "http://local");
    return parsed.pathname.replace(/\/$/, "");
  } catch {
    return String(url).replace(/\/$/, "");
  }
};

export const getVisibleUrlSet = (items) => {
  return new Set(items.map((item) => normalizePath(item.url)));
};

export const getSlugFromUrl = (url) => {
  const path = normalizePath(url);
  const parts = path.split("/").filter(Boolean);
  return parts.length ? parts[parts.length - 1] : "";
};

export const getVisibleSlugSet = (items) => {
  return new Set(items.map((item) => getSlugFromUrl(item.url)));
};

// helper used in tests
export const extractSlug = (path) => {
  const parts = String(path).split("/").filter(Boolean);
  return parts.length ? parts[parts.length - 1] : "";
};

export const buildResultsMessage = (count) => {
  if (!count) return "No matching snippets.";
  return `Showing ${count} result${count === 1 ? "" : "s"}.`;
};
