import forageableData from '@/data/forageables.json';
import { Forageable, Season } from '@/types';

const allForageableData: Forageable[] = forageableData as Forageable[];

export class ForageableQuery {
  constructor(private data: Forageable[] = allForageableData) {}

  bySeason(season: Season): ForageableQuery {
    return new ForageableQuery(this.data.filter((f) => f.seasons.includes(season)));
  }

  sortByName(order: 'asc' | 'desc' = 'asc'): ForageableQuery {
    return new ForageableQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): ForageableQuery {
    return new ForageableQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice,
      ),
    );
  }

  get(): Forageable[] {
    return this.data;
  }

  first(): Forageable | undefined {
    return this.data[0];
  }

  find(id: string): Forageable | undefined {
    return this.data.find((f) => f.id === id);
  }

  findByName(name: string): Forageable | undefined {
    const q = name.toLowerCase();
    return this.data.find((f) => f.name.toLowerCase() === q);
  }

  count(): number {
    return this.data.length;
  }
}

export function forageables(source: Forageable[] = allForageableData): ForageableQuery {
  return new ForageableQuery(source);
}
