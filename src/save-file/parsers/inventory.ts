import type { SaveItem } from '../types';
import { ensureArray, normalizeItemId, num, str } from './util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseInventory(items: any): SaveItem[] {
  const result: SaveItem[] = [];
  for (const item of ensureArray(items?.Item)) {
    const i = item as Record<string, unknown>;
    const name = str(i.name);
    if (!name) continue;

    const xsiType = str(
      (i as Record<string, string>)['@_xsi:type'] ?? (i as Record<string, string>)['@_type'],
    );

    result.push({
      id: normalizeItemId(str(i.itemId)),
      name,
      type: xsiType,
      stack: num(i.stack) || 1,
      quality: num(i.quality),
    });
  }
  return result;
}
