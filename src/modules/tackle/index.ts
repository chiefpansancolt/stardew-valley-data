import { QueryBase } from '@/common/query-base';
import tackleData from '@/data/tackle.json';
import { Tackle } from '@/types';

const allTackleData: Tackle[] = tackleData as Tackle[];

/** Query builder for fishing tackle data. All sort methods return a new TackleQuery for chaining. */
export class TackleQuery extends QueryBase<Tackle> {
  constructor(data: Tackle[] = allTackleData) {
    super(data);
  }

  sortByName(order: 'asc' | 'desc' = 'asc'): TackleQuery {
    const sorted = [...this.data].sort((a, b) =>
      order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
    return new TackleQuery(sorted);
  }

  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): TackleQuery {
    const sorted = [...this.data].sort((a, b) =>
      order === 'asc' ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice,
    );
    return new TackleQuery(sorted);
  }
}

/** Returns a TackleQuery for all tackle data. Pass `source` to wrap a pre-filtered array. */
export function tackle(source: Tackle[] = allTackleData): TackleQuery {
  return new TackleQuery(source);
}
