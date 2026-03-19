import { QueryBase } from '@/common/query-base';
import data from '@/data/bait.json';
import { Bait } from '@/types';

const baitData: Bait[] = data as Bait[];

/** Query builder for fishing bait data. All sort methods return a new BaitQuery for chaining. */
export class BaitQuery extends QueryBase<Bait> {
  constructor(data: Bait[] = baitData) {
    super(data);
  }

  /** Sort alphabetically by name. Default: `'asc'`. */
  sortByName(order: 'asc' | 'desc' = 'asc'): BaitQuery {
    return new BaitQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  /** Sort by sell price. Default: `'desc'` (most valuable first). */
  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): BaitQuery {
    return new BaitQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice,
      ),
    );
  }
}

/** Returns a BaitQuery for all bait data. Pass `source` to wrap a pre-filtered array. */
export function bait(source: Bait[] = baitData): BaitQuery {
  return new BaitQuery(source);
}
