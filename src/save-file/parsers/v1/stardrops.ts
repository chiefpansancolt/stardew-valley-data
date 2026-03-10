import stardropData from '@/data/stardrops.json';
import type { SaveStardropEntry } from '../../types';
import { ensureArray, str } from '../util';

/** Parse stardrop collection status by checking mail flags for each stardrop source. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseStardrops(mailReceived: any): SaveStardropEntry[] {
  const mail = new Set(ensureArray(mailReceived?.string).map((m) => str(m)));
  return (stardropData as Array<{ id: string; name: string }>).map((stardrop) => ({
    id: stardrop.id,
    name: stardrop.name,
    collected: mail.has(stardrop.id),
  }));
}
