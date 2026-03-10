import type { SaveProfession } from '../types';
import { ensureArray, num } from './util';

const PROFESSION_NAMES: Record<number, string> = {
  // Farming
  0: 'Rancher',
  1: 'Tiller',
  2: 'Coopmaster',
  3: 'Shepherd',
  4: 'Artisan',
  5: 'Agriculturist',
  // Fishing
  6: 'Fisher',
  7: 'Trapper',
  8: 'Angler',
  9: 'Pirate',
  10: 'Mariner',
  11: 'Luremaster',
  // Foraging
  12: 'Forester',
  13: 'Gatherer',
  14: 'Lumberjack',
  15: 'Tapper',
  16: 'Botanist',
  17: 'Tracker',
  // Mining
  18: 'Miner',
  19: 'Geologist',
  20: 'Blacksmith',
  21: 'Prospector',
  22: 'Excavator',
  23: 'Gemologist',
  // Combat
  24: 'Fighter',
  25: 'Scout',
  26: 'Brute',
  27: 'Defender',
  28: 'Acrobat',
  29: 'Desperado',
};

/** Parse the player's unlocked professions from the professions node into named entries. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseProfessions(professions: any): SaveProfession[] {
  return ensureArray(professions?.int).map((raw) => {
    const id = num(raw);
    return { id, name: PROFESSION_NAMES[id] ?? `Unknown(${id})` };
  });
}
