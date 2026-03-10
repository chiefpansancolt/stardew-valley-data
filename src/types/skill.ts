export interface SkillLevelRecipes {
  crafting: string[];
  cooking: string[];
}

export interface SkillLevel {
  level: number;
  xpRequired: number;
  totalXp: number;
  recipes: SkillLevelRecipes;
}

export interface MasteryUnlock {
  name: string;
  description: string;
}

export interface SkillMastery {
  unlocks: MasteryUnlock[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  toolBonus: string;
  image: string;
  levels: SkillLevel[];
  mastery: SkillMastery;
}

export interface TitleThreshold {
  minScore: number;
  title: string;
}

export interface MasteryLevel {
  level: number;
  xpRequired: number;
  totalXp: number;
}
