import type { Season } from '@/types';
import type { SaveDate } from '../../types';
import { num, str } from '../util';

function getStatDaysPlayed(player: Record<string, unknown>): number {
  const stats = player.stats as Record<string, unknown> | undefined;
  if (!stats) return 0;
  const values = stats.Values as Record<string, unknown> | undefined;
  if (!values) return 0;
  const items = Array.isArray(values.item) ? values.item : [values.item];
  for (const item of items) {
    const i = item as Record<string, unknown>;
    const key = (i.key as Record<string, unknown>)?.string;
    if (key === 'daysPlayed') {
      return num((i.value as Record<string, unknown>)?.unsignedInt);
    }
  }
  return 0;
}

/** Extract the current in-game date (year, season, day, total days played) from the player node and save file root. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseDate(player: any, root: any): SaveDate {
  return {
    year: num(root.year),
    season: str(root.currentSeason) as Season,
    day: num(root.dayOfMonth),
    totalDaysPlayed: getStatDaysPlayed(player),
  };
}
