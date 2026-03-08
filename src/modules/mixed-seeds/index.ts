import { QueryBase } from '@/common/query-base';
import data from '@/data/mixed-seeds.json';
import { MixedSeed, Season } from '@/types';

const mixedSeedData: MixedSeed[] = data as MixedSeed[];

/** Query builder for mixed seed data. All filter methods return a new MixedSeedQuery for chaining. */
export class MixedSeedQuery extends QueryBase<MixedSeed> {
  constructor(data: MixedSeed[] = mixedSeedData) {
    super(data);
  }

  /** Filter to mixed seeds that can produce crops in the given season. */
  byProduces(season: Season): MixedSeedQuery {
    return new MixedSeedQuery(this.data.filter((s) => s.produces[season] !== undefined));
  }

  /** Filter to mixed seeds that have at least one purchase price listed. */
  withBuyPrices(): MixedSeedQuery {
    return new MixedSeedQuery(this.data.filter((s) => s.buyPrices.length > 0));
  }
}

/** Returns a MixedSeedQuery for all mixed seed data. Pass `source` to wrap a pre-filtered array. */
export function mixedSeeds(source: MixedSeed[] = mixedSeedData): MixedSeedQuery {
  return new MixedSeedQuery(source);
}
