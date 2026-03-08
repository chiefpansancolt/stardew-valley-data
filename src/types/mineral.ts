export interface SmeltRecipe {
  ore: string; // id of the source ore or mineral
  oreQty: number;
  coalQty: number;
  timeMinutes: number;
  outputQty?: number; // defaults to 1; Fire Quartz yields 3 Refined Quartz
}

export interface MineralItem {
  id: string;
  name: string;
  kind: 'mineral';
  description: string;
  sellPrice: number;
  gemologistPrice: number;
  locations: string[];
  image: string;
}

export interface GeodeContainer {
  id: string;
  name: string;
  kind: 'geode';
  description: string;
  sellPrice: number;
  locations: string[];
  image: string;
}

export interface OreItem {
  id: string;
  name: string;
  kind: 'ore';
  description: string;
  sellPrice: number;
  locations: string[];
  image: string;
}

export interface BarItem {
  id: string;
  name: string;
  kind: 'bar';
  description: string;
  sellPrice: number;
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
  locations: string[];
  image: string;
}

export type Mineral = MineralItem | GeodeContainer | OreItem | BarItem | NodeItem | ResourceItem;
