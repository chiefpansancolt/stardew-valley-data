import { QueryBase } from '@/common/query-base';
import krobusData from '@/data/krobus-shop.json';
import { KrobusDay, KrobusItem } from '@/types';

const allKrobusData: KrobusItem[] = krobusData as KrobusItem[];

/** Query builder for Krobus's shop stock. All filter and sort methods return a new KrobusQuery for chaining. */
export class KrobusQuery extends QueryBase<KrobusItem> {
  constructor(data: KrobusItem[] = allKrobusData) {
    super(data);
  }

  /** Filter to year-round permanent stock only. */
  permanent(): KrobusQuery {
    return new KrobusQuery(this.data.filter((item) => item.stockType === 'permanent'));
  }

  /** Filter to daily rotating items only. */
  daily(): KrobusQuery {
    return new KrobusQuery(this.data.filter((item) => item.stockType === 'daily'));
  }

  /** Filter to items available on the given day of the week. */
  byDay(day: KrobusDay): KrobusQuery {
    return new KrobusQuery(
      this.data.filter((item) => item.stockType === 'permanent' || item.day === day),
    );
  }

  /** Filter to crafting or building recipe items only. */
  recipes(): KrobusQuery {
    return new KrobusQuery(this.data.filter((item) => item.isRecipe));
  }

  /** Filter to items that are always available (no special purchase condition). */
  alwaysAvailable(): KrobusQuery {
    return new KrobusQuery(this.data.filter((item) => item.availability === undefined));
  }

  /** Sort by price ascending or descending. */
  sortByPrice(order: 'asc' | 'desc' = 'asc'): KrobusQuery {
    return new KrobusQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price)),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): KrobusQuery {
    return new KrobusQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a KrobusQuery for all items sold by Krobus. Pass `source` to wrap a pre-filtered array. */
export function krobus(source: KrobusItem[] = allKrobusData): KrobusQuery {
  return new KrobusQuery(source);
}
