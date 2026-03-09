export type OasisCategory = 'seed' | 'food' | 'furniture' | 'clothing' | 'special';

export type OasisDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface OasisItem {
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
  category: OasisCategory;
  /** Day of week this item is available (undefined = always available) */
  day?: OasisDay;
  /** Purchase condition if not always available */
  availability?: string;
}
