import type { SaveFishEntry } from '../types';
import { ensureArray, extractDictItems, normalizeItemId, num, str } from './util';

/** Parse the fish-caught dictionary from the player node into catch counts and largest sizes. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseFishCaught(fishCaught: any): SaveFishEntry[] {
  const result: SaveFishEntry[] = [];
  for (const item of extractDictItems(fishCaught)) {
    const key = item.key as Record<string, unknown>;
    const val = item.value as Record<string, unknown>;
    const id = normalizeItemId(str(key?.string));
    if (!id) continue;

    const ints = ensureArray((val?.ArrayOfInt as Record<string, unknown>)?.int).map(num);

    result.push({
      id,
      timesCaught: ints[0] ?? 0,
      largestSize: ints[1] ?? -1,
    });
  }
  return result;
}
