import { GiftPreferences, Season } from './common';

export interface HeartEvent {
  heart: number;
  id: number | number[] | null;
  description: string;
  details: string;
}

export interface Villager extends GiftPreferences {
  id: string;
  name: string;
  birthday: { day: number; season: Exclude<Season, 'ginger island'> };
  address: string;
  occupation: string;
  description: string;
  marriageable: boolean;
  hearts: {
    max: number;
    bouquetIncrease: number;
    spouseIncrease: number;
  };
  events: HeartEvent[];
  image: string;
  spouseImage?: string;
}
