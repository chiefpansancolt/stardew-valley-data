export type DwarfShopCategory =
  | 'explosive'
  | 'food'
  | 'consumable'
  | 'recipe'
  | 'decoration'
  | 'scarecrow'
  | 'book';

export interface DwarfShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: DwarfShopCategory;
}
