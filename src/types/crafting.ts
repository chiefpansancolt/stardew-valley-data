import { Ingredient } from './common';

export type CraftingIngredient = Ingredient;

export interface CraftingOutput {
  id: string;
  name: string;
  quantity: number;
  isBigCraftable: boolean;
}

export interface CraftingRecipe {
  id: string;
  name: string;
  description: string;
  category: string;
  source: string;
  output: CraftingOutput;
  ingredients: CraftingIngredient[];
  image: string;
}
