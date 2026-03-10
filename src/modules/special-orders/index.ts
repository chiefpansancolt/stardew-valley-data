import { QueryBase } from '@/common/query-base';
import specialOrderData from '@/data/special-orders.json';
import { SpecialOrderCategory, SpecialOrderData } from '@/types';

const allSpecialOrders: SpecialOrderData[] = specialOrderData as SpecialOrderData[];

/** Query builder for Special Order data. All filter and sort methods return a new SpecialOrderQuery for chaining. */
export class SpecialOrderQuery extends QueryBase<SpecialOrderData> {
  constructor(data: SpecialOrderData[] = allSpecialOrders) {
    super(data);
  }

  /** Filter by order type (town or qi). */
  byType(type: SpecialOrderCategory): SpecialOrderQuery {
    return new SpecialOrderQuery(this.data.filter((o) => o.type === type));
  }

  /** Filter by requester NPC name (case-insensitive exact match). */
  byRequester(requester: string): SpecialOrderQuery {
    const q = requester.toLowerCase();
    return new SpecialOrderQuery(this.data.filter((o) => o.requester.toLowerCase() === q));
  }

  /** Filter to repeatable special orders. */
  repeatable(): SpecialOrderQuery {
    return new SpecialOrderQuery(this.data.filter((o) => o.repeatable));
  }

  /** Sort alphabetically by name. */
  sortByName(order: 'asc' | 'desc' = 'asc'): SpecialOrderQuery {
    const sorted = [...this.data].sort((a, b) => a.name.localeCompare(b.name));
    return new SpecialOrderQuery(order === 'desc' ? sorted.reverse() : sorted);
  }
}

/** Returns a SpecialOrderQuery for all Special Order data. Pass `source` to wrap a pre-filtered array. */
export function specialOrders(source: SpecialOrderData[] = allSpecialOrders): SpecialOrderQuery {
  return new SpecialOrderQuery(source);
}
