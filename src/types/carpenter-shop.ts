export type CarpenterCategory = 'material' | 'recipe' | 'furniture' | 'craftable';

export type CarpenterDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface CarpenterItem {
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
  category: CarpenterCategory;
  /** Day of week this item is available (rotating furniture only) */
  day?: CarpenterDay;
  /** Whether this item is sold as a crafting recipe */
  isRecipe: boolean;
  /** Purchase condition if not always available */
  availability?: string;
}
