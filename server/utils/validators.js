import sanitizeHtml from "sanitize-html";

export const sanitizeText = (value, maxLength = 1000) =>
  sanitizeHtml(String(value || ""), { allowedTags: [], allowedAttributes: {} })
    .trim()
    .slice(0, maxLength);

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());

export const pickSafeMetadata = (value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const output = {};
  const entries = Object.entries(value).slice(0, 20);
  entries.forEach(([key, rawVal]) => {
    const safeKey = sanitizeText(key, 50);
    if (!safeKey) return;
    if (typeof rawVal === "string") output[safeKey] = sanitizeText(rawVal, 300);
    else if (typeof rawVal === "number" || typeof rawVal === "boolean" || rawVal === null) output[safeKey] = rawVal;
  });
  return output;
};
