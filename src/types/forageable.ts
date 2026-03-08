import { Season } from './common';

export interface Forageable {
  id: string;
  name: string;
  description: string;
  seasons: Season[];
  locations: string;
  sellPrice: number;
  image: string;
}
