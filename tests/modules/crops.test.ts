import { CropQuery, crops } from '@/modules/crops';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new CropQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortBySellPrice() uses default order (desc)', () => {
    const sorted = crops().sortBySellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].cropSellPrice).toBeGreaterThanOrEqual(sorted[i].cropSellPrice);
    }
  });

  it('sortByGrowDays() uses default order (asc)', () => {
    const sorted = crops().sortByGrowDays().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].growDays).toBeLessThanOrEqual(sorted[i].growDays);
    }
  });
});

testQueryBaseContract('crops', () => crops());

describe('CropQuery filters', () => {
  it('bySeason() returns only crops for that season', () => {
    const spring = crops().bySeason('spring').get();
    expect(spring.length).toBeGreaterThan(0);
    for (const crop of spring) {
      expect(crop.seasons).toContain('spring');
    }
  });

  it('giant() returns only giant-capable crops', () => {
    const giants = crops().giant().get();
    expect(giants.length).toBeGreaterThan(0);
    for (const crop of giants) {
      expect(crop.giant).toBe(true);
    }
  });

  it('regrowing() returns only regrowing crops', () => {
    const regrowing = crops().regrowing().get();
    expect(regrowing.length).toBeGreaterThan(0);
    for (const crop of regrowing) {
      expect(crop.regrowDays).not.toBeNull();
    }
  });

  it('trellis() returns only trellis crops', () => {
    const trellis = crops().trellis().get();
    expect(trellis.length).toBeGreaterThan(0);
    for (const crop of trellis) {
      expect(crop.trellis).toBe(true);
    }
  });

  it('chaining narrows results further', () => {
    const all = crops().count();
    const summer = crops().bySeason('summer').count();
    const summerRegrowing = crops().bySeason('summer').regrowing().count();
    expect(summer).toBeLessThan(all);
    expect(summerRegrowing).toBeLessThanOrEqual(summer);
  });

  it('eatable() returns crops with energyHealth', () => {
    const edible = crops().eatable().get();
    expect(edible.length).toBeGreaterThan(0);
    for (const crop of edible) {
      expect(crop.energyHealth).toBeDefined();
    }
  });
});

describe('CropQuery additional filters', () => {
  it('byCategory() returns only crops of that category', () => {
    const veggies = crops().byCategory('vegetable').get();
    expect(veggies.length).toBeGreaterThan(0);
    for (const crop of veggies) {
      expect(crop.category).toBe('vegetable');
    }
  });

  it('byShop() returns crops whose seeds are sold at the given shop (case-insensitive)', () => {
    const pierreSeeds = crops().byShop("Pierre's").get();
    expect(pierreSeeds.length).toBeGreaterThan(0);
    for (const crop of pierreSeeds) {
      const shops = crop.seedBuyPrices.map((p) => p.place.toLowerCase());
      expect(shops).toContain("pierre's");
    }
  });

  it('multiSeason() returns crops available in more than one season', () => {
    const multi = crops().multiSeason().get();
    expect(multi.length).toBeGreaterThan(0);
    for (const crop of multi) {
      expect(crop.seasons.length).toBeGreaterThan(1);
    }
  });

  it('extraHarvest() returns crops with harvestQuantity.max > 1', () => {
    const extra = crops().extraHarvest().get();
    expect(extra.length).toBeGreaterThan(0);
    for (const crop of extra) {
      expect(crop.harvestQuantity.max).toBeGreaterThan(1);
    }
  });

  it('availableInShop() returns crops with at least one seed buy price', () => {
    const available = crops().availableInShop().get();
    expect(available.length).toBeGreaterThan(0);
    for (const crop of available) {
      expect(crop.seedBuyPrices.length).toBeGreaterThan(0);
    }
  });
});

describe('CropQuery sorts', () => {
  it('sortBySellPrice desc has highest first', () => {
    const sorted = crops().sortBySellPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].cropSellPrice).toBeGreaterThanOrEqual(sorted[i].cropSellPrice);
    }
  });

  it('sortBySellPrice asc has lowest first', () => {
    const sorted = crops().sortBySellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].cropSellPrice).toBeLessThanOrEqual(sorted[i].cropSellPrice);
    }
  });

  it('sortByGrowDays asc has fastest first', () => {
    const sorted = crops().sortByGrowDays('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].growDays).toBeLessThanOrEqual(sorted[i].growDays);
    }
  });

  it('sortByGrowDays desc has slowest first', () => {
    const sorted = crops().sortByGrowDays('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].growDays).toBeGreaterThanOrEqual(sorted[i].growDays);
    }
  });
});

testFilterImmutability(
  'bySeason',
  () => crops(),
  (q) => (q as CropQuery).bySeason('spring'),
);
testFilterImmutability(
  'giant',
  () => crops(),
  (q) => (q as CropQuery).giant(),
);

describe('CropQuery factory source param', () => {
  it('wraps a custom array', () => {
    const custom = crops().bySeason('spring').get().slice(0, 2);
    const query = crops(custom);
    expect(query.count()).toBe(2);
    expect(query.get()).toEqual(custom);
  });
});
