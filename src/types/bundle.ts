export type BundleRoom =
  | 'crafts-room'
  | 'pantry'
  | 'fish-tank'
  | 'boiler-room'
  | 'bulletin-board'
  | 'vault'
  | 'abandoned-joja-mart';

export interface BundleItem {
  name: string;
  quantity: number;
  quality?: 'silver' | 'gold' | 'iridium';
}

export interface BundleReward {
  name: string;
  quantity: number;
}

export interface ItemBundle {
  id: string;
  type: 'items';
  name: string;
  room: BundleRoom;
  bundleGroup: number;
  image: string;
  items: BundleItem[];
  itemsRequired: number;
  itemsChosenRandom: boolean;
  numItemsAvailable: number;
  reward: BundleReward;
  remixBundle: boolean;
}

export interface GoldBundle {
  id: string;
  type: 'gold';
  name: string;
  room: BundleRoom;
  bundleGroup: number;
  image: string;
  goldCost: number;
  reward: BundleReward;
  remixBundle: boolean;
}

export interface JojaBundle {
  id: string;
  type: 'joja mart';
  name: string;
  description: string;
  goldCost: number;
  unlock: string;
}

export type Bundle = ItemBundle | GoldBundle | JojaBundle;
