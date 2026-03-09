export type QiCurrency = 'qi-gem' | 'golden-walnut';

export interface QiStockItem {
  /** Unique identifier — game item ID or a slug for recipe entries */
  id: string;
  /** Display name of the shop entry */
  name: string;
  /** Cost in the given currency */
  cost: number;
  /** Currency used to purchase this item */
  currency: QiCurrency;
  /** Number of items received per purchase */
  quantity: number;
  /** Item description */
  description: string;
  /** Image path */
  image: string;
  /** True when this entry unlocks a crafting recipe rather than giving the item directly */
  isRecipe: boolean;
  /** Condition for this item to appear in the shop, if not always available */
  availability?: string;
  /** Extra purchase notes (e.g. first-purchase requirements) */
  note?: string;
}
