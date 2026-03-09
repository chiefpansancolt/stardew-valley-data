export type SaloonCategory = 'food' | 'recipe';

export interface SaloonItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: SaloonCategory;
  availability?: string;
}
