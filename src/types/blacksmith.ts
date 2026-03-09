export interface BlacksmithItem {
  /** Game item ID from Objects.json */
  id: string;
  /** Display name */
  name: string;
  /** Item description */
  description: string;
  /** Purchase price in Year 1 */
  priceYear1: number;
  /** Purchase price in Year 2 and beyond */
  priceYear2: number;
  /** Image path */
  image: string;
}
