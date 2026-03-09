import { QueryBase } from '@/common/query-base';
import marnieData from '@/data/marnie.json';
import { MarnieCategory, MarnieItem } from '@/types';

const allMarnieData: MarnieItem[] = marnieData as MarnieItem[];

/** Query builder for Marnie's Ranch shop stock. All filter and sort methods return a new MarnieQuery for chaining. */
export class MarnieQuery extends QueryBase<MarnieItem> {
  constructor(data: MarnieItem[] = allMarnieData) {
    super(data);
  }

  /** Filter to items in the given category. */
  byCategory(category: MarnieCategory): MarnieQuery {
    return new MarnieQuery(this.data.filter((item) => item.category === category));
  }

  /** Filter to animal supply items (Hay, Heater, Auto-Grabber). */
  animalSupplies(): MarnieQuery {
    return new MarnieQuery(this.data.filter((item) => item.category === 'animal-supply'));
  }

  /** Filter to tools (Milk Pail, Shears). */
  tools(): MarnieQuery {
    return new MarnieQuery(this.data.filter((item) => item.category === 'tool'));
  }

  /** Filter to furniture and decor items. */
  furniture(): MarnieQuery {
    return new MarnieQuery(this.data.filter((item) => item.category === 'furniture'));
  }

  /** Filter to items with no special purchase condition. */
  alwaysAvailable(): MarnieQuery {
    return new MarnieQuery(this.data.filter((item) => item.availability === undefined));
  }

  /** Sort by price ascending or descending. */
  sortByPrice(order: 'asc' | 'desc' = 'asc'): MarnieQuery {
    return new MarnieQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price)),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): MarnieQuery {
    return new MarnieQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a MarnieQuery for all items sold at Marnie's Ranch. Pass `source` to wrap a pre-filtered array. */
export function marnie(source: MarnieItem[] = allMarnieData): MarnieQuery {
  return new MarnieQuery(source);
}
