import { QueryBase } from '@/common/query-base';
import oasisData from '@/data/oasis.json';
import { OasisCategory, OasisDay, OasisItem } from '@/types';

const allOasisData: OasisItem[] = oasisData as OasisItem[];

/** Query builder for Sandy's Oasis shop stock. All filter and sort methods return a new OasisQuery for chaining. */
export class OasisQuery extends QueryBase<OasisItem> {
  constructor(data: OasisItem[] = allOasisData) {
    super(data);
  }

  /** Filter to seeds only. */
  seeds(): OasisQuery {
    return new OasisQuery(this.data.filter((item) => item.category === 'seed'));
  }

  /** Filter to food items only. */
  food(): OasisQuery {
    return new OasisQuery(this.data.filter((item) => item.category === 'food'));
  }

  /** Filter to clothing items only. */
  clothing(): OasisQuery {
    return new OasisQuery(this.data.filter((item) => item.category === 'clothing'));
  }

  /** Filter to items in the given category. */
  byCategory(category: OasisCategory): OasisQuery {
    return new OasisQuery(this.data.filter((item) => item.category === category));
  }

  /** Filter to items always in stock (no day restriction). */
  permanent(): OasisQuery {
    return new OasisQuery(this.data.filter((item) => item.day === undefined));
  }

  /** Filter to day-specific rotating items only. */
  daily(): OasisQuery {
    return new OasisQuery(this.data.filter((item) => item.day !== undefined));
  }

  /** Filter to all items available on the given day (permanent + that day's item). */
  byDay(day: OasisDay): OasisQuery {
    return new OasisQuery(this.data.filter((item) => item.day === undefined || item.day === day));
  }

  /** Filter to items with no special purchase condition. */
  alwaysAvailable(): OasisQuery {
    return new OasisQuery(this.data.filter((item) => item.availability === undefined));
  }

  /** Sort by price ascending or descending. */
  sortByPrice(order: 'asc' | 'desc' = 'asc'): OasisQuery {
    return new OasisQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price)),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): OasisQuery {
    return new OasisQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns an OasisQuery for all items sold at Sandy's Oasis. Pass `source` to wrap a pre-filtered array. */
export function oasis(source: OasisItem[] = allOasisData): OasisQuery {
  return new OasisQuery(source);
}
