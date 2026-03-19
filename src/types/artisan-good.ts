import { EnergyHealth, ItemQuality } from './common';

export interface ArtisanIngredient {
  name: string;
  id: string | null;
  quantity: number | null;
}

export interface CaskAging {
  silverDays: number;
  goldDays: number;
  iridiumDays: number;
}

export interface PriceFormula {
  multiplier: number;
  addend: number;
}

export interface ArtisanGood {
  id: string;
  name: string;
  description: string;
  equipment: string;
  ingredients: ArtisanIngredient[];
  processingMinutes: number;
  processingDays: number;
  sellPrice: number | null;
  sellPriceFormula: string | null;
  priceFormula: PriceFormula | null;
  qualityLevels: boolean;
  cask: CaskAging | null;
  energyHealth?: EnergyHealth;
  maxQuality: ItemQuality;
  image: string;
}
