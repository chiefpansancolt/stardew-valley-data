import { TreeQuery, trees } from '@/modules/trees';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('trees', () => trees());

describe('TreeQuery filters', () => {
  it('fruitTrees() returns only fruit trees', () => {
    const fruit = trees().fruitTrees().get();
    expect(fruit.length).toBeGreaterThan(0);
    for (const t of fruit) {
      expect(t.type).toBe('fruit-tree');
    }
  });

  it('wildTrees() returns only wild trees', () => {
    const wild = trees().wildTrees().get();
    expect(wild.length).toBeGreaterThan(0);
    for (const t of wild) {
      expect(t.type).toBe('wild-tree');
    }
  });

  it('fruitTrees + wildTrees = all trees', () => {
    const total = trees().count();
    const fruit = trees().fruitTrees().count();
    const wild = trees().wildTrees().count();
    expect(fruit + wild).toBe(total);
  });

  it('tappable() returns wild trees with tapper data', () => {
    const tappable = trees().tappable().get();
    expect(tappable.length).toBeGreaterThan(0);
    for (const t of tappable) {
      expect(t.type).toBe('wild-tree');
      if (t.type === 'wild-tree') {
        expect(t.tapper).toBeDefined();
      }
    }
  });

  it('bySeason() filters fruit trees by season', () => {
    const spring = trees().bySeason('spring').get();
    expect(spring.length).toBeGreaterThan(0);
    for (const t of spring) {
      expect(t.type).toBe('fruit-tree');
      if (t.type === 'fruit-tree') {
        expect(t.seasons).toContain('spring');
      }
    }
  });

  it('byArtisanUse() returns only fruit trees whose produce supports that use', () => {
    const wine = trees().byArtisanUse('wine').get();
    expect(wine.length).toBeGreaterThan(0);
    for (const t of wine) {
      expect(t.type).toBe('fruit-tree');
      if (t.type === 'fruit-tree') {
        expect(t.produce.artisanUses.wine).toBe(true);
      }
    }
  });

  it('byArtisanUse() excludes wild trees', () => {
    const wine = trees().byArtisanUse('wine').get();
    for (const t of wine) {
      expect(t.type).not.toBe('wild-tree');
    }
  });

  it('byArtisanUse() returns empty for honey (no fruit trees support it)', () => {
    const honey = trees().byArtisanUse('honey').get();
    expect(honey.length).toBe(0);
  });
});

describe('TreeQuery sorts', () => {
  it('sortByProduceSellPrice desc has highest first', () => {
    const sorted = trees().sortByProduceSellPrice('desc').get();
    const prices = sorted.map((t) => {
      if (t.type === 'fruit-tree') return t.produce.sellPrice;
      return t.tapper?.sellPrice ?? 0;
    });
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i - 1]).toBeGreaterThanOrEqual(prices[i]);
    }
  });
});

testFilterImmutability(
  'fruitTrees',
  () => trees(),
  (q) => (q as TreeQuery).fruitTrees(),
);
testFilterImmutability(
  'wildTrees',
  () => trees(),
  (q) => (q as TreeQuery).wildTrees(),
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new TreeQuery().count()).toBeGreaterThan(0);
  });

  it('sortByProduceSellPrice default order', () => {
    expect(trees().sortByProduceSellPrice().count()).toBeGreaterThan(0);
  });

  it('sortByProduceSellPrice asc has lowest first', () => {
    const sorted = trees().sortByProduceSellPrice('asc').get();
    const prices = sorted.map((t) => {
      if (t.type === 'fruit-tree') return t.produce.sellPrice;
      return t.tapper?.sellPrice ?? 0;
    });
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i - 1]).toBeLessThanOrEqual(prices[i]);
    }
  });

  it('sortByProduceSellPrice handles wild tree without tapper', () => {
    const wildTree = trees().wildTrees().first()!;
    const noTapper1 = { ...wildTree, name: 'No Tapper 1', tapper: undefined } as any;
    const noTapper2 = { ...wildTree, name: 'No Tapper 2', tapper: undefined } as any;
    const fruitTree = trees().fruitTrees().first()!;
    const mixed = new TreeQuery([noTapper1, fruitTree, noTapper2]);
    const sorted = mixed.sortByProduceSellPrice('asc').get();
    expect(sorted.length).toBe(3);
  });
});
