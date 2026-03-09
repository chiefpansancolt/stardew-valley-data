import { QueryBase } from '@/common/query-base';
import volcanoShopData from '@/data/volcano-shop.json';
import { VolcanoShopCategory, VolcanoShopCurrency, VolcanoShopItem } from '@/types';

const allVolcanoShopData: VolcanoShopItem[] = volcanoShopData as VolcanoShopItem[];

/** Query builder for the Volcano Dungeon Dwarf shop. Uses mixed currencies (gold, Cinder Shards, Diamonds). All filter and sort methods return a new VolcanoShopQuery for chaining. */
export class VolcanoShopQuery extends QueryBase<VolcanoShopItem> {
  constructor(data: VolcanoShopItem[] = allVolcanoShopData) {
    super(data);
  }

  /** Filter to items purchased with the specified currency. */
  byCurrency(currency: VolcanoShopCurrency): VolcanoShopQuery {
    return new VolcanoShopQuery(this.data.filter((item) => item.currency === currency));
  }

  /** Filter to items purchased with gold. */
  goldItems(): VolcanoShopQuery {
    return new VolcanoShopQuery(this.data.filter((item) => item.currency === 'gold'));
  }

  /** Filter to items purchased with Cinder Shards. */
  cinderShardItems(): VolcanoShopQuery {
    return new VolcanoShopQuery(this.data.filter((item) => item.currency === 'cinder-shard'));
  }

  /** Filter to items purchased with Diamonds. */
  diamondItems(): VolcanoShopQuery {
    return new VolcanoShopQuery(this.data.filter((item) => item.currency === 'diamond'));
  }

  /** Filter by item category. */
  byCategory(category: VolcanoShopCategory): VolcanoShopQuery {
    return new VolcanoShopQuery(this.data.filter((item) => item.category === category));
  }

  /** Filter to consumable items only. */
  consumables(): VolcanoShopQuery {
    return new VolcanoShopQuery(this.data.filter((item) => item.category === 'consumable'));
  }

  /** Filter to food items only. */
  food(): VolcanoShopQuery {
    return new VolcanoShopQuery(this.data.filter((item) => item.category === 'food'));
  }

  /** Filter to items with no special availability condition. */
  alwaysAvailable(): VolcanoShopQuery {
    return new VolcanoShopQuery(this.data.filter((item) => item.availability === undefined));
  }

  /** Sort by price ascending or descending. */
  sortByPrice(order: 'asc' | 'desc' = 'asc'): VolcanoShopQuery {
    return new VolcanoShopQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price)),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): VolcanoShopQuery {
    return new VolcanoShopQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a VolcanoShopQuery for all items at the Volcano Dungeon Dwarf shop. Pass `source` to wrap a pre-filtered array. */
export function volcanoShop(source: VolcanoShopItem[] = allVolcanoShopData): VolcanoShopQuery {
  return new VolcanoShopQuery(source);
}
