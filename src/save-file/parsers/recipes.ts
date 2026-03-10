import type { SaveRecipeEntry } from '../types';
import { extractDictItems, num, str } from './util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseRecipes(data: any): SaveRecipeEntry[] {
  const result: SaveRecipeEntry[] = [];
  for (const item of extractDictItems(data)) {
    const key = item.key as Record<string, unknown>;
    const val = item.value as Record<string, unknown>;
    const name = str(key?.string);
    if (!name) continue;

    result.push({
      name,
      timesMade: num(val?.int),
    });
  }
  return result;
}

/** Parse known cooking recipes and how many times each has been made from the player node. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseCookingRecipes(data: any): SaveRecipeEntry[] {
  return parseRecipes(data);
}

/** Parse known crafting recipes and how many times each has been crafted from the player node. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseCraftingRecipes(data: any): SaveRecipeEntry[] {
  return parseRecipes(data);
}
