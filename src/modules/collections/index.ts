import { QueryBase } from '@/common/query-base';
import animalsData from '@/data/animals.json';
import artifactsData from '@/data/artifacts.json';
import artisanGoodsData from '@/data/artisan-goods.json';
import collectionsData from '@/data/collections.json';
import cookingData from '@/data/cooking.json';
import craftingData from '@/data/crafting.json';
import cropsData from '@/data/crops.json';
import fishData from '@/data/fish.json';
import forageablesData from '@/data/forageables.json';
import mineralsData from '@/data/minerals.json';
import monsterLootData from '@/data/monster-loot.json';
import treesData from '@/data/trees.json';
import { CollectionItem } from '@/types';

// ---------------------------------------------------------------------------
// Lookup: id → CollectionItem, built from all data modules at load time.
// Items in collections.json that are not found here will be silently skipped.
// ---------------------------------------------------------------------------

function buildLookup(): Map<string, CollectionItem> {
  const map = new Map<string, CollectionItem>();

  const add = (item: { id: string; name: string; image: string }) => {
    if (!map.has(item.id)) map.set(item.id, { id: item.id, name: item.name, image: item.image });
  };

  for (const item of artifactsData) add(item);
  for (const item of mineralsData) add(item as { id: string; name: string; image: string });
  for (const item of fishData as { id: string; name: string; image: string }[]) add(item);
  for (const item of cookingData) add(item);
  for (const item of forageablesData as { id: string; name: string; image: string }[]) add(item);
  for (const item of cropsData as { id: string; name: string; image: string }[]) add(item);
  for (const item of artisanGoodsData as { id: string; name: string; image: string }[]) add(item);
  for (const item of monsterLootData as { id: string; name: string; image: string }[]) add(item);

  // Extract produce and deluxeProduce from farm animals
  for (const animal of animalsData as {
    type: string;
    produce?: { id: string; name: string; image: string };
    deluxeProduce?: { id: string; name: string; image: string };
  }[]) {
    if (animal.type !== 'farm-animal') continue;
    if (animal.produce) add(animal.produce);
    if (animal.deluxeProduce) add(animal.deluxeProduce);
  }

  // Extract produce (fruit trees) and tapper (wild trees)
  for (const tree of treesData as {
    type: string;
    produce?: { id: string; name: string; image: string };
    tapper?: { id: string; name: string; image: string };
  }[]) {
    if (tree.produce) add(tree.produce);
    if (tree.tapper) add(tree.tapper);
  }

  return map;
}

// ---------------------------------------------------------------------------
// Crafting lookup: recipe name → CollectionItem
// The crafting collection is keyed by recipe name, not output ID, to avoid
// BigCraftable/Object ID namespace collisions.
// ---------------------------------------------------------------------------

function buildCookingLookup(): Map<string, CollectionItem> {
  const map = new Map<string, CollectionItem>();
  for (const recipe of cookingData as { name: string; image: string; id: string }[]) {
    map.set(recipe.name, { id: recipe.id, name: recipe.name, image: recipe.image });
  }
  return map;
}

function buildCraftingLookup(): Map<string, CollectionItem> {
  const map = new Map<string, CollectionItem>();
  for (const recipe of craftingData as {
    name: string;
    image: string;
    output: { id: string; isBigCraftable?: boolean };
  }[]) {
    const id = recipe.output.isBigCraftable ? `(BC)${recipe.output.id}` : recipe.output.id;
    map.set(recipe.name, { id, name: recipe.name, image: recipe.image });
  }
  return map;
}

const lookup = buildLookup();
const cookingLookup = buildCookingLookup();
const craftingLookup = buildCraftingLookup();

// ---------------------------------------------------------------------------
// CollectionItemQuery — returned by each collection accessor
// ---------------------------------------------------------------------------

/**
 * Query result for a single collection type.
 * Inherits get(), first(), find(), findByName(), count() from QueryBase.
 */
export class CollectionItemQuery extends QueryBase<CollectionItem> {
  constructor(data: CollectionItem[]) {
    super(data);
  }
}

// ---------------------------------------------------------------------------
// CollectionsQuery — the primary query object
// ---------------------------------------------------------------------------

/**
 * Query builder for in-game Collections.
 * Call a collection accessor to get its items resolved to { id, name, image }.
 * Items whose IDs are not found in any loaded data module are excluded.
 */
export class CollectionsQuery {
  private resolve(ids: string[]): CollectionItemQuery {
    const items: CollectionItem[] = [];
    for (const id of ids) {
      const item = lookup.get(id);
      if (item) items.push(item);
    }
    return new CollectionItemQuery(items);
  }

  /** Items that appear in the Items Shipped collection tab. */
  itemsShipped(): CollectionItemQuery {
    return this.resolve(collectionsData.itemsShipped);
  }

  /** Items that appear in the Fish collection tab. */
  fish(): CollectionItemQuery {
    return this.resolve(collectionsData.fish);
  }

  /** Items that appear in the Artifacts collection tab (museum donations). */
  artifacts(): CollectionItemQuery {
    return this.resolve(collectionsData.artifacts);
  }

  /** Items that appear in the Minerals collection tab (museum donations). */
  minerals(): CollectionItemQuery {
    return this.resolve(collectionsData.minerals);
  }

  /** Items that appear in the Cooking collection tab. */
  cooking(): CollectionItemQuery {
    const items: CollectionItem[] = [];
    for (const name of collectionsData.cooking) {
      const item = cookingLookup.get(name);
      if (item) items.push(item);
    }
    return new CollectionItemQuery(items);
  }

  /** Items that appear in the Crafting collection tab. */
  crafting(): CollectionItemQuery {
    const items: CollectionItem[] = [];
    for (const name of collectionsData.crafting) {
      const item = craftingLookup.get(name);
      if (item) items.push(item);
    }
    return new CollectionItemQuery(items);
  }
}

/** Returns a CollectionsQuery. Use a collection accessor to get resolved items. */
export function collections(): CollectionsQuery {
  return new CollectionsQuery();
}
