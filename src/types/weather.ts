import { Season } from './common';

export interface Weather {
  id: string;
  name: string;
  description: string;
  seasons: Season[];
  image: string;
  /** Whether this weather type automatically waters crops */
  watersCrops: boolean;
  /** Whether this is a special/event weather (festival, wedding, green rain) */
  special: boolean;
}
