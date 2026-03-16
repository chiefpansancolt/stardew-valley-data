import type { SaveBuilding } from '../../types';
import { ensureArray, num, str } from '../util';

/** Parse all farm buildings and their positions from the save file root. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseBuildings(root: any): SaveBuilding[] {
  const result: SaveBuilding[] = [];
  const locations = ensureArray(root.locations?.GameLocation);

  for (const loc of locations) {
    const l = loc as Record<string, unknown>;
    if (str(l.name) !== 'Farm') continue;

    const buildings = ensureArray((l.buildings as Record<string, unknown>)?.Building);

    for (const building of buildings) {
      const b = building as Record<string, unknown>;
      result.push({
        id: str(b.id),
        type: str(b.buildingType),
        animalCount: num(b.currentOccupants),
      });
    }
    break;
  }
  return result;
}
