import { QueryBase } from '@/common/query-base';
import data from '@/data/forageables.json';
import { Forageable, Season } from '@/types';

const forageableData: Forageable[] = data as Forageable[];

/** Query builder for forageable item data. All filter and sort methods return a new ForageableQuery for chaining. */
export class ForageableQuery extends QueryBase<Forageable> {
  constructor(data: Forageable[] = forageableData) {
    super(data);
  }

  /** Filter to forageables available in the given season. */
  bySeason(season: Season): ForageableQuery {
    return new ForageableQuery(this.data.filter((f) => f.seasons.includes(season)));
  }

  /** Sort alphabetically by name. Default: `'asc'`. */
  sortByName(order: 'asc' | 'desc' = 'asc'): ForageableQuery {
    return new ForageableQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  /** Sort by sell price. Default: `'desc'` (most valuable first). */
  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): ForageableQuery {
    return new ForageableQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice,
      ),
    );
  }
}

/** Returns a ForageableQuery for all forageable data. Pass `source` to wrap a pre-filtered array. */
export function forageables(source: Forageable[] = forageableData): ForageableQuery {
  return new ForageableQuery(source);
}
