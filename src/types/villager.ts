import { Season } from './common';

export interface Villager {
  id: string;
  name: string;
  birthday: { day: number; season: Exclude<Season, 'ginger island'> };
  address: string;
  occupation: string;
  marriageable: boolean;
  image: string;
  spouseImage?: string;
  loves: string[];
  likes: string[];
  neutrals: string[];
  dislikes: string[];
  hates: string[];
}
