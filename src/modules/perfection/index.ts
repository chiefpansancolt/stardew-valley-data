import { QueryBase } from '@/common/query-base';
import perfectionData from '@/data/perfection.json';
import { PerfectionCategory } from '@/types';

const allPerfectionData: PerfectionCategory[] = perfectionData as PerfectionCategory[];

/** Query builder for Perfection Tracker categories. All filter and sort methods return a new PerfectionQuery for chaining. */
export class PerfectionQuery extends QueryBase<PerfectionCategory> {
  constructor(data: PerfectionCategory[] = allPerfectionData) {
    super(data);
  }

  /** Returns the sum of all category weights in the current query. For the full dataset this equals 100. */
  totalWeight(): number {
    return this.data.reduce((sum, c) => sum + c.weight, 0);
  }
}

/** Returns a PerfectionQuery for all Perfection Tracker categories. Pass `source` to wrap a pre-filtered array. */
export function perfection(source: PerfectionCategory[] = allPerfectionData): PerfectionQuery {
  return new PerfectionQuery(source);
}
