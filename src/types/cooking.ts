import { EnergyHealth, Ingredient, Season } from './common';

export interface CookingBuff {
  stat: string;
  value: number;
}

export type RecipeSource =
  | { type: 'default' }
  | { type: 'friendship'; villager: string; hearts: number }
  | { type: 'skill'; skill: string; level: number }
  | { type: 'queen-of-sauce'; season: Season; day: number; year: number }
  | { type: 'purchase'; from: string; price: number; currency: string }
  | { type: 'cutscene'; description: string };

export interface CookedDish {
  id: string;
  name: string;
  description: string;
  sellPrice: number;
  energyHealth: EnergyHealth;
  ingredients: Ingredient[];
  image: string;
  buffs: CookingBuff[];
  buffDuration: number | null;
  recipeSources: RecipeSource[];
}
