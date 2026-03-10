import {
  applyPriceFormula,
  ArtisanGoodQuery,
  artisanGoods,
  calculateArtisanPrice,
} from '@/modules/artisan-goods';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('artisanGoods', () => artisanGoods());

describe('ArtisanGoodQuery filters', () => {
  it('byEquipment() filters by equipment name', () => {
    const keg = artisanGoods().byEquipment('Keg').get();
    expect(keg.length).toBeGreaterThan(0);
    for (const g of keg) {
      expect(g.equipment.toLowerCase()).toBe('keg');
    }
  });

  it('fixedPrice() returns only goods with numeric sellPrice', () => {
    const fixed = artisanGoods().fixedPrice().get();
    expect(fixed.length).toBeGreaterThan(0);
    for (const g of fixed) {
      expect(g.sellPrice).not.toBeNull();
    }
  });

  it('formulaPrice() returns only goods without fixed sellPrice', () => {
    const formula = artisanGoods().formulaPrice().get();
    expect(formula.length).toBeGreaterThan(0);
    for (const g of formula) {
      expect(g.sellPrice).toBeNull();
    }
  });

  it('fixedPrice + formulaPrice = all goods', () => {
    const total = artisanGoods().count();
    const fixed = artisanGoods().fixedPrice().count();
    const formula = artisanGoods().formulaPrice().count();
    expect(fixed + formula).toBe(total);
  });

  it('caskAgeable() returns only goods with cask data', () => {
    const caskable = artisanGoods().caskAgeable().get();
    expect(caskable.length).toBeGreaterThan(0);
    for (const g of caskable) {
      expect(g.cask).not.toBeNull();
    }
  });

  it('withQualityLevels() returns only goods with quality levels', () => {
    const quality = artisanGoods().withQualityLevels().get();
    expect(quality.length).toBeGreaterThan(0);
    for (const g of quality) {
      expect(g.qualityLevels).toBe(true);
    }
  });
});

describe('applyPriceFormula()', () => {
  it('applies multiplier and addend', () => {
    expect(applyPriceFormula({ multiplier: 2, addend: 50 }, 100)).toBe(250);
  });

  it('floors the result', () => {
    expect(applyPriceFormula({ multiplier: 1.5, addend: 0 }, 33)).toBe(49);
  });
});

describe('calculateArtisanPrice()', () => {
  it('returns null for goods without a price formula', () => {
    const noFormula = artisanGoods()
      .get()
      .find((g) => !g.priceFormula);
    if (noFormula) {
      expect(calculateArtisanPrice(noFormula, 100)).toBeNull();
    }
  });

  it('returns a number for formula-price goods', () => {
    const formula = artisanGoods().formulaPrice().first()!;
    const price = calculateArtisanPrice(formula, 100);
    expect(typeof price).toBe('number');
    expect(price).toBeGreaterThan(0);
  });
});

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new ArtisanGoodQuery();
    expect(query.count()).toBeGreaterThan(0);
  });
});

testFilterImmutability(
  'byEquipment',
  () => artisanGoods(),
  (q) => (q as ArtisanGoodQuery).byEquipment('Keg'),
);
