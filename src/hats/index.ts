import hatData from '@/data/hats.json';
import { Hat } from '@/types';

const hatsData: Hat[] = hatData as Hat[];

export class HatQuery {
  constructor(private data: Hat[] = hatsData) {}

  sortByName(order: 'asc' | 'desc' = 'asc'): HatQuery {
    return new HatQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  get(): Hat[] {
    return this.data;
  }

  first(): Hat | undefined {
    return this.data[0];
  }

  find(id: string): Hat | undefined {
    return this.data.find((h) => h.id === id);
  }

  findByName(name: string): Hat | undefined {
    const q = name.toLowerCase();
    return this.data.find((h) => h.name.toLowerCase() === q);
  }

  count(): number {
    return this.data.length;
  }
}

export function hats(source: Hat[] = hatsData): HatQuery {
  return new HatQuery(source);
}
