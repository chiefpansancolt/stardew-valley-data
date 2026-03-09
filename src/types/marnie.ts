export type MarnieCategory = 'animal-supply' | 'tool' | 'furniture' | 'catalogue' | 'special';

export interface MarnieItem {
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
  category: MarnieCategory;
  /** Purchase condition if not always available */
  availability?: string;
}
