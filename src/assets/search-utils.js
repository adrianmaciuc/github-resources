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

export const buildResultsMessage = (count) => {
  if (!count) return "No matching snippets.";
  return `Showing ${count} result${count === 1 ? "" : "s"}.`;
};
