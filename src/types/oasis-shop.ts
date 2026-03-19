import { DayOfWeek } from './common';

export type OasisCategory = 'seed' | 'food' | 'furniture' | 'clothing' | 'special';

export type OasisDay = DayOfWeek;

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
