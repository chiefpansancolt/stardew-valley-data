export type KrobusStockType = 'permanent' | 'daily';

export type KrobusDay = 'Monday' | 'Tuesday' | 'Thursday' | 'Friday' | 'Sunday';

export interface KrobusItem {
  /** Game item ID (from Objects.json, BigCraftables.json, or a slug) */
  id: string;
  /** Display name */
  name: string;
  /** Purchase price in gold */
  price: number;
  /** Item description */
  description: string;
  /** Image path */
  image: string;
  /** Whether the item is always in stock or only available on a specific day */
  stockType: KrobusStockType;
  /** Day of week this item is available (daily items only) */
  day?: KrobusDay;
  /**
   * Maximum quantity available per day/occurrence.
   * -1 means unlimited. Positive values reset each day (permanent) or each time the day arrives (daily).
   */
  stockLimit: number;
  /** Is this item sold as a crafting or building recipe */
  isRecipe: boolean;
  /** Purchase condition, if any (e.g. one-time purchase) */
  availability?: string;
}
