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
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: OasisCategory;
  day?: OasisDay;
  availability?: string;
}
