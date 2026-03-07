import data from '@/data/seasons.json';
import { Festival, SeasonData } from '@/types';

const seasonData: SeasonData[] = data as SeasonData[];

export class SeasonQuery {
  constructor(private data: SeasonData[] = seasonData) {}

  withFestivals(): SeasonQuery {
    return new SeasonQuery(this.data.filter((s) => s.festivals.length > 0));
  }

  get(): SeasonData[] {
    return this.data;
  }

  first(): SeasonData | undefined {
    return this.data[0];
  }

  find(id: SeasonData['id']): SeasonData | undefined {
    return this.data.find((s) => s.id === id);
  }

  findByName(name: string): SeasonData | undefined {
    return this.data.find((s) => s.name.toLowerCase() === name.toLowerCase());
  }

  count(): number {
    return this.data.length;
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

export function seasons(source: SeasonData[] = seasonData): SeasonQuery {
  return new SeasonQuery(source);
}
