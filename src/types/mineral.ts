import { ProfessionBonus } from './common';

export interface SmeltRecipe {
  ore: string;
  oreQty: number;
  coalQty: number;
  timeMinutes: number;
  outputQty?: number;
}

export interface MineralItem {
  id: string;
  name: string;
  kind: 'mineral';
  description: string;
  sellPrice: number;
  profession: ProfessionBonus[];
  gemologistPrice: number;
  locations: string[];
  image: string;
}

export interface GeodeContent {
  name: string;
  image?: string;
  quantity?: string;
  chance?: string;
}

export interface GeodeContainer {
  id: string;
  name: string;
  kind: 'geode';
  description: string;
  sellPrice: number;
  profession: ProfessionBonus[];
  locations: string[];
  image: string;
  contents?: GeodeContent[];
}

export interface OreItem {
  id: string;
  name: string;
  kind: 'ore';
  description: string;
  sellPrice: number;
  profession: ProfessionBonus[];
  locations: string[];
  image: string;
}

export interface BarItem {
  id: string;
  name: string;
  kind: 'bar';
  description: string;
  sellPrice: number;
  profession: ProfessionBonus[];
  smeltRecipes: SmeltRecipe[];
  image: string;
}

export interface NodeDrop {
  item: string;
  quantity: string;
  chance?: string;
}

export interface NodeItem {
  id: string;
  name: string;
  kind: 'node';
  description: string | null;
  drops: NodeDrop[];
  miningXP: number;
  locations: string[];
  image: string;
}

export interface ResourceItem {
  id: string;
  name: string;
  kind: 'resource';
  description: string;
  sellPrice: number;
  profession: ProfessionBonus[];
  locations: string[];
  image: string;
}

export type Mineral = MineralItem | GeodeContainer | OreItem | BarItem | NodeItem | ResourceItem;
