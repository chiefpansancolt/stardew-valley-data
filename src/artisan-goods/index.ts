import data from '@/data/artisan-goods.json';
import { ArtisanGood, PriceFormula } from '@/types';

const artisanGoodData: ArtisanGood[] = data as ArtisanGood[];

export class ArtisanGoodQuery {
  constructor(private data: ArtisanGood[] = artisanGoodData) {}

  byEquipment(equipment: string): ArtisanGoodQuery {
    return new ArtisanGoodQuery(
      this.data.filter((a) => a.equipment.toLowerCase() === equipment.toLowerCase()),
    );
  }

  caskAgeable(): ArtisanGoodQuery {
    return new ArtisanGoodQuery(this.data.filter((a) => a.cask !== null));
  }

  withQualityLevels(): ArtisanGoodQuery {
    return new ArtisanGoodQuery(this.data.filter((a) => a.qualityLevels));
  }

  fixedPrice(): ArtisanGoodQuery {
    return new ArtisanGoodQuery(this.data.filter((a) => a.sellPrice !== null));
  }

  formulaPrice(): ArtisanGoodQuery {
    return new ArtisanGoodQuery(this.data.filter((a) => a.sellPrice === null));
  }

  get(): ArtisanGood[] {
    return this.data;
  }

  first(): ArtisanGood | undefined {
    return this.data[0];
  }

  find(id: string): ArtisanGood | undefined {
    return this.data.find((a) => a.id === id);
  }

  findByName(name: string): ArtisanGood | undefined {
    return this.data.find((a) => a.name.toLowerCase() === name.toLowerCase());
  }

  count(): number {
    return this.data.length;
  }
}

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
