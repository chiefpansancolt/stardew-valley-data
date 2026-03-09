export type WillyCategory = 'rod' | 'bait' | 'tackle' | 'equipment' | 'recipe' | 'furniture';

export interface WillyItem {
  /** Game item ID */
  id: string;
  /** Display name */
  name: string;
  /** Purchase price in gold */
  price: number;
  /** Item description */
  description: string;
  /** Image path */
  image: string;
  /** Item category */
  category: WillyCategory;
  /** Minimum fishing level required to purchase, if any */
  fishingLevelRequired?: number;
  /** Purchase condition if not always available */
  availability?: string;
}
