export type BooksellerAvailability =
  | 'always'
  | 'rotating-skill'
  | 'rotating-year3'
  | 'chance'
  | 'golden-walnut';

export interface BooksellerItem {
  id: string;
  name: string;
  availability: BooksellerAvailability;
  price: number;
  priceTiers?: [number, number, number];
  image: string;
}

export interface BooksellerTrade {
  bookId: string;
  bookName: string;
  bookImage: string;
  receiveItems: string[];
  receiveQuantity: number;
}
