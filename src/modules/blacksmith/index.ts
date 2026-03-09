import { QueryBase } from '@/common/query-base';
import blacksmithData from '@/data/blacksmith.json';
import { BlacksmithItem } from '@/types';

const allBlacksmithData: BlacksmithItem[] = blacksmithData as BlacksmithItem[];

/** Query builder for items sold at the Blacksmith (Clint's shop). All filter and sort methods return a new BlacksmithQuery for chaining. */
export class BlacksmithQuery extends QueryBase<BlacksmithItem> {
  constructor(data: BlacksmithItem[] = allBlacksmithData) {
    super(data);
  }

  /** Sort by price for the given year (1 or 2+) ascending or descending. */
  sortByPrice(year: 1 | 2 = 1, order: 'asc' | 'desc' = 'asc'): BlacksmithQuery {
    const key = year === 1 ? 'priceYear1' : 'priceYear2';
    return new BlacksmithQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a[key] - b[key] : b[key] - a[key])),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): BlacksmithQuery {
    return new BlacksmithQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a BlacksmithQuery for all items sold at the Blacksmith. Pass `source` to wrap a pre-filtered array. */
export function blacksmith(source: BlacksmithItem[] = allBlacksmithData): BlacksmithQuery {
  return new BlacksmithQuery(source);
}
