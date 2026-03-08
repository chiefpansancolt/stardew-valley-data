import { QueryBase } from '@/common/query-base';
import ringData from '@/data/rings.json';
import { Ring } from '@/types';

const ringsData: Ring[] = ringData as Ring[];

/** Query builder for ring data. All filter and sort methods return a new RingQuery for chaining. */
export class RingQuery extends QueryBase<Ring> {
  constructor(data: Ring[] = ringsData) {
    super(data);
  }

  /** Filter to rings that have crafting ingredients (craftable at the Forge or crafting table). */
  craftable(): RingQuery {
    return new RingQuery(this.data.filter((r) => r.ingredients.length > 0));
  }

  /** Filter to rings available for purchase (have a `purchasePrice`). */
  purchasable(): RingQuery {
    return new RingQuery(this.data.filter((r) => r.purchasePrice !== null));
  }

  /** Sort by sell price. Default: `'desc'` (most valuable first). */
  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): RingQuery {
    return new RingQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice,
      ),
    );
  }
}

/** Returns a RingQuery for all ring data. Pass `source` to wrap a pre-filtered array. */
export function rings(source: Ring[] = ringsData): RingQuery {
  return new RingQuery(source);
}
