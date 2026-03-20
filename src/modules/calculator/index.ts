import {
  ArtisanEnergyResult,
  ArtisanResult,
  Quality,
  QualityEnergyHealth,
  QualityPrice,
} from '@/types';

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

/**
 * Calculates sell prices and energy/health values for artisan goods.
 * Each method accepts pre-computed base values for the source ingredient.
 */
export class ArtisanCalculator {
  /** Roe sell price: `30 + Math.floor(baseFishPrice / 2)` */
  roe(baseFishPrice: number): ArtisanResult {
    return { sellPrice: 30 + Math.floor(baseFishPrice / 2) };
  }

  /** Aged Roe sell price: `60 + baseFishPrice` */
  agedRoe(baseFishPrice: number): ArtisanResult {
    return { sellPrice: 60 + baseFishPrice };
  }

  /**
   * Honey sell price: `100 + (baseFlowerPrice * 2)`.
   * Pass `0` for wild honey (no nearby flower).
   */
  honey(baseFlowerPrice: number): ArtisanResult {
    return { sellPrice: 100 + baseFlowerPrice * 2 };
  }

  /** Wine sell price (`Math.floor(baseFruitPrice * 3)`) and energy/health (`×1.75`). */
  wine(baseFruitPrice: number, baseEnergy: number, baseHealth: number): ArtisanEnergyResult {
    return {
      sellPrice: Math.floor(baseFruitPrice * 3),
      energy: Math.floor(baseEnergy * 1.75),
      health: Math.floor(baseHealth * 1.75),
    };
  }

  /** Juice sell price (`Math.floor(basePrice * 2.25)`) and energy/health (`×2`). */
  juice(basePrice: number, baseEnergy: number, baseHealth: number): ArtisanEnergyResult {
    return {
      sellPrice: Math.floor(basePrice * 2.25),
      energy: Math.floor(baseEnergy * 2),
      health: Math.floor(baseHealth * 2),
    };
  }

  /** Pickles sell price (`Math.floor(basePrice * 2) + 50`) and energy/health (`×1.75`). */
  pickles(basePrice: number, baseEnergy: number, baseHealth: number): ArtisanEnergyResult {
    return {
      sellPrice: Math.floor(basePrice * 2) + 50,
      energy: Math.floor(baseEnergy * 1.75),
      health: Math.floor(baseHealth * 1.75),
    };
  }

  /** Jelly sell price (`Math.floor(baseFruitPrice * 2) + 50`) and energy/health (`×2`). */
  jelly(baseFruitPrice: number, baseEnergy: number, baseHealth: number): ArtisanEnergyResult {
    return {
      sellPrice: Math.floor(baseFruitPrice * 2) + 50,
      energy: Math.floor(baseEnergy * 2),
      health: Math.floor(baseHealth * 2),
    };
  }

  /** Dried Mushrooms sell price (`Math.floor(baseMushroomPrice * 7.5) + 25`) and energy/health (`×3`). */
  driedMushrooms(
    baseMushroomPrice: number,
    baseEnergy: number,
    baseHealth: number,
  ): ArtisanEnergyResult {
    return {
      sellPrice: Math.floor(baseMushroomPrice * 7.5) + 25,
      energy: Math.floor(baseEnergy * 3),
      health: Math.floor(baseHealth * 3),
    };
  }

  /** Dried Fruit sell price (`Math.floor(baseFruitPrice * 7.5)`) and energy/health (`×3`). */
  driedFruit(baseFruitPrice: number, baseEnergy: number, baseHealth: number): ArtisanEnergyResult {
    return {
      sellPrice: Math.floor(baseFruitPrice * 7.5),
      energy: Math.floor(baseEnergy * 3),
      health: Math.floor(baseHealth * 3),
    };
  }

  /** Smoked Fish sell price (`Math.floor(baseFishPrice * 2)`) and energy/health (`×1.5`). */
  smokedFish(baseFishPrice: number, baseEnergy: number, baseHealth: number): ArtisanEnergyResult {
    return {
      sellPrice: Math.floor(baseFishPrice * 2),
      energy: Math.floor(baseEnergy * 1.5),
      health: Math.floor(baseHealth * 1.5),
    };
  }
}

/** Returns an ArtisanCalculator instance for computing artisan good sell prices and energy/health values. */
export function artisanCalculator(): ArtisanCalculator {
  return new ArtisanCalculator();
}

/**
 * Calculates sell prices with profession bonuses applied.
 * Each method takes a base sell price and returns the adjusted value.
 */
export class ProfessionCalculator {
  /** Artisan profession bonus: `Math.floor(price * 1.4)` */
  artisan(price: number): number {
    return Math.floor(price * 1.4);
  }

  /** Rancher profession bonus: `Math.floor(price * 1.2)` */
  rancher(price: number): number {
    return Math.floor(price * 1.2);
  }

  /** Tiller profession bonus: `Math.floor(price * 1.1)` */
  tiller(price: number): number {
    return Math.floor(price * 1.1);
  }

  /** Blacksmith profession bonus: `Math.floor(price * 1.5)` */
  blacksmith(price: number): number {
    return Math.floor(price * 1.5);
  }

  /** Gemologist profession bonus: `Math.floor(price * 1.3)` */
  gemologist(price: number): number {
    return Math.floor(price * 1.3);
  }

  /** Tapper profession bonus: `Math.floor(price * 1.25)` */
  tapper(price: number): number {
    return Math.floor(price * 1.25);
  }

  /** Fisher profession bonus: `Math.floor(price * 1.25)` */
  fisher(price: number): number {
    return Math.floor(price * 1.25);
  }

  /** Angler profession bonus: `Math.floor(price * 1.5)` */
  angler(price: number): number {
    return Math.floor(price * 1.5);
  }
}

/** Returns a ProfessionCalculator instance for computing profession-adjusted sell prices. */
export function professionCalculator(): ProfessionCalculator {
  return new ProfessionCalculator();
}
