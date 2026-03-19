import { ArtisanUses, EnergyHealth, ItemQuality, Season } from './common';

export interface Forageable {
  id: string;
  name: string;
  description: string;
  seasons: Season[];
  locations: string;
  sellPrice: number;
  energyHealth?: EnergyHealth;
  maxQuality: ItemQuality;
  artisanUses: ArtisanUses;
  image: string;
}
