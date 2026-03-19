import { DayOfWeek } from './common';

export type CarpenterCategory = 'material' | 'recipe' | 'furniture' | 'craftable';

export type CarpenterDay = DayOfWeek;

export interface CarpenterItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: CarpenterCategory;
  day?: CarpenterDay;
  isRecipe: boolean;
  availability?: string;
}
