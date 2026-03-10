import { QueryBase } from '@/common/query-base';
import data from '@/data/skills.json';
import { MasteryLevel, ProfessionData, ProfessionSkill, Skill, TitleThreshold } from '@/types';
import { professions } from '../professions';

const skillData: Skill[] = data as Skill[];

// Title is calculated from (farming + fishing + foraging + combat + mining) / 2
// Luck is unimplemented so max achievable score is 25 (5 skills × 10 / 2)
export const SKILL_TITLES: TitleThreshold[] = [
  { minScore: 30, title: 'Farm King' },
  { minScore: 29, title: 'Cropmaster' },
  { minScore: 27, title: 'Agriculturist' },
  { minScore: 25, title: 'Farmer' },
  { minScore: 23, title: 'Rancher' },
  { minScore: 21, title: 'Planter' },
  { minScore: 19, title: 'Granger' },
  { minScore: 17, title: 'Farmgirl / Farmboy' },
  { minScore: 15, title: 'Sodbuster' },
  { minScore: 13, title: 'Smallholder' },
  { minScore: 11, title: 'Tiller' },
  { minScore: 9, title: 'Farmhand' },
  { minScore: 7, title: 'Cowpoke' },
  { minScore: 5, title: 'Bumpkin' },
  { minScore: 3, title: 'Greenhorn' },
  { minScore: 0, title: 'Newcomer' },
];

export const MASTERY_LEVELS: MasteryLevel[] = [
  { level: 1, xpRequired: 10000, totalXp: 10000 },
  { level: 2, xpRequired: 15000, totalXp: 25000 },
  { level: 3, xpRequired: 20000, totalXp: 45000 },
  { level: 4, xpRequired: 25000, totalXp: 70000 },
  { level: 5, xpRequired: 30000, totalXp: 100000 },
];

/**
 * Calculate the player's title score.
 * Formula: floor((farming + fishing + foraging + mining + combat) / 2)
 */
export function getTitleScore(
  farming: number,
  fishing: number,
  foraging: number,
  mining: number,
  combat: number,
): number {
  return Math.floor((farming + fishing + foraging + mining + combat) / 2);
}

/**
 * Get the player's title based on their combined skill levels.
 * Uses the same formula as the game: floor(sum of all skills / 2)
 */
export function getTitle(
  farming: number,
  fishing: number,
  foraging: number,
  mining: number,
  combat: number,
): string {
  const score = getTitleScore(farming, fishing, foraging, mining, combat);
  const match = SKILL_TITLES.find((t) => score >= t.minScore);
  return match?.title ?? 'Newcomer';
}

/**
 * Get the current mastery level for a given total mastery XP amount.
 * Returns 0 if the player has not reached mastery level 1.
 */
export function getMasteryLevel(masteryXp: number): number {
  let level = 0;
  for (const ml of MASTERY_LEVELS) {
    if (masteryXp >= ml.totalXp) level = ml.level;
  }
  return level;
}

/** Query builder for skill data. Terminal methods only — use utility functions for calculations. */
export class SkillQuery extends QueryBase<Skill> {
  constructor(data: Skill[] = skillData) {
    super(data);
  }
}

/** Returns a SkillQuery for all skill data. Pass `source` to wrap a pre-filtered array. */
export function skills(source: Skill[] = skillData): SkillQuery {
  return new SkillQuery(source);
}

/**
 * Get the level 10 profession options available for a given skill and level 5 profession choice.
 * Uses the professions module to look up data. Returns an empty array if not found.
 */
export function getProfessionOptions(
  skillName: string,
  level5Profession: string,
): ProfessionData[] {
  const skillProfs = professions().bySkill(skillName as ProfessionSkill);
  const level5 = skillProfs
    .byLevel(5)
    .get()
    .find((p) => p.name.toLowerCase() === level5Profession.toLowerCase());
  if (!level5) return [];
  return skillProfs.byParent(level5.id).get();
}
