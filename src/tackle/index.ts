import tackleData from '@/data/tackle.json';
import { Tackle } from '@/types';

const allTackleData: Tackle[] = tackleData as Tackle[];

export class TackleQuery {
  constructor(private data: Tackle[] = allTackleData) {}

  sortByName(order: 'asc' | 'desc' = 'asc'): TackleQuery {
    const sorted = [...this.data].sort((a, b) =>
      order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
    return new TackleQuery(sorted);
  }

  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): TackleQuery {
    const sorted = [...this.data].sort((a, b) =>
      order === 'asc' ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice,
    );
    return new TackleQuery(sorted);
  }

  get(): Tackle[] {
    return this.data;
  }

  first(): Tackle | undefined {
    return this.data[0];
  }

  find(id: string): Tackle | undefined {
    return this.data.find((t) => t.id === id);
  }

  findByName(name: string): Tackle | undefined {
    return this.data.find((t) => t.name.toLowerCase() === name.toLowerCase());
  }

  count(): number {
    return this.data.length;
  }
}

export function tackle(source: Tackle[] = allTackleData): TackleQuery {
  return new TackleQuery(source);
}
