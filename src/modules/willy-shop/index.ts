import { QueryBase } from '@/common/query-base';
import willyData from '@/data/willy-shop.json';
import { WillyCategory, WillyItem } from '@/types';

const allWillyData: WillyItem[] = willyData as WillyItem[];

/** Query builder for Willy's Fish Shop stock. All filter and sort methods return a new WillyQuery for chaining. */
export class WillyQuery extends QueryBase<WillyItem> {
  constructor(data: WillyItem[] = allWillyData) {
    super(data);
  }

  /** Filter to fishing rods only. */
  rods(): WillyQuery {
    return new WillyQuery(this.data.filter((item) => item.category === 'rod'));
  }

  /** Filter to bait items only. */
  bait(): WillyQuery {
    return new WillyQuery(this.data.filter((item) => item.category === 'bait'));
  }

  /** Filter to tackle items only. */
  tackle(): WillyQuery {
    return new WillyQuery(this.data.filter((item) => item.category === 'tackle'));
  }

  /** Filter to items in the given category. */
  byCategory(category: WillyCategory): WillyQuery {
    return new WillyQuery(this.data.filter((item) => item.category === category));
  }

  /** Filter to items requiring the given fishing level or lower. */
  byFishingLevel(level: number): WillyQuery {
    return new WillyQuery(
      this.data.filter(
        (item) => item.fishingLevelRequired === undefined || item.fishingLevelRequired <= level,
      ),
    );
  }

  /** Filter to items with no special purchase condition. */
  alwaysAvailable(): WillyQuery {
    return new WillyQuery(this.data.filter((item) => item.availability === undefined));
  }

  /** Sort by price ascending or descending. */
  sortByPrice(order: 'asc' | 'desc' = 'asc'): WillyQuery {
    return new WillyQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price)),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): WillyQuery {
    return new WillyQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }

  /** Sort by fishing level required (ascending by default). */
  sortByFishingLevel(order: 'asc' | 'desc' = 'asc'): WillyQuery {
    return new WillyQuery(
      [...this.data].sort((a, b) => {
        const la = a.fishingLevelRequired ?? 0;
        const lb = b.fishingLevelRequired ?? 0;
        return order === 'asc' ? la - lb : lb - la;
      }),
    );
  }
}

/** Returns a WillyQuery for all items sold at Willy's Fish Shop. Pass `source` to wrap a pre-filtered array. */
export function willy(source: WillyItem[] = allWillyData): WillyQuery {
  return new WillyQuery(source);
}
