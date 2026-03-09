import { Season } from './common';

export type PierreCategory =
  | 'seed'
  | 'sapling'
  | 'ingredient'
  | 'fertilizer'
  | 'recipe'
  | 'special';

export interface PierreItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  seasons: Season[];
  category: PierreCategory;
  availability?: string;
}
