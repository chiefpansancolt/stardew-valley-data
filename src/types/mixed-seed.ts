import { Season, SeedBuyPrice } from './common';

export type MixedSeedProduces = Partial<Record<Season, string[]>>;

export interface MixedSeed {
  id: string;
  name: string;
  sellPrice: number;
  description: string;
  image: string;
  buyPrices: SeedBuyPrice[];
  produces: MixedSeedProduces;
}
