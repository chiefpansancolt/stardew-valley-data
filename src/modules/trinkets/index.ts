import { QueryBase } from '@/common/query-base';
import trinketData from '@/data/trinkets.json';
import { Trinket, TrinketSource } from '@/types';

const allTrinkets: Trinket[] = trinketData as Trinket[];

/** Query builder for trinket data. All filter and sort methods return a new TrinketQuery for chaining. */
export class TrinketQuery extends QueryBase<Trinket> {
  constructor(data: Trinket[] = allTrinkets) {
    super(data);
  }

  /** Filter to trinkets from the given source. */
  bySource(source: TrinketSource): TrinketQuery {
    return new TrinketQuery(this.data.filter((t) => t.source === source));
  }

  /** Filter to trinkets that can be re-forged at the Forge. */
  forgeable(): TrinketQuery {
    return new TrinketQuery(this.data.filter((t) => t.forgeable));
  }

  /** Sort alphabetically by name. */
  sortByName(order: 'asc' | 'desc' = 'asc'): TrinketQuery {
    return new TrinketQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a TrinketQuery for all trinkets. Pass `source` to wrap a pre-filtered array. */
export function trinkets(source: Trinket[] = allTrinkets): TrinketQuery {
  return new TrinketQuery(source);
}
