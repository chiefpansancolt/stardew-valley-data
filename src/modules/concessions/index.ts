import { QueryBase } from '@/common/query-base';
import concessionsData from '@/data/concessions.json';
import { Concession, ConcessionTag } from '@/types';

const allConcessions: Concession[] = concessionsData as Concession[];

/** Query builder for Movie Theater concession stand data. All filter and sort methods return a new ConcessionQuery for chaining. */
export class ConcessionQuery extends QueryBase<Concession> {
  constructor(data: Concession[] = allConcessions) {
    super(data);
  }

  /** Filter to items that include the given tag. */
  byTag(tag: ConcessionTag): ConcessionQuery {
    return new ConcessionQuery(this.data.filter((item) => item.tags.includes(tag)));
  }

  /** Sort by price ascending or descending. */
  sortByPrice(order: 'asc' | 'desc' = 'asc'): ConcessionQuery {
    return new ConcessionQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price)),
    );
  }

  /** Sort alphabetically by name. */
  sortByName(order: 'asc' | 'desc' = 'asc'): ConcessionQuery {
    return new ConcessionQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a ConcessionQuery for all Movie Theater concession stand items. Pass `source` to wrap a pre-filtered array. */
export function concessions(source: Concession[] = allConcessions): ConcessionQuery {
  return new ConcessionQuery(source);
}
