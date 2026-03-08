import { EnergyHealth, Season, SeedBuyPrice, Stage } from './common';

export interface FruitTreeProduce {
  id: string;
  name: string;
  sellPrice: number;
  image: string;
  energyHealth?: EnergyHealth;
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
  seedId: string;
  seedName: string;
  description: string;
  image: string;
  seedImage: string;
  stages: Stage[];
  tapper?: WildTreeTapper;
}

export type Tree = FruitTree | WildTree;
