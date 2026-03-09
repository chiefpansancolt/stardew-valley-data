export type DwarfShopCategory =
  | 'explosive'
  | 'food'
  | 'consumable'
  | 'recipe'
  | 'decoration'
  | 'scarecrow'
  | 'book';

export interface DwarfShopItem {
  /** Game item ID from Objects.json or BigCraftables.json */
  id: string;
  /** Display name */
  name: string;
  /** Item description */
  description: string;
  /** Price in gold */
  price: number;
  /** Image path */
  image: string;
  /** Item category */
  category: DwarfShopCategory;
}
