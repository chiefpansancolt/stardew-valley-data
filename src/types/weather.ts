import { Season } from './common';

export interface Weather {
  id: string;
  name: string;
  description: string;
  seasons: Season[];
  image: string;
  watersCrops: boolean;
  special: boolean;
}
