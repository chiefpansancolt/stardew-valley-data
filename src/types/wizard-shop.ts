export interface WizardBuildingMaterial {
  /** Game item ID of the required material */
  itemId: string;
  /** Display name of the material */
  itemName: string;
  /** Quantity required */
  amount: number;
  /** Image path for the material item */
  image: string;
}

export interface WizardBuilding {
  /** Unique slug identifier */
  id: string;
  /** Display name */
  name: string;
  /** Gold cost to construct */
  buildCost: number;
  /** Additional material items required alongside the gold cost */
  materials: WizardBuildingMaterial[];
  /** Building description */
  description: string;
  /** Image path */
  image: string;
  /** Purchase condition if not always available */
  availability?: string;
}
