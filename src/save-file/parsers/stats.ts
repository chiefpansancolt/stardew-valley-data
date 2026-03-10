import type { SaveStats } from '../types';
import { ensureArray, num } from './util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseStats(player: any): SaveStats {
  const raw: Record<string, number> = {};
  const items = ensureArray(player.stats?.Values?.item) as Array<Record<string, unknown>>;

  for (const item of items) {
    const key = (item.key as Record<string, unknown>)?.string as string;
    const val = num((item.value as Record<string, unknown>)?.unsignedInt);
    if (key) raw[key] = val;
  }

  return {
    daysPlayed: raw.daysPlayed ?? 0,
    stepsTaken: raw.stepsTaken ?? 0,
    fishCaught: raw.fishCaught ?? 0,
    itemsShipped: raw.itemsShipped ?? 0,
    itemsForaged: raw.itemsForaged ?? 0,
    itemsCrafted: raw.itemsCrafted ?? 0,
    itemsCooked: raw.itemsCooked ?? 0,
    monstersKilled: raw.monstersKilled ?? 0,
    questsCompleted: raw.questsCompleted ?? 0,
    geodesCracked: raw.geodesCracked ?? 0,
    giftsGiven: raw.giftsGiven ?? 0,
    timesFished: raw.timesFished ?? 0,
    timesUnconscious: raw.timesUnconscious ?? 0,
    seedsSown: raw.seedsSown ?? 0,
    treesChopped: raw.TreesChopped ?? 0,
    rocksCrushed: raw.rocksCrushed ?? 0,
    raw,
  };
}
