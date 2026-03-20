import {
  ArtisanUses,
  EnergyHealth,
  ItemQuality,
  KnowledgeBonus,
  ProfessionBonus,
  Season,
} from './common';

export interface Forageable {
  id: string;
  name: string;
  description: string;
  seasons: Season[];
  locations: string;
  sellPrice: number;
  profession: ProfessionBonus[];
  knowledge: KnowledgeBonus[];
  energyHealth?: EnergyHealth;
  maxQuality: ItemQuality;
  artisanUses: ArtisanUses;
  image: string;
}
