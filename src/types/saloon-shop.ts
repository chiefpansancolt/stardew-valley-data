export type SaloonCategory = 'food' | 'recipe';

export interface SaloonItem {
  /** Game item ID (from Objects.json) */
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
  category: SaloonCategory;
  /** Purchase condition, if any */
  availability?: string;
}
