export interface BuildingMaterial {
  id: string;
  item: string;
  quantity: number;
}

export type BuildingBuilder = 'Robin' | 'Wizard';

export interface Building {
  id: string;
  name: string;
  description: string;
  builder: BuildingBuilder;
  buildCost: number;
  buildDays: number;
  materials: BuildingMaterial[];
  upgradeFrom: string | null;
  magical: boolean;
  image: string;
}
