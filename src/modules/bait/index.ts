import { QueryBase } from '@/common/query-base';
import baitData from '@/data/bait.json';
import { Bait } from '@/types';

const allBaitData: Bait[] = baitData as Bait[];

/** Query builder for fishing bait data. All sort methods return a new BaitQuery for chaining. */
export class BaitQuery extends QueryBase<Bait> {
  constructor(data: Bait[] = allBaitData) {
    super(data);
  }

  sortByName(order: 'asc' | 'desc' = 'asc'): BaitQuery {
    const sorted = [...this.data].sort((a, b) =>
      order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
    return new BaitQuery(sorted);
  }

  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): BaitQuery {
    const sorted = [...this.data].sort((a, b) =>
      order === 'asc' ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice,
    );
    return new BaitQuery(sorted);
  }
}

/** Returns a BaitQuery for all bait data. Pass `source` to wrap a pre-filtered array. */
export function bait(source: Bait[] = allBaitData): BaitQuery {
  return new BaitQuery(source);
}
