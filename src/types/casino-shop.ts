export type CasinoCategory = 'furniture' | 'hat' | 'scarecrow' | 'consumable' | 'decoration';

export interface CasinoItem {
  /** Game item ID */
  id: string;
  /** Display name */
  name: string;
  /** Price in Qi Coins */
  price: number;
  /** Item description */
  description: string;
  /** Image path */
  image: string;
  /** Item category */
  category: CasinoCategory;
}
