import { SearchResult, SearchResultKind } from '@/types';
import { animals, isFarmAnimal } from '../animals';
import { artifacts } from '../artifacts';
import { artisanGoods } from '../artisan-goods';
import { bait } from '../bait';
import { cooking } from '../cooking';
import { crafting } from '../crafting';
import { crops } from '../crops';
import { fish } from '../fish';
import { footwear } from '../footwear';
import { forageables } from '../forageables';
import { hats } from '../hats';
import { minerals } from '../minerals';
import { monsterLoot, monsters } from '../monsters';
import { rings } from '../rings';
import { tackle } from '../tackle';
import { tools } from '../tools';
import { trees } from '../trees';
import { weapons } from '../weapons';

/** Returns true if the query matches the item by exact ID or name substring (case-insensitive). */
function matches(query: string, id: string, name: string): boolean {
  const q = query.toLowerCase();
  return id.toLowerCase() === q || name.toLowerCase().includes(q);
}

type RawResult = Omit<SearchResult, 'parents'> & { parent?: { id: string; name: string } };

/**
 * Deduplicates raw results by `kind:id`. When the same item appears from multiple
 * parents (e.g. Egg from White Chicken and Blue Chicken), the parents are merged
 * into a single `parents` array on the deduplicated result.
 */
function dedupe(raw: RawResult[]): SearchResult[] {
  const seen = new Map<string, SearchResult>();
  for (const { parent, ...rest } of raw) {
    const key = `${rest.kind}:${rest.id}`;
    if (seen.has(key)) {
      if (parent) seen.get(key)!.parents!.push(parent);
    } else {
      seen.set(key, { ...rest, parents: parent ? [parent] : undefined });
    }
  }
  return Array.from(seen.values());
}

/**
 * Search for any item across all data modules by name (substring) or ID (exact match).
 * Includes nested items: crop seeds, fruit tree produce, wild tree tappers,
 * animal produce, and deluxe animal produce.
 *
 * Results are deduplicated by kind + ID. Nested items shared across multiple
 * parents (e.g. Egg from White Chicken and Blue Chicken) are merged into one
 * result with a `parents` array listing all sources.
 *
 * @param query - Name substring or exact ID to search for (case-insensitive)
 * @param kinds - Optional filter to restrict results to specific kinds
 */
export function search(query: string, kinds?: SearchResultKind[]): SearchResult[] {
  const raw: RawResult[] = [];

  function add(result: RawResult): void {
    if (!kinds || kinds.includes(result.kind)) {
      raw.push(result);
    }
  }

  // Crops
  for (const crop of crops().get()) {
    if (matches(query, crop.id, crop.name)) {
      add({
        kind: 'crop',
        id: crop.id,
        name: crop.name,
        image: crop.image,
        sellPrice: crop.cropSellPrice,
      });
    }
    if (matches(query, crop.seedId, crop.seedName)) {
      add({
        kind: 'crop-seed',
        id: crop.seedId,
        name: crop.seedName,
        image: crop.seedImage,
        sellPrice: crop.seedSellPrice,
      });
    }
  }

  // Trees
  for (const tree of trees().get()) {
    if (tree.type === 'fruit-tree') {
      if (matches(query, tree.id, tree.name)) {
        add({
          kind: 'fruit-tree',
          id: tree.id,
          name: tree.name,
          image: tree.image,
          sellPrice: null,
        });
      }
      if (matches(query, tree.produce.id, tree.produce.name)) {
        add({
          kind: 'fruit-tree-produce',
          id: tree.produce.id,
          name: tree.produce.name,
          image: tree.produce.image,
          sellPrice: tree.produce.sellPrice,
          parent: { id: tree.id, name: tree.name },
        });
      }
    } else {
      if (matches(query, tree.id, tree.name)) {
        add({
          kind: 'wild-tree',
          id: tree.id,
          name: tree.name,
          image: tree.image,
          sellPrice: null,
        });
      }
      if (matches(query, tree.seedId, tree.seedName)) {
        add({
          kind: 'wild-tree-seed',
          id: tree.seedId,
          name: tree.seedName,
          image: tree.seedImage,
          sellPrice: null,
        });
      }
      if (tree.tapper && matches(query, tree.tapper.id, tree.tapper.name)) {
        add({
          kind: 'wild-tree-tapper',
          id: tree.tapper.id,
          name: tree.tapper.name,
          image: tree.tapper.image,
          sellPrice: tree.tapper.sellPrice,
          parent: { id: tree.id, name: tree.name },
        });
      }
    }
  }

  // Animals
  for (const animal of animals().get()) {
    if (matches(query, animal.id, animal.name)) {
      add({
        kind: 'animal',
        id: animal.id,
        name: animal.name,
        image: animal.image,
        sellPrice: null,
      });
    }
    if (isFarmAnimal(animal)) {
      if (matches(query, animal.produce.id, animal.produce.name)) {
        add({
          kind: 'animal-produce',
          id: animal.produce.id,
          name: animal.produce.name,
          image: animal.produce.image,
          sellPrice: animal.produce.sellPrice,
          parent: { id: animal.id, name: animal.name },
        });
      }
      if (
        animal.deluxeProduce &&
        matches(query, animal.deluxeProduce.id, animal.deluxeProduce.name)
      ) {
        add({
          kind: 'animal-produce',
          id: animal.deluxeProduce.id,
          name: animal.deluxeProduce.name,
          image: animal.deluxeProduce.image,
          sellPrice: animal.deluxeProduce.sellPrice,
          parent: { id: animal.id, name: animal.name },
        });
      }
    }
  }

  // Monsters
  for (const monster of monsters().get()) {
    if (matches(query, monster.id, monster.name)) {
      add({
        kind: 'monster',
        id: monster.id,
        name: monster.name,
        image: monster.image,
        sellPrice: null,
      });
    }
  }

  // Monster loot
  for (const loot of monsterLoot().get()) {
    if (matches(query, loot.id, loot.name)) {
      for (const monsterId of loot.droppedBy) {
        const monster = monsters().find(monsterId);
        add({
          kind: 'monster-loot',
          id: loot.id,
          name: loot.name,
          image: loot.image,
          sellPrice: loot.sellPrice,
          parent: monster ? { id: monster.id, name: monster.name } : undefined,
        });
      }
    }
  }

  // Rings
  for (const ring of rings().get()) {
    if (matches(query, ring.id, ring.name)) {
      add({
        kind: 'ring',
        id: ring.id,
        name: ring.name,
        image: ring.image,
        sellPrice: ring.sellPrice,
      });
    }
  }

  // Tools
  for (const tool of tools().get()) {
    if (tool.type === 'upgradeable') {
      if (matches(query, tool.id, tool.name)) {
        const image = tool.levels.find((l) => l.image !== null)?.image;
        if (image) {
          add({ kind: 'tool', id: tool.id, name: tool.name, image, sellPrice: null });
        }
      }
    } else if (tool.type === 'fishing-rod') {
      for (const level of tool.levels) {
        if (matches(query, level.name, level.name)) {
          add({ kind: 'tool', id: tool.id, name: level.name, image: level.image, sellPrice: null });
        }
      }
    } else {
      if (matches(query, tool.id, tool.name)) {
        add({ kind: 'tool', id: tool.id, name: tool.name, image: tool.image, sellPrice: null });
      }
    }
  }

  // Weapons
  for (const weapon of weapons().get()) {
    if (matches(query, weapon.id, weapon.name)) {
      add({
        kind: 'weapon',
        id: weapon.id,
        name: weapon.name,
        image: weapon.image,
        sellPrice: weapon.sellPrice,
      });
    }
  }

  // Artisan goods
  for (const good of artisanGoods().get()) {
    if (matches(query, good.id, good.name)) {
      add({
        kind: 'artisan-good',
        id: good.id,
        name: good.name,
        image: good.image,
        sellPrice: good.sellPrice,
      });
    }
  }

  // Hats
  for (const hat of hats().get()) {
    if (matches(query, hat.id, hat.name)) {
      add({ kind: 'hat', id: hat.id, name: hat.name, image: hat.image, sellPrice: null });
    }
  }

  // Footwear
  for (const item of footwear().get()) {
    if (matches(query, item.id, item.name)) {
      add({ kind: 'footwear', id: item.id, name: item.name, image: item.image, sellPrice: null });
    }
  }

  // Forageables
  for (const item of forageables().get()) {
    if (matches(query, item.id, item.name)) {
      add({
        kind: 'forageable',
        id: item.id,
        name: item.name,
        image: item.image,
        sellPrice: item.sellPrice,
      });
    }
  }

  // Fish
  for (const item of fish().get()) {
    if (matches(query, item.id, item.name)) {
      add({
        kind: 'fish',
        id: item.id,
        name: item.name,
        image: item.image,
        sellPrice: item.sellPrice,
      });
    }
  }

  // Bait
  for (const item of bait().get()) {
    if (matches(query, item.id, item.name)) {
      add({
        kind: 'bait',
        id: item.id,
        name: item.name,
        image: item.image,
        sellPrice: item.sellPrice,
      });
    }
  }

  // Tackle
  for (const item of tackle().get()) {
    if (matches(query, item.id, item.name)) {
      add({
        kind: 'tackle',
        id: item.id,
        name: item.name,
        image: item.image,
        sellPrice: item.sellPrice,
      });
    }
  }

  // Cooked dishes
  for (const dish of cooking().get()) {
    if (matches(query, dish.id, dish.name)) {
      add({
        kind: 'cooked-dish',
        id: dish.id,
        name: dish.name,
        image: dish.image,
        sellPrice: dish.sellPrice,
      });
    }
  }

  // Artifacts
  for (const artifact of artifacts().get()) {
    if (matches(query, artifact.id, artifact.name)) {
      add({
        kind: 'artifact',
        id: artifact.id,
        name: artifact.name,
        image: artifact.image,
        sellPrice: artifact.sellPrice,
      });
    }
  }

  // Crafting recipes
  for (const recipe of crafting().get()) {
    if (matches(query, recipe.id, recipe.name)) {
      add({
        kind: 'crafting-recipe',
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        sellPrice: null,
      });
    }
  }

  // Minerals, geodes, ores, bars, nodes, and resources
  for (const mineral of minerals().get()) {
    if (matches(query, mineral.id, mineral.name)) {
      if (mineral.kind === 'geode') {
        add({
          kind: 'geode',
          id: mineral.id,
          name: mineral.name,
          image: mineral.image,
          sellPrice: mineral.sellPrice,
        });
      } else if (mineral.kind === 'node') {
        add({
          kind: 'mining-node',
          id: mineral.id,
          name: mineral.name,
          image: mineral.image,
          sellPrice: null,
        });
      } else if (mineral.kind === 'resource') {
        add({
          kind: 'mineral-resource',
          id: mineral.id,
          name: mineral.name,
          image: mineral.image,
          sellPrice: mineral.sellPrice,
        });
      } else {
        add({
          kind: 'mineral',
          id: mineral.id,
          name: mineral.name,
          image: mineral.image,
          sellPrice: mineral.sellPrice,
        });
      }
    }
  }

  return dedupe(raw);
}
