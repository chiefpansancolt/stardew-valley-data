import { Ingredient } from './common';

export interface Ring {
  id: string;
  name: string;
  description: string;
  sellPrice: number;
  image: string;
  craftingLevel: number | null;
  craftingSkill: 'combat' | 'mining' | null;
  ingredients: Ingredient[];
  purchasePrice: number | null;
  sources: string[];
}
