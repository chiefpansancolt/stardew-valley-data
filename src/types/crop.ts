import { Season } from './common';

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
  seedBuyPrice: number;
  sellPrice: number;
  harvestQuantity: HarvestQuantity;
  trellis: boolean;
  giant: boolean;
  description: string;
  image: string;
  seedImage: string;
}
