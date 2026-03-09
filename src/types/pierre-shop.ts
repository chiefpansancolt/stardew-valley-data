import { Season } from './common';

export type PierreCategory =
  | 'seed'
  | 'sapling'
  | 'ingredient'
  | 'fertilizer'
  | 'recipe'
  | 'special';

export interface PierreItem {
  /** Game item ID (from Objects.json, BigCraftables.json, or a slug for non-standard items) */
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
   * Empty array means the item is available year-round.
   * Multiple seasons means the item appears in each of those seasons' stock.
   */
  seasons: Season[];
  /** Item category */
  category: PierreCategory;
  /** Purchase condition, if any (e.g. Year 2+, 8+ hearts with a marriage candidate) */
  availability?: string;
}
