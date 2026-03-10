import type { SaveCollectionEntry, SaveMuseum } from '../types';
import { ensureArray, extractDictItems, num, str } from './util';

function parseDonations(root: Record<string, unknown>): string[] {
  const locations = ensureArray((root.locations as Record<string, unknown>)?.GameLocation);
  for (const loc of locations) {
    const l = loc as Record<string, unknown>;
    if (str(l.name) !== 'ArchaeologyHouse') continue;

    const pieces = ensureArray((l.museumPieces as Record<string, unknown>)?.item);
    return pieces
      .map((p) => {
        const item = p as Record<string, unknown>;
        const val = item.value as Record<string, unknown>;
        return str(val?.string);
      })
      .filter(Boolean);
  }
  return [];
}

function parseFoundItems(data: unknown): SaveCollectionEntry[] {
  const result: SaveCollectionEntry[] = [];
  for (const item of extractDictItems(data)) {
    const key = item.key as Record<string, unknown>;
    const val = item.value as Record<string, unknown>;
    const id = str(key?.string);
    if (!id) continue;

    // archaeologyFound has ArrayOfInt [timesFound, timesDonated]
    // mineralsFound has just int count
    let count: number;
    const arr = val?.ArrayOfInt as Record<string, unknown> | undefined;
    if (arr) {
      const ints = ensureArray(arr.int).map(num);
      count = ints[0] ?? 0;
    } else {
      count = num(val?.int);
    }

    result.push({ id, count });
  }
  return result;
}

/** Parse museum donations, artifacts found, and minerals found from the save file root and player node. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseMuseum(root: any, player: any): SaveMuseum {
  return {
    donations: parseDonations(root),
    artifactsFound: parseFoundItems(player.archaeologyFound),
    mineralsFound: parseFoundItems(player.mineralsFound),
  };
}
