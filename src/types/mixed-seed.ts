import { Season } from './common';
import { SeedBuyPrice } from './crop';

export type MixedSeedProduces = Partial<Record<Season | 'island', string[]>>;

export interface MixedSeed {
  id: string;
  name: string;
  sellPrice: number;
  description: string;
  image: string;
  buyPrices: SeedBuyPrice[];
  produces: MixedSeedProduces;
}
