import type {
  SaveMastery,
  SaveMasteryPerk,
  SavePlayer,
  SaveSkills,
  SaveToolLevels,
} from '../../types';
import { ensureArray, num, str } from '../util';

const XP_THRESHOLDS = [0, 100, 380, 770, 1300, 2150, 3300, 4800, 6900, 10000, 15000];

function xpToLevel(xp: number): number {
  let level = 0;
  for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= XP_THRESHOLDS[i]) {
      level = i;
      break;
    }
  }
  return level;
}

function parseSkills(xpArray: unknown): SaveSkills {
  const xpValues = ensureArray(xpArray);
  const xp = xpValues.map(num);
  return {
    farming: { level: xpToLevel(xp[0] ?? 0), xp: xp[0] ?? 0 },
    fishing: { level: xpToLevel(xp[1] ?? 0), xp: xp[1] ?? 0 },
    foraging: { level: xpToLevel(xp[2] ?? 0), xp: xp[2] ?? 0 },
    mining: { level: xpToLevel(xp[3] ?? 0), xp: xp[3] ?? 0 },
    combat: { level: xpToLevel(xp[4] ?? 0), xp: xp[4] ?? 0 },
  };
}

function getStatValue(stats: Record<string, unknown>, key: string): number {
  const items = ensureArray((stats?.Values as Record<string, unknown>)?.item) as Array<
    Record<string, unknown>
  >;
  for (const item of items) {
    const k = (item.key as Record<string, unknown>)?.string;
    if (k === key) {
      return num((item.value as Record<string, unknown>)?.unsignedInt);
    }
  }
  return 0;
}

const MASTERY_PERKS: Array<{ statKey: string; id: string; name: string }> = [
  { statKey: 'mastery_0', id: 'farming', name: 'Farming Mastery' },
  { statKey: 'mastery_1', id: 'fishing', name: 'Fishing Mastery' },
  { statKey: 'mastery_2', id: 'foraging', name: 'Foraging Mastery' },
  { statKey: 'mastery_3', id: 'mining', name: 'Mining Mastery' },
  { statKey: 'mastery_4', id: 'combat', name: 'Combat Mastery' },
];

function parseMastery(stats: Record<string, unknown>): SaveMastery {
  const perks: SaveMasteryPerk[] = MASTERY_PERKS.map(({ statKey, id, name }) => ({
    id,
    name,
    unlocked: getStatValue(stats, statKey) > 0,
  }));

  return {
    xp: getStatValue(stats, 'MasteryExp'),
    levelsSpent: getStatValue(stats, 'masteryLevelsSpent'),
    perks,
  };
}

const TOOL_TYPES = ['WateringCan', 'Pan', 'Pickaxe', 'Axe', 'Hoe', 'FishingRod'] as const;
const TOOL_KEY_MAP: Record<string, keyof SaveToolLevels> = {
  WateringCan: 'wateringCan',
  Pan: 'pan',
  Pickaxe: 'pickaxe',
  Axe: 'axe',
  Hoe: 'hoe',
};

const FISHING_ROD_LEVEL: Record<string, number> = {
  'Training Rod': 0,
  'Bamboo Pole': 1,
  'Fiberglass Rod': 2,
  'Iridium Rod': 3,
  'Advanced Iridium Rod': 4,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function collectToolItems(node: any, depth = 0): any[] {
  if (!node || typeof node !== 'object' || depth > 20) return [];
  const results: unknown[] = [];
  if (Array.isArray(node)) {
    for (const child of node) results.push(...collectToolItems(child, depth + 1));
    return results;
  }
  const obj = node as Record<string, unknown>;
  const xsiType =
    (obj as Record<string, string>)['@_xsi:type'] ??
    (obj as Record<string, string>)['@_type'] ??
    '';
  if (TOOL_TYPES.includes(xsiType as (typeof TOOL_TYPES)[number])) {
    results.push(obj);
  }
  for (const key of [
    'Item',
    'items',
    'objects',
    'item',
    'Object',
    'value',
    'GameLocation',
    'Building',
    'buildings',
    'indoors',
    'heldObject',
  ]) {
    if (obj[key]) results.push(...collectToolItems(obj[key], depth + 1));
  }
  return results;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseToolLevels(player: any, root: any): SaveToolLevels {
  const levels: SaveToolLevels = {
    wateringCan: 0,
    pan: 0,
    pickaxe: 0,
    axe: 0,
    hoe: 0,
    trashCan: num(player.trashCanLevel),
    fishingRod: -1,
  };

  const allItems = [
    ...collectToolItems(player.items),
    ...collectToolItems(root.locations?.GameLocation),
  ];

  for (const item of allItems) {
    const i = item as Record<string, string>;
    const xsiType = i['@_xsi:type'] ?? i['@_type'] ?? '';
    const key = TOOL_KEY_MAP[xsiType];
    if (key) {
      const level = num(i.upgradeLevel);
      if (level > levels[key]) levels[key] = level;
    } else if (xsiType === 'FishingRod') {
      const rodLevel = FISHING_ROD_LEVEL[i.name] ?? -1;
      if (rodLevel > levels.fishingRod) levels.fishingRod = rodLevel;
    }
  }

  return levels;
}

/** Parse core player info, skills, and mastery data from the player node and save file root. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parsePlayer(player: any, root: any): SavePlayer {
  return {
    name: str(player.name),
    farmName: str(player.farmName),
    favoriteThing: str(player.favoriteThing),
    gender: str(player.Gender),
    money: num(player.money),
    totalMoneyEarned: num(player.totalMoneyEarned),
    spouse: player.spouse ? str(player.spouse) : null,
    houseUpgradeLevel: num(player.houseUpgradeLevel),
    luckLevel: num(player.luckLevel),
    maxItems: num(player.maxItems),
    maxHealth: num(player.maxHealth),
    maxStamina: num(player.maxStamina),
    skills: parseSkills(player.experiencePoints?.int),
    mastery: parseMastery(player.stats),
    toolLevels: parseToolLevels(player, root),
    gameVersion: str(root.gameVersion),
    millisecondsPlayed: num(player.millisecondsPlayed),
  };
}
