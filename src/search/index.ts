import { SearchResult, SearchResultKind } from '@/types';
import { animals, isFarmAnimal } from '../animals';
import { artisanGoods } from '../artisan-goods';
import { crops } from '../crops';
import { trees } from '../trees';

function matches(query: string, id: string, name: string): boolean {
  const q = query.toLowerCase();
  return id.toLowerCase() === q || name.toLowerCase().includes(q);
}

type RawResult = Omit<SearchResult, 'parents'> & { parent?: { id: string; name: string } };

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

  return dedupe(raw);
}
