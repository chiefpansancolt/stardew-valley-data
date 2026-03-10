import { RingQuery, rings } from '@/modules/rings';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('rings', () => rings());

describe('RingQuery filters', () => {
  it('craftable() returns rings with ingredients', () => {
    const result = rings().craftable().get();
    expect(result.length).toBeGreaterThan(0);
    for (const r of result) {
      expect(r.ingredients.length).toBeGreaterThan(0);
    }
  });

  it('purchasable() returns rings with a purchase price', () => {
    const result = rings().purchasable().get();
    expect(result.length).toBeGreaterThan(0);
    for (const r of result) {
      expect(r.purchasePrice).not.toBeNull();
    }
  });
});

describe('RingQuery sorts', () => {
  it('sortBySellPrice desc has highest first', () => {
    const sorted = rings().sortBySellPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].sellPrice).toBeGreaterThanOrEqual(sorted[i].sellPrice);
    }
  });
});

testFilterImmutability(
  'craftable',
  () => rings(),
  (q) => (q as RingQuery).craftable(),
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new RingQuery().count()).toBeGreaterThan(0);
  });

  it('sortBySellPrice default order', () => {
    expect(rings().sortBySellPrice().count()).toBeGreaterThan(0);
  });

  it('sortBySellPrice asc has lowest first', () => {
    const sorted = rings().sortBySellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].sellPrice).toBeLessThanOrEqual(sorted[i].sellPrice);
    }
  });
});
