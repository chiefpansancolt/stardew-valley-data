import { Season } from './common';

export interface JojaItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  seasons: Season[];
  availability?: string;
}
