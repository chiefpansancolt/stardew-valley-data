import type { SaveStardropEntry } from '../types';
import { ensureArray, str } from './util';

const STARDROP_FLAGS: Record<string, string> = {
  CF_Fair: 'Stardew Valley Fair',
  CF_Mines: 'Mines Level 100',
  CF_Spouse: 'Spouse',
  CF_Sewer: 'Krobus',
  CF_Statue: 'Old Master Cannoli',
  CF_Fish: 'Master Angler',
  museumComplete: 'Museum',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseStardrops(mailReceived: any): SaveStardropEntry[] {
  const mail = new Set(ensureArray(mailReceived?.string).map((m) => str(m)));
  return Object.entries(STARDROP_FLAGS).map(([flag, id]) => ({
    id,
    collected: mail.has(flag),
  }));
}
