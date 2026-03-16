import type { SaveAnimal } from '../../types';
import { ensureArray, num, str } from '../util';

/** Parse farm animal data from all building interiors in the save file root. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseAnimals(root: any): SaveAnimal[] {
  const result: SaveAnimal[] = [];
  const locations = ensureArray(root.locations?.GameLocation);

  for (const loc of locations) {
    const l = loc as Record<string, unknown>;
    if (str(l.name) !== 'Farm') continue;

    const buildings = ensureArray((l.buildings as Record<string, unknown>)?.Building);

    for (const building of buildings) {
      const b = building as Record<string, unknown>;
      const indoors = b.indoors as Record<string, unknown> | undefined;
      if (!indoors) continue;

      const animals = ensureArray((indoors.animals as Record<string, unknown>)?.item);

      for (const animalItem of animals) {
        const ai = animalItem as Record<string, unknown>;
        const a = ai.value as Record<string, unknown>;
        const faRaw = a?.FarmAnimal;
        const fa = (Array.isArray(faRaw) ? faRaw[0] : faRaw) as Record<string, unknown>;
        if (!fa) continue;

        result.push({
          id: str(fa.myID),
          name: str(fa.name),
          type: str(fa.type),
          buildingId: str(b.id),
          buildingType: str(fa.buildingTypeILiveIn),
          friendship: num(fa.friendshipTowardFarmer),
          happiness: num(fa.happiness),
          age: num(fa.age),
          hasAnimalCracker:
            fa.hasEatenAnimalCracker === true || fa.hasEatenAnimalCracker === 'true',
        });
      }
    }
    break;
  }
  return result;
}
