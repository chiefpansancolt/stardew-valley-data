import { ensureArray, num } from './util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseAchievements(achievements: any): number[] {
  return ensureArray(achievements?.int).map(num);
}
