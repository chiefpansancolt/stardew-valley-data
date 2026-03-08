import footwearData from '@/data/footwear.json';
import { Footwear } from '@/types';

const allFootwearData: Footwear[] = footwearData as Footwear[];

export class FootwearQuery {
  constructor(private data: Footwear[] = allFootwearData) {}

  sortByName(order: 'asc' | 'desc' = 'asc'): FootwearQuery {
    return new FootwearQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  sortByDefense(order: 'asc' | 'desc' = 'desc'): FootwearQuery {
    return new FootwearQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.defense - b.defense : b.defense - a.defense,
      ),
    );
  }

  sortByImmunity(order: 'asc' | 'desc' = 'desc'): FootwearQuery {
    return new FootwearQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.immunity - b.immunity : b.immunity - a.immunity,
      ),
    );
  }

  get(): Footwear[] {
    return this.data;
  }

  first(): Footwear | undefined {
    return this.data[0];
  }

  find(id: string): Footwear | undefined {
    return this.data.find((f) => f.id === id);
  }

  findByName(name: string): Footwear | undefined {
    const q = name.toLowerCase();
    return this.data.find((f) => f.name.toLowerCase() === q);
  }

  count(): number {
    return this.data.length;
  }
}

export function footwear(source: Footwear[] = allFootwearData): FootwearQuery {
  return new FootwearQuery(source);
}
