import data from '@/data/mixed-seeds.json';
import { MixedSeed, Season } from '@/types';

const mixedSeedData: MixedSeed[] = data as MixedSeed[];

export class MixedSeedQuery {
  constructor(private data: MixedSeed[] = mixedSeedData) {}

  byProduces(season: Season): MixedSeedQuery {
    return new MixedSeedQuery(this.data.filter((s) => s.produces[season] !== undefined));
  }

  withBuyPrices(): MixedSeedQuery {
    return new MixedSeedQuery(this.data.filter((s) => s.buyPrices.length > 0));
  }

  find(id: string): MixedSeed | undefined {
    return this.data.find((s) => s.id === id);
  }

  findByName(name: string): MixedSeed | undefined {
    return this.data.find((s) => s.name.toLowerCase() === name.toLowerCase());
  }

  get(): MixedSeed[] {
    return this.data;
  }

  first(): MixedSeed | undefined {
    return this.data[0];
  }

  count(): number {
    return this.data.length;
  }
}

export function mixedSeeds(source: MixedSeed[] = mixedSeedData): MixedSeedQuery {
  return new MixedSeedQuery(source);
}
