/** Strip item type prefix: "(O)129" → "129", "(BC)10" → "10", plain "773" → "773" */
export function normalizeItemId(raw: string): string {
  return String(raw).replace(/^\([A-Z]+\)/, '');
}

/** Safely read a numeric value from a parsed XML node, defaulting to 0. */
export function num(value: unknown): number {
  if (value === undefined || value === null) return 0;
  const n = Number(value);
  return isNaN(n) ? 0 : n;
}

/** Safely read a string value from a parsed XML node. */
export function str(value: unknown, fallback = ''): string {
  if (value === undefined || value === null) return fallback;
  return String(value);
}

/** Ensure a value is always an array, even if the parser returned a single object. */
export function ensureArray<T>(value: T | T[] | undefined | null): T[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * Extract key-value items from a parsed XML dictionary structure.
 * Handles the `{ item: [{ key: ..., value: ... }] }` pattern used throughout save files.
 */
export function extractDictItems(dict: unknown): Array<{ key: unknown; value: unknown }> {
  if (!dict || typeof dict !== 'object') return [];
  const d = dict as Record<string, unknown>;
  return ensureArray(d.item as Array<{ key: unknown; value: unknown }>);
}
