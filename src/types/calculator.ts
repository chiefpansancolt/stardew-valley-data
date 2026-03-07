export type Quality = 'silver' | 'gold' | 'iridium';

export interface QualityPrice {
  quality: Quality;
  icon: string;
  value: number;
}

export interface QualityEnergyHealth {
  quality: Quality;
  icon: string;
  energy: number;
  health: number;
}
