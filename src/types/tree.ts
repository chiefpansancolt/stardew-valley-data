import { ArtisanUses, EnergyHealth, Season, SeedBuyPrice, Stage } from './common';

export interface ChoppedTreeProduce {
  id: string;
  name: string;
  image?: string;
}

export interface FruitTreeProduce {
  id: string;
  name: string;
  sellPrice: number;
  image: string;
  energyHealth?: EnergyHealth;
  artisanUses: ArtisanUses;
}

export interface FruitTree {
  type: 'fruit-tree';
  id: string;
  name: string;
  saplingId: string;
  saplingName: string;
  saplingBuyPrices: SeedBuyPrice[];
  saplingSellPrice: number;
  seasons: Season[];
  daysToMature: number;
  description: string;
  image: string;
  saplingImage: string;
  stages: Stage[];
  produce: FruitTreeProduce;
  choppedProduce: ChoppedTreeProduce[];
}

export interface WildTreeTapper {
  id: string;
  name: string;
  sellPrice: number;
  image: string;
  energyHealth?: EnergyHealth;
}

export interface WildTree {
  type: 'wild-tree';
  id: string;
  name: string;
  seedId?: string;
  seedName?: string;
  description: string;
  image: string;
  seedImage?: string;
  stages: Stage[];
  tapper?: WildTreeTapper;
  choppedProduce: ChoppedTreeProduce[];
}

export type Tree = FruitTree | WildTree;
