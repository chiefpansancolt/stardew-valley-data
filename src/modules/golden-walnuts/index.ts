import { QueryBase } from '@/common/query-base';
import goldenWalnutData from '@/data/golden-walnuts.json';
import { GoldenWalnut, GoldenWalnutTrackingType } from '@/types';

const allGoldenWalnuts: GoldenWalnut[] = goldenWalnutData as GoldenWalnut[];

/** Query builder for Golden Walnut data. All filter and sort methods return a new GoldenWalnutQuery for chaining. */
export class GoldenWalnutQuery extends QueryBase<GoldenWalnut> {
  constructor(data: GoldenWalnut[] = allGoldenWalnuts) {
    super(data);
  }

  /** Filter by location (case-insensitive substring match). */
  byLocation(location: string): GoldenWalnutQuery {
    const q = location.toLowerCase();
    return new GoldenWalnutQuery(this.data.filter((w) => w.location.toLowerCase().includes(q)));
  }

  /** Filter by tracking type. */
  byTrackingType(type: GoldenWalnutTrackingType): GoldenWalnutQuery {
    return new GoldenWalnutQuery(this.data.filter((w) => w.trackingType === type));
  }

  /** Sort alphabetically by location. */
  sortByLocation(order: 'asc' | 'desc' = 'asc'): GoldenWalnutQuery {
    const sorted = [...this.data].sort((a, b) => a.location.localeCompare(b.location));
    return new GoldenWalnutQuery(order === 'desc' ? sorted.reverse() : sorted);
  }

  /** Sort by walnut amount. */
  sortByAmount(order: 'asc' | 'desc' = 'desc'): GoldenWalnutQuery {
    const sorted = [...this.data].sort((a, b) => a.amount - b.amount);
    return new GoldenWalnutQuery(order === 'desc' ? sorted.reverse() : sorted);
  }

  /** Total number of walnuts across all entries in the current query. */
  totalAmount(): number {
    return this.data.reduce((sum, w) => sum + w.amount, 0);
  }
}

/** Returns a GoldenWalnutQuery for all Golden Walnut data. Pass `source` to wrap a pre-filtered array. */
export function goldenWalnuts(source: GoldenWalnut[] = allGoldenWalnuts): GoldenWalnutQuery {
  return new GoldenWalnutQuery(source);
}
