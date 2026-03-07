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

export interface Profession {
  name: string;
  description: string;
  requires?: string;
}

export interface ProfessionChoice {
  level: 5 | 10;
  options: Profession[];
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
  professions: ProfessionChoice[];
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
