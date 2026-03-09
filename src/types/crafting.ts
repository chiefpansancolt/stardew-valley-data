export interface CraftingIngredient {
  id: string;
  name: string;
  quantity: number;
}

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
