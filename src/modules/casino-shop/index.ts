import { QueryBase } from '@/common/query-base';
import casinoData from '@/data/casino-shop.json';
import { CasinoCategory, CasinoItem } from '@/types';

const allCasinoData: CasinoItem[] = casinoData as CasinoItem[];

/** Query builder for the Casino shop stock. All prices are in Qi Coins. All filter and sort methods return a new CasinoQuery for chaining. */
export class CasinoQuery extends QueryBase<CasinoItem> {
  constructor(data: CasinoItem[] = allCasinoData) {
    super(data);
  }

  /** Filter to items in the given category. */
  byCategory(category: CasinoCategory): CasinoQuery {
    return new CasinoQuery(this.data.filter((item) => item.category === category));
  }

  /** Filter to furniture and decoration items. */
  furniture(): CasinoQuery {
    return new CasinoQuery(this.data.filter((item) => item.category === 'furniture'));
  }

  /** Filter to consumable items (fireworks, magnet, warp totem, hardwood fence). */
  consumables(): CasinoQuery {
    return new CasinoQuery(this.data.filter((item) => item.category === 'consumable'));
  }

  /** Sort by price in Qi Coins ascending or descending. */
  sortByPrice(order: 'asc' | 'desc' = 'asc'): CasinoQuery {
    return new CasinoQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price)),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): CasinoQuery {
    return new CasinoQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a CasinoQuery for all items sold at the Casino. All prices are in Qi Coins. Pass `source` to wrap a pre-filtered array. */
export function casino(source: CasinoItem[] = allCasinoData): CasinoQuery {
  return new CasinoQuery(source);
}
