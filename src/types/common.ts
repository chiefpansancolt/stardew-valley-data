export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'ginger island';

export interface EnergyHealth {
  energy?: number;
  health?: number;
  poison?: boolean;
}

export interface SeedBuyPrice {
  place: string;
  price: number;
}

export interface Ingredient {
  name: string;
  id: string;
  quantity: number;
}
