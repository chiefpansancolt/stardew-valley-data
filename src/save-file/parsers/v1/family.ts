import type { SaveChild, SavePet } from '../../types';
import { ensureArray, num, str } from '../util';

/** Parse child NPC data from the FarmHouse location in the save file root. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseChildren(root: any): SaveChild[] {
  const result: SaveChild[] = [];
  const locations = ensureArray(root.locations?.GameLocation);

  for (const loc of locations) {
    const l = loc as Record<string, unknown>;
    const name = str(l.name);
    if (name !== 'FarmHouse') continue;

    const characters = ensureArray((l.characters as Record<string, unknown>)?.NPC);

    for (const npc of characters) {
      const n = npc as Record<string, string>;
      const xsiType = n['@_xsi:type'] ?? n['@_type'] ?? '';
      if (xsiType !== 'Child') continue;

      result.push({
        name: str(n.name),
        age: num(n.daysOld),
        gender: str(n.Gender, 'Unknown'),
      });
    }
    break;
  }
  return result;
}

/** Find and parse the player's pet from Farm or FarmHouse locations in the save file root. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parsePet(root: any): SavePet | null {
  const locations = ensureArray(root.locations?.GameLocation);

  for (const loc of locations) {
    const l = loc as Record<string, unknown>;
    const name = str(l.name);
    if (name !== 'Farm' && name !== 'FarmHouse') continue;

    const characters = ensureArray((l.characters as Record<string, unknown>)?.NPC);

    for (const npc of characters) {
      const n = npc as Record<string, unknown>;
      const xsiType = str(
        (n as Record<string, string>)['@_xsi:type'] ?? (n as Record<string, string>)['@_type'],
      );
      if (xsiType !== 'Pet' && xsiType !== 'Cat' && xsiType !== 'Dog') continue;

      return {
        name: str(n.name),
        type: str(n.petType, xsiType),
        breed: num(n.whichBreed),
        friendship: num(n.friendshipTowardFarmer),
      };
    }
  }
  return null;
}
