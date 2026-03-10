import type { SaveFriendship } from '../types';
import { extractDictItems, num, str } from './util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseFriendships(friendshipData: any): SaveFriendship[] {
  const result: SaveFriendship[] = [];
  for (const item of extractDictItems(friendshipData)) {
    const key = item.key as Record<string, unknown>;
    const val = item.value as Record<string, unknown>;
    const name = str(key?.string);
    if (!name) continue;

    const friendship = val?.Friendship as Record<string, unknown>;
    const points = num(friendship?.Points);

    result.push({
      name,
      points,
      hearts: Math.floor(points / 250),
      status: str(friendship?.Status, 'Friendly'),
      giftsThisWeek: num(friendship?.GiftsThisWeek),
    });
  }
  return result.sort((a, b) => b.points - a.points);
}
