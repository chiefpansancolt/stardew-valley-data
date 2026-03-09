import { QueryBase } from '@/common/query-base';
import pierreData from '@/data/pierre.json';
import { PierreCategory, PierreItem, Season } from '@/types';

const allPierreData: PierreItem[] = pierreData as PierreItem[];

/** Query builder for Pierre's General Store stock. All filter and sort methods return a new PierreQuery for chaining. */
export class PierreQuery extends QueryBase<PierreItem> {
  constructor(data: PierreItem[] = allPierreData) {
    super(data);
  }

  /** Filter to items available in the given season (includes permanent and multi-season items). */
  bySeason(season: Season): PierreQuery {
    return new PierreQuery(
      this.data.filter((item) => item.seasons.length === 0 || item.seasons.includes(season)),
    );
  }

  /** Filter to year-round permanent stock only (no seasonal seeds). */
  permanent(): PierreQuery {
    return new PierreQuery(this.data.filter((item) => item.seasons.length === 0));
  }

  /** Filter to seasonal seed stock only (items with at least one season). */
  seeds(): PierreQuery {
    return new PierreQuery(this.data.filter((item) => item.category === 'seed'));
  }

  /** Filter to fruit tree saplings only. */
  saplings(): PierreQuery {
    return new PierreQuery(this.data.filter((item) => item.category === 'sapling'));
  }

  /** Filter to cooking ingredients only. */
  ingredients(): PierreQuery {
    return new PierreQuery(this.data.filter((item) => item.category === 'ingredient'));
  }

  /** Filter to fertilizers and farming supplies only. */
  fertilizers(): PierreQuery {
    return new PierreQuery(this.data.filter((item) => item.category === 'fertilizer'));
  }

  /** Filter to recipe items only. */
  recipes(): PierreQuery {
    return new PierreQuery(this.data.filter((item) => item.category === 'recipe'));
  }

  /** Filter by category. */
  byCategory(category: PierreCategory): PierreQuery {
    return new PierreQuery(this.data.filter((item) => item.category === category));
  }

  /** Filter to items that are always available (no special purchase condition). */
  alwaysAvailable(): PierreQuery {
    return new PierreQuery(this.data.filter((item) => item.availability === undefined));
  }

  /** Sort by price ascending or descending. */
  sortByPrice(order: 'asc' | 'desc' = 'asc'): PierreQuery {
    return new PierreQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price)),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): PierreQuery {
    return new PierreQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a PierreQuery for all items sold at Pierre's General Store. Pass `source` to wrap a pre-filtered array. */
export function pierre(source: PierreItem[] = allPierreData): PierreQuery {
  return new PierreQuery(source);
}
