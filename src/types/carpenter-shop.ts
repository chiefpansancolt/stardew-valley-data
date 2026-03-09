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
