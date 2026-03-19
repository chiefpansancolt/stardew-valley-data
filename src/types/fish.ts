import { EnergyHealth, ItemQuality, Season } from './common';

export type FishCatchType = 'rod' | 'crab-pot';
export type FishWeather = 'sunny' | 'rainy' | 'both';

export interface Fish {
  id: string;
  name: string;
  description: string;
  catchType: FishCatchType;
  seasons: Season[];
  location: string;
  weather?: FishWeather;
  time?: string;
  difficulty?: number;
  sellPrice: number;
  fishTank: boolean;
  usedIn: string[];
  energyHealth?: EnergyHealth;
  maxQuality: ItemQuality;
  image: string;
}
