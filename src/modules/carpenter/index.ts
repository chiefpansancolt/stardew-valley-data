import { QueryBase } from '@/common/query-base';
import carpenterData from '@/data/carpenter.json';
import { CarpenterCategory, CarpenterDay, CarpenterItem } from '@/types';

const allCarpenterData: CarpenterItem[] = carpenterData as CarpenterItem[];

/** Query builder for Robin's Carpenter Shop stock. All filter and sort methods return a new CarpenterQuery for chaining. */
export class CarpenterQuery extends QueryBase<CarpenterItem> {
  constructor(data: CarpenterItem[] = allCarpenterData) {
    super(data);
  }

  /** Filter to items in the given category. */
  byCategory(category: CarpenterCategory): CarpenterQuery {
    return new CarpenterQuery(this.data.filter((item) => item.category === category));
  }

  /** Filter to crafting recipe items only. */
  recipes(): CarpenterQuery {
    return new CarpenterQuery(this.data.filter((item) => item.isRecipe));
  }

  /** Filter to materials (Wood and Stone). */
  materials(): CarpenterQuery {
    return new CarpenterQuery(this.data.filter((item) => item.category === 'material'));
  }

  /** Filter to items available on the given day of the week. Permanent items (no day set) are always included. */
  byDay(day: CarpenterDay): CarpenterQuery {
    return new CarpenterQuery(
      this.data.filter((item) => item.day === undefined || item.day === day),
    );
  }

  /** Filter to items always available (not day-specific). */
  permanent(): CarpenterQuery {
    return new CarpenterQuery(this.data.filter((item) => item.day === undefined));
  }

  /** Filter to items with no special purchase condition. */
  alwaysAvailable(): CarpenterQuery {
    return new CarpenterQuery(this.data.filter((item) => item.availability === undefined));
  }

  /** Sort by price ascending or descending. */
  sortByPrice(order: 'asc' | 'desc' = 'asc'): CarpenterQuery {
    return new CarpenterQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price)),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): CarpenterQuery {
    return new CarpenterQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a CarpenterQuery for all items sold at Robin's Carpenter Shop. Pass `source` to wrap a pre-filtered array. */
export function carpenter(source: CarpenterItem[] = allCarpenterData): CarpenterQuery {
  return new CarpenterQuery(source);
}
