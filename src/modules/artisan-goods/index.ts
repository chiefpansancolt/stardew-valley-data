import { QueryBase } from '@/common/query-base';
import data from '@/data/artisan-goods.json';
import { ArtisanGood, PriceFormula } from '@/types';

const artisanGoodData: ArtisanGood[] = data as ArtisanGood[];

/** Query builder for artisan good data. All filter methods return a new ArtisanGoodQuery for chaining. */
export class ArtisanGoodQuery extends QueryBase<ArtisanGood> {
  constructor(data: ArtisanGood[] = artisanGoodData) {
    super(data);
  }

  /** Filter by the equipment that produces the good (case-insensitive, e.g. `'Keg'`, `'Preserves Jar'`). */
  byEquipment(equipment: string): ArtisanGoodQuery {
    return new ArtisanGoodQuery(
      this.data.filter((a) => a.equipment.toLowerCase() === equipment.toLowerCase()),
    );
  }

  /** Filter to goods that can be aged in a Cask (have `cask` data). */
  caskAgeable(): ArtisanGoodQuery {
    return new ArtisanGoodQuery(this.data.filter((a) => a.cask !== null));
  }

  /** Filter to goods that can achieve Silver/Gold/Iridium quality. */
  withQualityLevels(): ArtisanGoodQuery {
    return new ArtisanGoodQuery(this.data.filter((a) => a.qualityLevels));
  }

  /** Filter to goods with a fixed sell price (not formula-based). */
  fixedPrice(): ArtisanGoodQuery {
    return new ArtisanGoodQuery(this.data.filter((a) => a.sellPrice !== null));
  }

  /** Filter to goods whose sell price is calculated from an ingredient (formula-based). */
  formulaPrice(): ArtisanGoodQuery {
    return new ArtisanGoodQuery(this.data.filter((a) => a.sellPrice === null));
  }
}

/** Returns an ArtisanGoodQuery for all artisan good data. Pass `source` to wrap a pre-filtered array. */
export function artisanGoods(source: ArtisanGood[] = artisanGoodData): ArtisanGoodQuery {
  return new ArtisanGoodQuery(source);
}

/**
 * Calculate the sell price of an artisan good given the ingredient's base sell price.
 * Formula: Math.floor(ingredientBasePrice * multiplier) + addend
 * Returns null if the good has no price formula (fixed-price items).
 */
export function calculateArtisanPrice(
  good: ArtisanGood,
  ingredientBasePrice: number,
): number | null {
  if (!good.priceFormula) return null;
  return applyPriceFormula(good.priceFormula, ingredientBasePrice);
}

/**
 * Apply a PriceFormula directly to an ingredient base price.
 * Useful when you already have a formula object.
 */
export function applyPriceFormula(formula: PriceFormula, ingredientBasePrice: number): number {
  return Math.floor(ingredientBasePrice * formula.multiplier) + formula.addend;
}
