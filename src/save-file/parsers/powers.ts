import type { SavePowerEntry, SavePowers } from '../types';

const SPECIAL_ITEMS: Array<{
  id: string;
  name: string;
  check: (mail: Set<string>, events: Set<string>) => boolean;
}> = [
  { id: 'bearKnowledge', name: "Bear's Knowledge", check: (m) => m.has('bearsKnowledge') },
  { id: 'clubCard', name: 'Club Card', check: (m) => m.has('HasClubCard') },
  { id: 'darkTalisman', name: 'Dark Talisman', check: (m) => m.has('HasDarkTalisman') },
  {
    id: 'dwarfTranslation',
    name: 'Dwarvish Translation Guide',
    check: (m) => m.has('HasDwarvishTranslationGuide'),
  },
  { id: 'forestMagic', name: 'Forest Magic', check: (m) => m.has('canReadJunimoText') },
  { id: 'keyToTown', name: 'Key to the Town', check: (m) => m.has('HasTownKey') },
  { id: 'magicInk', name: 'Magic Ink', check: (m) => m.has('HasMagicInk') },
  { id: 'magnifyingGlass', name: 'Magnifying Glass', check: (m) => m.has('HasMagnifyingGlass') },
  {
    id: 'rustyKey',
    name: 'Rusty Key',
    check: (m) => m.has('HasRustyKey') || m.has('ccBoilerRoom'),
  },
  { id: 'skullKey', name: 'Skull Key', check: (m) => m.has('HasSkullKey') },
  { id: 'specialCharm', name: 'Special Charm', check: (m) => m.has('HasSpecialCharm') },
  { id: 'springOnionMastery', name: 'Spring Onion Mastery', check: (_m, e) => e.has('3910979') },
  { id: 'beatPrairieKing', name: 'Prairie King Victory', check: (m) => m.has('Beat_PK') },
  { id: 'junimoKart', name: 'Junimo Kart Victory', check: (m) => m.has('JunimoKart') },
];

/** Parse special item acquisition status using pre-computed mail flags and events. */
export function parsePowers(mail: Set<string>, events: Set<string>): SavePowers {
  const specialItems: SavePowerEntry[] = SPECIAL_ITEMS.map(({ id, name, check }) => ({
    id,
    name,
    acquired: check(mail, events),
  }));

  return { specialItems };
}
