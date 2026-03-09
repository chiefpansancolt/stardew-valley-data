export type MarnieCategory = 'animal-supply' | 'tool' | 'furniture' | 'catalogue' | 'special';

export interface MarnieItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: MarnieCategory;
  availability?: string;
}
