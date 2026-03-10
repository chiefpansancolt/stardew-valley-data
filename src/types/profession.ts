export type ProfessionSkill = 'Farming' | 'Fishing' | 'Foraging' | 'Mining' | 'Combat';

export interface ProfessionData {
  id: string;
  name: string;
  skill: ProfessionSkill;
  level: 5 | 10;
  parentProfession: string | null;
  description: string;
}
