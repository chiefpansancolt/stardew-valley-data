import { ensureArray, num } from '../util';

/** Extract the list of unlocked achievement IDs from the player node. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseAchievements(achievements: any): number[] {
  return ensureArray(achievements?.int).map(num);
}
