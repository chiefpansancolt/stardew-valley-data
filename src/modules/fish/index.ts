import { QueryBase } from '@/common/query-base';
import data from '@/data/fish.json';
import { Fish, FishCatchType, Season } from '@/types';

const fishData: Fish[] = data as Fish[];

/** Query builder for fish data. All filter and sort methods return a new FishQuery for chaining. */
export class FishQuery extends QueryBase<Fish> {
  constructor(data: Fish[] = fishData) {
    super(data);
  }

  /** Filter to fish available in the given season. */
  bySeason(season: Season): FishQuery {
    return new FishQuery(this.data.filter((f) => f.seasons.includes(season)));
  }

  /** Filter by catch type (`'rod'` or `'crab-pot'`). */
  byCatchType(type: FishCatchType): FishQuery {
    return new FishQuery(this.data.filter((f) => f.catchType === type));
  }

  /** Filter by weather condition (`'sunny'`, `'rainy'`, or `'both'`). */
  byWeather(weather: 'sunny' | 'rainy' | 'both'): FishQuery {
    return new FishQuery(this.data.filter((f) => f.weather === weather));
  }

  /** Filter by location name (case-insensitive substring match). */
  byLocation(location: string): FishQuery {
    const q = location.toLowerCase();
    return new FishQuery(this.data.filter((f) => f.location.toLowerCase().includes(q)));
  }

  /** Sort alphabetically by name. Default: `'asc'`. */
  sortByName(order: 'asc' | 'desc' = 'asc'): FishQuery {
    return new FishQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  /** Sort by sell price. Default: `'desc'` (most valuable first). */
  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): FishQuery {
    return new FishQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice,
      ),
    );
  }

  /**
   * Sort by fishing difficulty (0–100). Crab-pot fish have no difficulty and sort as 0.
   * Default: `'desc'` (hardest first).
   */
  sortByDifficulty(order: 'asc' | 'desc' = 'desc'): FishQuery {
    return new FishQuery(
      [...this.data].sort((a, b) => {
        const da = a.difficulty ?? 0;
        const db = b.difficulty ?? 0;
        return order === 'asc' ? da - db : db - da;
      }),
    );
  }
}

/** Returns a FishQuery for all fish data. Pass `source` to wrap a pre-filtered array. */
export function fish(source: Fish[] = fishData): FishQuery {
  return new FishQuery(source);
}
