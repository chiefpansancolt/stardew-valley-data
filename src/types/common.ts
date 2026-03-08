export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'ginger island';

export type Quality = 'silver' | 'gold' | 'iridium';

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

/** Growth or tree stage entry: a named stage with its sprite image. */
export interface Stage {
  name: string;
  image: string;
}

/** Shared gift preference categories used by Villager and UniversalGifts. */
export interface GiftPreferences {
  loves: string[];
  likes: string[];
  neutrals: string[];
  dislikes: string[];
  hates: string[];
}
