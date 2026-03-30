import type {
  SaveMastery,
  SaveMasteryPerk,
  SavePlayer,
  SaveSkills,
  SaveToolLevel,
  SaveToolLevels,
  SaveUpgradingTool,
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
const TOOL_KEY_MAP: Record<string, SaveUpgradingTool['tool']> = {
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

function getEnchantmentName(item: Record<string, unknown>): string | null {
  const enc = item.enchantments;
  if (!enc) return null;
  const first = Array.isArray(enc) ? enc[0] : enc;
  if (!first || typeof first !== 'object') return null;
  const xsiType = (first as Record<string, string>)['@_xsi:type'] ?? '';
  return xsiType.replace(/Enchantment$/, '') || null;
}

function toolLevel(level: number, enchantment: string | null = null): SaveToolLevel {
  return { level, enchantment };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseToolLevels(player: any, root: any): SaveToolLevels {
  const levels: SaveToolLevels = {
    wateringCan: toolLevel(0),
    pan: toolLevel(0),
    pickaxe: toolLevel(0),
    axe: toolLevel(0),
    hoe: toolLevel(0),
    trashCan: toolLevel(num(player.trashCanLevel)),
    fishingRod: toolLevel(-1),
    currentlyUpgrading: null,
  };

  // If a tool is at the blacksmith, it's absent from inventory.
  // upgradeLevel in the XML is the target level, so current = target - 1.
  // Pan's upgradeLevel is off by an extra 1 in the save file, so pan uses target - 2.
  const upgrading = player.toolBeingUpgraded as Record<string, unknown> | undefined;
  if (upgrading) {
    const xsiType =
      (upgrading['@_xsi:type'] as string | undefined) ??
      (upgrading['@_type'] as string | undefined) ??
      '';
    const key = TOOL_KEY_MAP[xsiType] as SaveUpgradingTool['tool'] | undefined;
    if (key) {
      const offset = key === 'pan' ? 2 : 1;
      const currentLevel = num(upgrading.upgradeLevel) - offset;
      if (currentLevel > levels[key].level) {
        levels[key] = toolLevel(currentLevel, getEnchantmentName(upgrading));
      }
      levels.currentlyUpgrading = { tool: key, name: str(upgrading.name as string) };
    }
  }

  const allItems = [
    ...collectToolItems(player.items),
    ...collectToolItems(root.locations?.GameLocation),
  ];

  for (const item of allItems) {
    const i = item as Record<string, unknown>;
    const xsiType = (i['@_xsi:type'] as string) ?? (i['@_type'] as string) ?? '';
    const key = TOOL_KEY_MAP[xsiType];
    if (key) {
      const level = num(i.upgradeLevel);
      if (level > levels[key].level) {
        levels[key] = toolLevel(level, getEnchantmentName(i));
      }
    } else if (xsiType === 'FishingRod') {
      const rodLevel = FISHING_ROD_LEVEL[i.name as string] ?? -1;
      if (rodLevel > levels.fishingRod.level) {
        levels.fishingRod = toolLevel(rodLevel, getEnchantmentName(i));
      }
    }
  }

  return levels;
}

/** Parse core player info, skills, and mastery data from the player node and save file root. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parsePlayer(player: any, root: any, mail: Set<string>): SavePlayer {
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
    willyBackRoomInvitation: mail.has('willyBackRoomInvitation'),
    lostBooksFound: num(root.lostBooksFound),
    helpWantedQuests: getStatValue(player.stats, 'questsCompleted'),
    gameVersion: str(root.gameVersion),
    millisecondsPlayed: num(player.millisecondsPlayed),
  };
}
