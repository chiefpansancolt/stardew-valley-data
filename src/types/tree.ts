import { Season, EnergyHealth, SeedBuyPrice } from './common';

export interface TreeStage {
  name: string;
  image: string;
}

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
  stages: TreeStage[];
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
  stages: TreeStage[];
  tapper?: WildTreeTapper;
}

export type Tree = FruitTree | WildTree;
