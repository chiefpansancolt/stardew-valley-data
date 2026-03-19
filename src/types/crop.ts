import { EnergyHealth, ItemQuality, Season, SeedBuyPrice, Stage } from './common';

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
  giantImage?: string;
  stages: Stage[];
  energyHealth?: EnergyHealth;
  maxQuality: ItemQuality;
  farmingXP?: number;
}
