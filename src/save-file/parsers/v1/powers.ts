import specialItemsData from '@/data/special-items.json';
import type { SavePowerEntry, SavePowers } from '../../types';

interface SpecialItemDef {
  id: string;
  name: string;
  type: string;
  mailFlags?: string[];
  eventFlags?: string[];
}

const POWER_ITEMS = (specialItemsData as SpecialItemDef[]).filter(
  (item) => item.type === 'special-item',
);

/** Additional power entries not represented as special items in the data (arcade victories). */
const EXTRA_POWERS: Array<{
  id: string;
  name: string;
  check: (mail: Set<string>) => boolean;
}> = [
  { id: 'prairie-king-victory', name: 'Prairie King Victory', check: (m) => m.has('Beat_PK') },
  { id: 'junimo-kart-victory', name: 'Junimo Kart Victory', check: (m) => m.has('JunimoKart') },
];

/** Parse special item acquisition status using pre-computed mail flags and events. */
export function parsePowers(mail: Set<string>, events: Set<string>): SavePowers {
  const specialItems: SavePowerEntry[] = POWER_ITEMS.map((item) => {
    const mailMatch = item.mailFlags?.some((f) => mail.has(f)) ?? false;
    const eventMatch = item.eventFlags?.some((f) => events.has(f)) ?? false;
    return {
      id: item.id,
      name: item.name,
      acquired: mailMatch || eventMatch,
    };
  });

  for (const extra of EXTRA_POWERS) {
    specialItems.push({
      id: extra.id,
      name: extra.name,
      acquired: extra.check(mail),
    });
  }

  return { specialItems };
}
