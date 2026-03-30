import type { SaveChild, SaveHorse, SavePet } from '../../types';
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

/** Find and parse all pets from Farm or FarmHouse locations.
 *  The pet matching the player's `whichPetType` and `whichPetBreed` is tagged `starter: true`. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parsePets(root: any, player: any): SavePet[] {
  const results: SavePet[] = [];
  const starterType = str(player?.whichPetType);
  const starterBreed = num(player?.whichPetBreed);
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

      const type = str(n.petType, xsiType);
      const breed = num(n.whichBreed);
      results.push({
        name: str(n.name),
        type,
        breed,
        friendship: num(n.friendshipTowardFarmer),
        starter: type === starterType && breed === starterBreed,
      });
    }
  }
  return results;
}

/** Find and parse the player's horse from Farm location in the save file root. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseHorse(root: any): SaveHorse | null {
  const locations = ensureArray(root.locations?.GameLocation);

  for (const loc of locations) {
    const l = loc as Record<string, unknown>;
    const name = str(l.name);
    if (name !== 'Farm') continue;

    const characters = ensureArray((l.characters as Record<string, unknown>)?.NPC);

    for (const npc of characters) {
      const n = npc as Record<string, unknown>;
      const xsiType = str(
        (n as Record<string, string>)['@_xsi:type'] ?? (n as Record<string, string>)['@_type'],
      );
      if (xsiType !== 'Horse') continue;

      return {
        name: str(n.name),
        type: 'horse',
        id: str(n.HorseId),
      };
    }
  }
  return null;
}
