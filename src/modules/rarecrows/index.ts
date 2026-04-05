import { QueryBase } from '@/common/query-base';
import rarecrowData from '@/data/rarecrows.json';
import { Rarecrow } from '@/types';

const rarecrewsData: Rarecrow[] = rarecrowData as Rarecrow[];

/** Query builder for rarecrow data. All sort methods return a new RarecrowQuery for chaining. */
export class RarecrowQuery extends QueryBase<Rarecrow> {
  constructor(data: Rarecrow[] = rarecrewsData) {
    super(data);
  }

  /** Sort by rarecrow number. Default: `'asc'`. */
  sortByNumber(order: 'asc' | 'desc' = 'asc'): RarecrowQuery {
    return new RarecrowQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.number - b.number : b.number - a.number)),
    );
  }
}

/** Returns a RarecrowQuery for all rarecrow data. Pass `source` to wrap a pre-filtered array. */
export function rarecrows(source: Rarecrow[] = rarecrewsData): RarecrowQuery {
  return new RarecrowQuery(source);
}
