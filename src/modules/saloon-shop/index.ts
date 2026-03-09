import { QueryBase } from '@/common/query-base';
import saloonData from '@/data/saloon-shop.json';
import { SaloonCategory, SaloonItem } from '@/types';

const allSaloonData: SaloonItem[] = saloonData as SaloonItem[];

/** Query builder for The Stardrop Saloon shop stock. All filter and sort methods return a new SaloonQuery for chaining. */
export class SaloonQuery extends QueryBase<SaloonItem> {
  constructor(data: SaloonItem[] = allSaloonData) {
    super(data);
  }

  /** Filter to food and drink items only. */
  food(): SaloonQuery {
    return new SaloonQuery(this.data.filter((item) => item.category === 'food'));
  }

  /** Filter to cooking recipe items only. */
  recipes(): SaloonQuery {
    return new SaloonQuery(this.data.filter((item) => item.category === 'recipe'));
  }

  /** Filter by category. */
  byCategory(category: SaloonCategory): SaloonQuery {
    return new SaloonQuery(this.data.filter((item) => item.category === category));
  }

  /** Filter to items that are always available (no special purchase condition). */
  alwaysAvailable(): SaloonQuery {
    return new SaloonQuery(this.data.filter((item) => item.availability === undefined));
  }

  /** Sort by price ascending or descending. */
  sortByPrice(order: 'asc' | 'desc' = 'asc'): SaloonQuery {
    return new SaloonQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price)),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): SaloonQuery {
    return new SaloonQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a SaloonQuery for all items sold at The Stardrop Saloon. Pass `source` to wrap a pre-filtered array. */
export function saloon(source: SaloonItem[] = allSaloonData): SaloonQuery {
  return new SaloonQuery(source);
}
