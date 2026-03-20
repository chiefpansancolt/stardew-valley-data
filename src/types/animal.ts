import { ItemQuality, ProfessionBonus } from './common';

export interface AnimalProduce {
  id: string;
  name: string;
  sellPrice: number;
  profession: ProfessionBonus[];
  maxQuality: ItemQuality;
  image: string;
}

export interface Pet {
  type: 'pet';
  id: string;
  name: string;
  variant?: number;
  image: string;
}

export interface FarmAnimal {
  type: 'farm-animal';
  id: string;
  name: string;
  description: string;
  building: string;
  purchasePrice: number | null;
  sellPrice: number;
  daysToMature: number;
  daysToProduce: number;
  harvestMethod: 'drop' | 'tool' | 'dig';
  harvestTool: string | null;
  produce: AnimalProduce;
  deluxeProduce: AnimalProduce | null;
  image: string;
}

export type Animal = Pet | FarmAnimal;
