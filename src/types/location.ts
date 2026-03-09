export type LocationCategory =
  | 'The Valley'
  | 'Beyond the Valley'
  | 'Pelican Town'
  | 'Cindersap Forest'
  | 'The Sewers'
  | 'The Beach'
  | 'The Mountain'
  | 'Railroad'
  | 'Quarry'
  | 'The Desert'
  | 'Ginger Island';

export type LocationDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface LocationHours {
  open: string;
  close: string;
}

export type LocationType = 'location' | 'building';

export interface GameLocation {
  id: string;
  name: string;
  type: LocationType;
  category: LocationCategory;
  image: string;
  openHours: LocationHours | null;
  closed: LocationDay[];
  address: string | null;
  occupants: string[];
  shop: string | null;
}
