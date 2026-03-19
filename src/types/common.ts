export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'ginger island';

export type Quality = 'silver' | 'gold' | 'iridium';
export type ItemQuality = 'base' | Quality;

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

export interface Stage {
  name: string;
  image: string;
}

export interface GiftPreferences {
  loves: string[];
  likes: string[];
  neutrals: string[];
  dislikes: string[];
  hates: string[];
}
