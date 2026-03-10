import type { SaveShippedEntry } from '../types';
import { extractDictItems, normalizeItemId, num, str } from './util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseShipped(basicShipped: any): SaveShippedEntry[] {
  const result: SaveShippedEntry[] = [];
  for (const item of extractDictItems(basicShipped)) {
    const key = item.key as Record<string, unknown>;
    const val = item.value as Record<string, unknown>;
    const id = normalizeItemId(str(key?.string));
    if (!id) continue;

    result.push({
      id,
      count: num(val?.int),
    });
  }
  return result;
}
