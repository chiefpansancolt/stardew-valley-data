import { Quality, QualityEnergyHealth, QualityPrice } from '@/types';

const QUALITY_ICONS: Record<Quality, string> = {
  silver: 'images/misc/Silver Quality.png',
  gold: 'images/misc/Gold Quality.png',
  iridium: 'images/misc/Iridium Quality.png',
};

const SELL_MULTIPLIERS: Record<Quality, number> = {
  silver: 1.25,
  gold: 1.5,
  iridium: 2,
};

const ENERGY_MULTIPLIERS: Record<Quality, number> = {
  silver: 1.4,
  gold: 1.8,
  iridium: 2.6,
};

const QUALITIES: Quality[] = ['silver', 'gold', 'iridium'];

/**
 * Calculates quality-scaled sell prices and energy/health values.
 * Mirrors the game's item quality formulas for Silver, Gold, and Iridium tiers.
 */
export class QualityCalculator {
  /**
   * Calculate sell prices for Silver, Gold, and Iridium quality.
   * Calculation: Math.floor(basePrice * multiplier)
   * Multipliers: Silver ×1.25, Gold ×1.5, Iridium ×2
   */
  sellPrices(basePrice: number): QualityPrice[] {
    return QUALITIES.map((quality) => ({
      quality,
      icon: QUALITY_ICONS[quality],
      value: Math.floor(basePrice * SELL_MULTIPLIERS[quality]),
    }));
  }

  /**
   * Calculate energy and health for Silver, Gold, and Iridium quality.
   * The same multiplier is applied independently to each base value.
   * Multipliers: Silver ×1.4, Gold ×1.8, Iridium ×2.6
   */
  energyHealth(baseEnergy: number, baseHealth: number): QualityEnergyHealth[] {
    return QUALITIES.map((quality) => ({
      quality,
      icon: QUALITY_ICONS[quality],
      energy: Math.floor(baseEnergy * ENERGY_MULTIPLIERS[quality]),
      health: Math.floor(baseHealth * ENERGY_MULTIPLIERS[quality]),
    }));
  }
}

/** Returns a QualityCalculator instance for computing quality-scaled prices and energy/health values. */
export function qualityCalculator(): QualityCalculator {
  return new QualityCalculator();
}
