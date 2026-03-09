export interface WizardBuildingMaterial {
  itemId: string;
  itemName: string;
  amount: number;
  image: string;
}

export interface WizardBuilding {
  id: string;
  name: string;
  buildCost: number;
  materials: WizardBuildingMaterial[];
  description: string;
  image: string;
  availability?: string;
}
