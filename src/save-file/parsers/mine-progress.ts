import type { SaveMineProgress } from '../types';
import { num } from './util';

/** Parse mine and Skull Cavern progress from the player node, save file root, and mail flags. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseMineProgress(player: any, root: any, mail: Set<string>): SaveMineProgress {
  const deepest = num(player.deepestMineLevel);
  return {
    deepestMineLevel: Math.min(deepest, 120),
    deepestSkullCavernLevel: deepest > 120 ? deepest - 120 : 0,
    hasRustyKey:
      mail.has('HasRustyKey') ||
      mail.has('ccBoilerRoom') ||
      num(root.mine_lowestLevelReached) >= 120,
    hasSkullKey: mail.has('HasSkullKey') || deepest >= 120,
  };
}
