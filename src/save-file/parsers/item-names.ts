import animalsData from '@/data/animals.json';
import artisanGoodsData from '@/data/artisan-goods.json';
import baitData from '@/data/bait.json';
import cookingData from '@/data/cooking.json';
import craftingData from '@/data/crafting.json';
import cropsData from '@/data/crops.json';
import fishData from '@/data/fish.json';
import forageablesData from '@/data/forageables.json';
import mineralsData from '@/data/minerals.json';
import ringsData from '@/data/rings.json';
import tackleData from '@/data/tackle.json';
import treesData from '@/data/trees.json';

/**
 * Build an item ID → name lookup map from all data modules.
 * Covers regular objects, animal produce, tree produce, crafting outputs, and ingredients.
 */
function buildItemNameMap(): Map<string, string> {
  const map = new Map<string, string>();

  const add = (id: string, name: string) => {
    if (id && name && !map.has(id)) map.set(id, name);
  };

  // Simple flat arrays: { id, name }
  for (const item of cropsData as Array<{ id: string; name: string }>) add(item.id, item.name);
  for (const item of fishData as Array<{ id: string; name: string }>) add(item.id, item.name);
  for (const item of forageablesData as Array<{ id: string; name: string }>)
    add(item.id, item.name);
  for (const item of artisanGoodsData as Array<{ id: string; name: string }>)
    add(item.id, item.name);
  for (const item of mineralsData as Array<{ id: string; name: string }>) add(item.id, item.name);
  for (const item of cookingData as Array<{ id: string; name: string }>) add(item.id, item.name);
  for (const item of ringsData as Array<{ id: string; name: string }>) add(item.id, item.name);
  for (const item of baitData as Array<{ id: string; name: string }>) add(item.id, item.name);
  for (const item of tackleData as Array<{ id: string; name: string }>) add(item.id, item.name);

  // Crops: also index seedId → seedName
  for (const item of cropsData as Array<{ seedId?: string; seedName?: string }>) {
    if (item.seedId && item.seedName) add(item.seedId, item.seedName);
  }

  // Trees: produce items
  for (const tree of treesData as Array<{ produce?: { id: string; name: string } }>) {
    if (tree.produce) add(tree.produce.id, tree.produce.name);
  }

  // Animals: produce and deluxe produce
  for (const animal of animalsData as Array<{
    produce?: { id: string; name: string };
    deluxeProduce?: { id: string; name: string };
  }>) {
    if (animal.produce) add(animal.produce.id, animal.produce.name);
    if (animal.deluxeProduce) add(animal.deluxeProduce.id, animal.deluxeProduce.name);
  }

  // Crafting: output items and ingredients
  for (const recipe of craftingData as Array<{
    output: { id: string; name: string; isBigCraftable: boolean };
    ingredients: Array<{ id: string; name: string }>;
  }>) {
    if (!recipe.output.isBigCraftable) add(recipe.output.id, recipe.output.name);
    for (const ing of recipe.ingredients) add(ing.id, ing.name);
  }

  return map;
}

/**
 * Build a BigCraftable ID → name lookup from crafting recipe outputs.
 * These use a separate ID namespace from regular objects.
 */
function buildBigCraftableNameMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const recipe of craftingData as Array<{
    output: { id: string; name: string; isBigCraftable: boolean };
  }>) {
    if (recipe.output.isBigCraftable && !map.has(recipe.output.id)) {
      map.set(recipe.output.id, recipe.output.name);
    }
  }
  return map;
}

/** Lazily-initialized item name map (regular objects). */
let itemNames: Map<string, string> | null = null;

/** Lazily-initialized BigCraftable name map. */
let bigCraftableNames: Map<string, string> | null = null;

/** Resolve a regular object item ID to its display name. */
export function resolveItemName(itemId: string): string {
  if (!itemNames) itemNames = buildItemNameMap();
  return itemNames.get(itemId) ?? `Item ${itemId}`;
}

/** Resolve a BigCraftable item ID to its display name. */
export function resolveBigCraftableName(itemId: string): string {
  if (!bigCraftableNames) bigCraftableNames = buildBigCraftableNameMap();
  return bigCraftableNames.get(itemId) ?? `BigCraftable ${itemId}`;
}

/** Resolve a reward item name based on its type prefix and ID. */
export function resolveRewardName(type: string, itemId: string): string {
  if (type === 'BO') return resolveBigCraftableName(itemId);
  return resolveItemName(itemId);
}
