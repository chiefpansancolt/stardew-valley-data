export type ToolLevel = 'basic' | 'copper' | 'steel' | 'gold' | 'iridium';

export interface UpgradeLevel {
  level: ToolLevel;
  image: string | null;
  upgradeCost: number | null;
  materialName: string | null;
  materialQuantity: number | null;
  description: string;
}

export interface UpgradeableTool {
  id: string;
  type: 'upgradeable';
  name: string;
  description: string;
  canEnchant: boolean;
  levels: UpgradeLevel[];
}

export interface FishingRod {
  id: string;
  type: 'fishing-rod';
  name: string;
  description: string;
  image: string;
  cost: number | null;
  fishingLevelRequired: number | null;
  bait: boolean;
  tackleSlots: number;
  canEnchant: boolean;
  obtain: string;
}

export interface SimpleTool {
  id: string;
  type: 'simple';
  name: string;
  description: string;
  image: string;
  cost: number | null;
  obtain: string;
}

export interface Backpack {
  id: string;
  type: 'backpack';
  name: string;
  description: string;
  image: string;
  cost: number;
  slots: number;
}

export type Tool = UpgradeableTool | FishingRod | SimpleTool | Backpack;
export type ToolType = Tool['type'];
