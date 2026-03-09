export interface HouseUpgradeMaterial {
  item: string;
  quantity: number;
}

export interface HouseUpgrade {
  id: string;
  name: string;
  tier: number;
  cost: number;
  materials: HouseUpgradeMaterial[];
  description: string;
  image: string;
  prerequisite: string | null;
}

export interface HouseRenovation {
  id: string;
  name: string;
  cost: number;
  description: string;
  image: string;
  prerequisite: string | null;
}
