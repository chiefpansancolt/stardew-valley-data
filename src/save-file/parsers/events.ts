import { ensureArray, str } from './util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseEventsSeen(player: any): string[] {
  return ensureArray(player.eventsSeen?.int)
    .map((e) => str(e))
    .filter(Boolean);
}
