import fishData from '@/data/fish.json';
import { Fish, FishCatchType, Season } from '@/types';

const allFishData: Fish[] = fishData as Fish[];

export class FishQuery {
  constructor(private data: Fish[] = allFishData) {}

  bySeason(season: Season): FishQuery {
    return new FishQuery(this.data.filter((f) => f.seasons.includes(season)));
  }

  byCatchType(type: FishCatchType): FishQuery {
    return new FishQuery(this.data.filter((f) => f.catchType === type));
  }

  byWeather(weather: 'sunny' | 'rainy' | 'both'): FishQuery {
    return new FishQuery(this.data.filter((f) => f.weather === weather));
  }

  byLocation(location: string): FishQuery {
    const q = location.toLowerCase();
    return new FishQuery(this.data.filter((f) => f.location.toLowerCase().includes(q)));
  }

  sortByName(order: 'asc' | 'desc' = 'asc'): FishQuery {
    return new FishQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): FishQuery {
    return new FishQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice,
      ),
    );
  }

  sortByDifficulty(order: 'asc' | 'desc' = 'desc'): FishQuery {
    return new FishQuery(
      [...this.data].sort((a, b) => {
        const da = a.difficulty ?? 0;
        const db = b.difficulty ?? 0;
        return order === 'asc' ? da - db : db - da;
      }),
    );
  }

  get(): Fish[] {
    return this.data;
  }

  first(): Fish | undefined {
    return this.data[0];
  }

  find(id: string): Fish | undefined {
    return this.data.find((f) => f.id === id);
  }

  findByName(name: string): Fish | undefined {
    const q = name.toLowerCase();
    return this.data.find((f) => f.name.toLowerCase() === q);
  }

  count(): number {
    return this.data.length;
  }
}

export function fish(source: Fish[] = allFishData): FishQuery {
  return new FishQuery(source);
}
