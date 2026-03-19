import { QueryBase } from '@/common/query-base';
import data from '@/data/tackle.json';
import { Tackle } from '@/types';

const tackleData: Tackle[] = data as Tackle[];

/** Query builder for fishing tackle data. All sort methods return a new TackleQuery for chaining. */
export class TackleQuery extends QueryBase<Tackle> {
  constructor(data: Tackle[] = tackleData) {
    super(data);
  }

  /** Sort alphabetically by name. Default: `'asc'`. */
  sortByName(order: 'asc' | 'desc' = 'asc'): TackleQuery {
    return new TackleQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  /** Sort by sell price. Default: `'desc'` (most valuable first). */
  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): TackleQuery {
    return new TackleQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice,
      ),
    );
  }
}

/** Returns a TackleQuery for all tackle data. Pass `source` to wrap a pre-filtered array. */
export function tackle(source: Tackle[] = tackleData): TackleQuery {
  return new TackleQuery(source);
}
