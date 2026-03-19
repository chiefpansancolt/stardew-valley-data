import { QueryBase } from '@/common/query-base';
import data from '@/data/footwear.json';
import { Footwear } from '@/types';

const footwearData: Footwear[] = data as Footwear[];

/** Query builder for footwear data. All sort methods return a new FootwearQuery for chaining. */
export class FootwearQuery extends QueryBase<Footwear> {
  constructor(data: Footwear[] = footwearData) {
    super(data);
  }

  /** Sort alphabetically by name. Default: `'asc'`. */
  sortByName(order: 'asc' | 'desc' = 'asc'): FootwearQuery {
    return new FootwearQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  /** Sort by defense value. Default: `'desc'` (highest first). */
  sortByDefense(order: 'asc' | 'desc' = 'desc'): FootwearQuery {
    return new FootwearQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.defense - b.defense : b.defense - a.defense,
      ),
    );
  }

  /** Sort by immunity value. Default: `'desc'` (highest first). */
  sortByImmunity(order: 'asc' | 'desc' = 'desc'): FootwearQuery {
    return new FootwearQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.immunity - b.immunity : b.immunity - a.immunity,
      ),
    );
  }
}

/** Returns a FootwearQuery for all footwear data. Pass `source` to wrap a pre-filtered array. */
export function footwear(source: Footwear[] = footwearData): FootwearQuery {
  return new FootwearQuery(source);
}
