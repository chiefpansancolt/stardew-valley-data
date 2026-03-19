import cookingData from '@/data/cooking.json';
import type { SaveRecipeEntry } from '../../types';
import { extractDictItems, num, str } from '../util';

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

const cookingIdToName = new Map<string, string>(
  (cookingData as { id: string; name: string }[]).map((r) => [r.id, r.name]),
);

/**
 * Parse known cooking recipes and how many times each has been made.
 * cookingRecipes has recipe names as keys (tracks what is known, values are always 0).
 * recipesCooked has item IDs as keys with actual times-cooked counts.
 * We merge both: known list from cookingRecipes, counts from recipesCooked.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseCookingRecipes(knownData: any, cookedData: any): SaveRecipeEntry[] {
  const cookedCounts = new Map<string, number>();
  for (const item of extractDictItems(cookedData)) {
    const key = item.key as Record<string, unknown>;
    const val = item.value as Record<string, unknown>;
    const id = str(key?.string);
    if (id) cookedCounts.set(id, num(val?.int));
  }

  const cookedByName = new Map<string, number>();
  for (const [id, count] of cookedCounts) {
    const name = cookingIdToName.get(id);
    if (name) cookedByName.set(name, count);
  }

  const result: SaveRecipeEntry[] = [];
  for (const item of extractDictItems(knownData)) {
    const key = item.key as Record<string, unknown>;
    const name = str(key?.string);
    if (!name) continue;
    result.push({
      name,
      timesMade: cookedByName.get(name) ?? 0,
    });
  }
  return result;
}

/** Parse known crafting recipes and how many times each has been crafted from the player node. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseCraftingRecipes(data: any): SaveRecipeEntry[] {
  return parseRecipes(data);
}
