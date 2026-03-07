import { Season } from './common';

export interface SeedBuyPrice {
  place: string;
  price: number;
}

export interface CropStage {
  name: string;
  image: string;
}

export interface EnergyHealth {
  energy?: number;
  health?: number;
  poison?: boolean;
}

export interface HarvestQuantity {
  min: number;
  max: number;
}

export interface Crop {
  id: string;
  name: string;
  category: string;
  seasons: Season[];
  growDays: number;
  regrowDays: number | null;
  seedId: string;
  seedName: string;
  seedBuyPrices: SeedBuyPrice[];
  seedSellPrice: number;
  cropSellPrice: number;
  harvestQuantity: HarvestQuantity;
  trellis: boolean;
  giant: boolean;
  description: string;
  image: string;
  seedImage: string;
  stages: CropStage[];
  energyHealth?: EnergyHealth;
}
