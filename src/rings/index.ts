import ringData from '@/data/rings.json';
import { Ring } from '@/types';

const ringsData: Ring[] = ringData as Ring[];

export class RingQuery {
  constructor(private data: Ring[] = ringsData) {}

  craftable(): RingQuery {
    return new RingQuery(this.data.filter((r) => r.ingredients.length > 0));
  }

  purchasable(): RingQuery {
    return new RingQuery(this.data.filter((r) => r.purchasePrice !== null));
  }

  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): RingQuery {
    return new RingQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice,
      ),
    );
  }

  get(): Ring[] {
    return this.data;
  }

  first(): Ring | undefined {
    return this.data[0];
  }

  find(id: string): Ring | undefined {
    return this.data.find((r) => r.id === id);
  }

  findByName(name: string): Ring | undefined {
    const q = name.toLowerCase();
    return this.data.find((r) => r.name.toLowerCase() === q);
  }

  count(): number {
    return this.data.length;
  }
}

export function rings(source: Ring[] = ringsData): RingQuery {
  return new RingQuery(source);
}
