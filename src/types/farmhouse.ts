export interface HouseUpgradeMaterial {
  /** Item name */
  item: string;
  /** Quantity required */
  quantity: number;
}

export interface HouseUpgrade {
  /** Unique identifier in kebab-case */
  id: string;
  /** Display name */
  name: string;
  /** Upgrade tier (1 = starting home, 2–4 = upgrades) */
  tier: number;
  /** Cost in gold (0 for the starting farmhouse) */
  cost: number;
  /** Materials required in addition to gold */
  materials: HouseUpgradeMaterial[];
  /** Description of what this upgrade adds */
  description: string;
  /** Image path relative to package root */
  image: string;
  /** ID of the upgrade that must be completed first, or null for the starting tier */
  prerequisite: string | null;
}

export interface HouseRenovation {
  /** Unique identifier in kebab-case */
  id: string;
  /** Display name */
  name: string;
  /** Cost in gold (0 for free renovations) */
  cost: number;
  /** Description of what this renovation adds */
  description: string;
  /** Image path relative to package root */
  image: string;
  /** ID of the renovation that must be completed first, or null if none */
  prerequisite: string | null;
}
