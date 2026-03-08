import { QueryBase } from '@/common/query-base';
import data from '@/data/seasons.json';
import { Festival, SeasonData } from '@/types';

const seasonData: SeasonData[] = data as SeasonData[];

/** Query builder for season data. Filter methods return a new SeasonQuery for chaining. */
export class SeasonQuery extends QueryBase<SeasonData> {
  constructor(data: SeasonData[] = seasonData) {
    super(data);
  }

  /** Filter to seasons that have at least one festival. */
  withFestivals(): SeasonQuery {
    return new SeasonQuery(this.data.filter((s) => s.festivals.length > 0));
  }
}

/**
 * Find a festival by name across all seasons (case-insensitive substring match).
 * Returns an array of matching festivals with their season.
 */
export function findFestival(name: string): { season: SeasonData; festival: Festival }[] {
  const q = name.toLowerCase();
  const results: { season: SeasonData; festival: Festival }[] = [];
  for (const season of seasonData) {
    for (const festival of season.festivals) {
      if (festival.name.toLowerCase().includes(q)) {
        results.push({ season, festival });
      }
    }
  }
  return results;
}

/** Returns a SeasonQuery for all season data. Pass `source` to wrap a pre-filtered array. */
export function seasons(source: SeasonData[] = seasonData): SeasonQuery {
  return new SeasonQuery(source);
}
