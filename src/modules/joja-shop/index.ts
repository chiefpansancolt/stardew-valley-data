import { QueryBase } from '@/common/query-base';
import jojaData from '@/data/joja-shop.json';
import { JojaItem, Season } from '@/types';

const allJojaData: JojaItem[] = jojaData as JojaItem[];

/** Query builder for JojaMart shop stock. All filter and sort methods return a new JojaQuery for chaining. */
export class JojaQuery extends QueryBase<JojaItem> {
  constructor(data: JojaItem[] = allJojaData) {
    super(data);
  }

  /** Filter to items available in the given season (includes permanent and multi-season items). */
  bySeason(season: Season): JojaQuery {
    return new JojaQuery(
      this.data.filter((item) => item.seasons.length === 0 || item.seasons.includes(season)),
    );
  }

  /** Filter to year-round permanent stock only (no seasonal seeds). */
  permanent(): JojaQuery {
    return new JojaQuery(this.data.filter((item) => item.seasons.length === 0));
  }

  /** Filter to seasonal seed stock only (items with at least one season). */
  seeds(): JojaQuery {
    return new JojaQuery(this.data.filter((item) => item.seasons.length > 0));
  }

  /** Filter to items that are always available (no special purchase condition). */
  alwaysAvailable(): JojaQuery {
    return new JojaQuery(this.data.filter((item) => item.availability === undefined));
  }

  /** Sort by price ascending or descending. */
  sortByPrice(order: 'asc' | 'desc' = 'asc'): JojaQuery {
    return new JojaQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price)),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): JojaQuery {
    return new JojaQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a JojaQuery for all items sold at JojaMart. Pass `source` to wrap a pre-filtered array. */
export function joja(source: JojaItem[] = allJojaData): JojaQuery {
  return new JojaQuery(source);
}
