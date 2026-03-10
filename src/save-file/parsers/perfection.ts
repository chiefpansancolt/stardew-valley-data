import type { SavePerfection } from '../types';
import { ensureArray, num, str } from './util';

const OBELISK_TYPES = ['Earth Obelisk', 'Water Obelisk', 'Desert Obelisk', 'Island Obelisk'];

/** Parse perfection tracker data from the save file root, including Gold Clock and obelisk status. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parsePerfection(root: any): SavePerfection {
  const locations = ensureArray(root.locations?.GameLocation);
  let hasGoldClock = false;
  const obelisks: string[] = [];

  for (const loc of locations) {
    const l = loc as Record<string, unknown>;
    if (str(l.name) !== 'Farm') continue;

    const buildings = ensureArray((l.buildings as Record<string, unknown>)?.Building);
    for (const building of buildings) {
      const b = building as Record<string, unknown>;
      const btype = str(b.buildingType);
      if (btype === 'Gold Clock') hasGoldClock = true;
      if (OBELISK_TYPES.includes(btype) && !obelisks.includes(btype)) {
        obelisks.push(btype);
      }
    }
    break;
  }

  return {
    farmPerfect: root.farmPerfect === true || root.farmPerfect === 'true',
    waivers: num(root.perfectionWaivers),
    hasGoldClock,
    obelisks,
  };
}
