import { EnergyHealth, ItemQuality, ProfessionBonus, Season } from './common';

export type FishCatchType = 'rod' | 'crab-pot';
export type FishWeather = 'sunny' | 'rainy' | 'both';
export type FishRoe = 'roe' | 'caviar';
export type FishCategory =
  | 'regular'
  | 'crab-pot'
  | 'night-market'
  | 'legendary'
  | 'legendary-2'
  | 'other';

export interface FishPondProduce {
  product: string;
  minPopulation: number;
}

export interface FishPond {
  produce: FishPondProduce[];
}

export interface Fish {
  id: string;
  name: string;
  description: string;
  catchType: FishCatchType;
  category: FishCategory;
  seasons: Season[];
  location: string;
  weather?: FishWeather;
  time?: string;
  difficulty?: number;
  sellPrice: number;
  profession: ProfessionBonus[];
  fishTank: boolean;
  canSmoke: boolean;
  roe: FishRoe | null;
  fishPond: FishPond | null;
  usedIn: string[];
  energyHealth?: EnergyHealth;
  maxQuality: ItemQuality;
  image: string;
}
