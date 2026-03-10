import type { SaveMastery, SaveMasteryPerk, SavePlayer, SaveSkills } from '../types';
import { ensureArray, num, str } from './util';

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
    maxHealth: num(player.maxHealth),
    maxStamina: num(player.maxStamina),
    skills: parseSkills(player.experiencePoints?.int),
    mastery: parseMastery(player.stats),
    gameVersion: str(root.gameVersion),
  };
}
