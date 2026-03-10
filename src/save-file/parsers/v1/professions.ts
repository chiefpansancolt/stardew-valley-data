import professionsData from '@/data/professions.json';
import type { SaveProfession } from '../../types';
import { ensureArray, num } from '../util';

const PROFESSION_NAMES = new Map(
  (professionsData as Array<{ id: string; name: string }>).map((p) => [parseInt(p.id, 10), p.name]),
);

/** Parse the player's unlocked professions from the professions node into named entries. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseProfessions(professions: any): SaveProfession[] {
  return ensureArray(professions?.int).map((raw) => {
    const id = num(raw);
    return { id, name: PROFESSION_NAMES.get(id) ?? `Unknown(${id})` };
  });
}
