import type { SaveRarecrows } from '../../types';
import { ensureArray, extractDictItems, str } from '../util';

function collectFromItems(items: unknown, ids: Set<string>): void {
  for (const item of ensureArray(items as unknown[])) {
    const it = item as Record<string, unknown>;
    if (str(it.name) === 'Rarecrow') {
      ids.add(str(it.itemId));
    }
  }
}

function collectFromObjects(objects: unknown, ids: Set<string>): void {
  for (const { value } of extractDictItems(objects)) {
    const obj = (value as Record<string, unknown>)?.Object as Record<string, unknown>;
    if (!obj) continue;
    if (str(obj.name) === 'Rarecrow') {
      ids.add(str(obj.itemId));
    }
    // Also check items stored inside chests and other containers
    if (obj.items) {
      collectFromItems((obj.items as Record<string, unknown>).Item, ids);
    }
  }
}

/** Parse all placed rarecrow item IDs from every game location (including building interiors). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseRarecrows(root: any): SaveRarecrows {
  const ids = new Set<string>();
  const locations = ensureArray(root.locations?.GameLocation);

  for (const loc of locations) {
    const l = loc as Record<string, unknown>;
    collectFromObjects(l.objects, ids);

    const buildings = ensureArray((l.buildings as Record<string, unknown>)?.Building);
    for (const building of buildings) {
      const b = building as Record<string, unknown>;
      collectFromObjects((b.indoors as Record<string, unknown>)?.objects, ids);
    }
  }

  return { placed: Array.from(ids) };
}
