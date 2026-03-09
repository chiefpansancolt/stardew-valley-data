export type WillyCategory = 'rod' | 'bait' | 'tackle' | 'equipment' | 'recipe' | 'furniture';

export interface WillyItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: WillyCategory;
  fishingLevelRequired?: number;
  availability?: string;
}
