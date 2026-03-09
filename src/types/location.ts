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
  /** Opening time in H:MM format (e.g. "9:00") */
  open: string;
  /** Closing time in H:MM format (e.g. "4:00") */
  close: string;
}

export type LocationType = 'location' | 'building';

export interface GameLocation {
  /** Unique identifier in kebab-case */
  id: string;
  /** Display name */
  name: string;
  /** Whether this is a named geographic area or a specific structure */
  type: LocationType;
  /** Geographic area this location belongs to */
  category: LocationCategory;
  /** Image path relative to package root */
  image: string;
  /** Operating hours, or null if always accessible */
  openHours: LocationHours | null;
  /** Days of the week this location is closed */
  closed: LocationDay[];
  /** In-game address or description of location */
  address: string | null;
  /** NPCs who live or work here */
  occupants: string[];
  /** Base name of the corresponding shop data file (e.g. "pierre-shop"), or null */
  shop: string | null;
}
