import { Season } from './common';

export interface JojaItem {
  /** Game item ID (from Objects.json, BigCraftables.json, or a wallpaper index) */
  id: string;
  /** Display name */
  name: string;
  /** Purchase price in gold */
  price: number;
  /** Item description */
  description: string;
  /** Image path */
  image: string;
  /**
   * Seasons when this item is in stock.
   * Empty array means the item is available year-round (permanent stock).
   * Multiple seasons means the item appears in each of those seasons' stock.
   */
  seasons: Season[];
  /** Purchase condition, if any (e.g. requires Joja Warehouse route) */
  availability?: string;
}
