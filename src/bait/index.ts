import baitData from '@/data/bait.json';
import { Bait } from '@/types';

const allBaitData: Bait[] = baitData as Bait[];

export class BaitQuery {
  constructor(private data: Bait[] = allBaitData) {}

  sortByName(order: 'asc' | 'desc' = 'asc'): BaitQuery {
    const sorted = [...this.data].sort((a, b) =>
      order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
    return new BaitQuery(sorted);
  }

  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): BaitQuery {
    const sorted = [...this.data].sort((a, b) =>
      order === 'asc' ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice,
    );
    return new BaitQuery(sorted);
  }

  get(): Bait[] {
    return this.data;
  }

  first(): Bait | undefined {
    return this.data[0];
  }

  find(id: string): Bait | undefined {
    return this.data.find((b) => b.id === id);
  }

  findByName(name: string): Bait | undefined {
    return this.data.find((b) => b.name.toLowerCase() === name.toLowerCase());
  }

  count(): number {
    return this.data.length;
  }
}

export function bait(source: Bait[] = allBaitData): BaitQuery {
  return new BaitQuery(source);
}
