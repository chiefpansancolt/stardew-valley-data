import type { SaveMonsterKillEntry } from '../types';
import { extractDictItems, num, str } from './util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseMonstersKilled(player: any): SaveMonsterKillEntry[] {
  const result: SaveMonsterKillEntry[] = [];
  const items = extractDictItems(player.stats?.specificMonstersKilled);

  for (const item of items) {
    const key = item.key as Record<string, unknown>;
    const val = item.value as Record<string, unknown>;
    const name = str(key?.string);
    if (!name) continue;

    result.push({
      name,
      count: num(val?.int),
    });
  }
  return result.sort((a, b) => b.count - a.count);
}
