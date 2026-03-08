import { QueryBase } from '@/common/query-base';
import footwearData from '@/data/footwear.json';
import { Footwear } from '@/types';

const allFootwearData: Footwear[] = footwearData as Footwear[];

/** Query builder for footwear data. All sort methods return a new FootwearQuery for chaining. */
export class FootwearQuery extends QueryBase<Footwear> {
  constructor(data: Footwear[] = allFootwearData) {
    super(data);
  }

  sortByName(order: 'asc' | 'desc' = 'asc'): FootwearQuery {
    return new FootwearQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  sortByDefense(order: 'asc' | 'desc' = 'desc'): FootwearQuery {
    return new FootwearQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.defense - b.defense : b.defense - a.defense,
      ),
    );
  }

  sortByImmunity(order: 'asc' | 'desc' = 'desc'): FootwearQuery {
    return new FootwearQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.immunity - b.immunity : b.immunity - a.immunity,
      ),
    );
  }
}

/** Returns a FootwearQuery for all footwear data. Pass `source` to wrap a pre-filtered array. */
export function footwear(source: Footwear[] = allFootwearData): FootwearQuery {
  return new FootwearQuery(source);
}
