export type BooksellerAvailability =
  | 'always'
  | 'rotating-skill'
  | 'rotating-year3'
  | 'chance'
  | 'golden-walnut';

export interface BooksellerItem {
  /** Unique identifier in kebab-case */
  id: string;
  /** Display name */
  name: string;
  /** When this item is available for purchase */
  availability: BooksellerAvailability;
  /** Price in gold (highest tier for tiered items) */
  price: number;
  /** Tiered prices for skill books [max, mid, min] based on number of times already read */
  priceTiers?: [number, number, number];
  /** Image path relative to package root */
  image: string;
}

export interface BooksellerTrade {
  /** ID of the book being traded in */
  bookId: string;
  /** Display name of the book */
  bookName: string;
  /** Image of the book being traded in */
  bookImage: string;
  /** Name(s) of the item(s) received */
  receiveItems: string[];
  /** Quantity received */
  receiveQuantity: number;
}
