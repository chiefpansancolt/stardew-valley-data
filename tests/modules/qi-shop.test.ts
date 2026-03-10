import { qiStock, QiStockQuery } from '@/modules/qi-shop';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('qiStock', () => qiStock());

describe('QiStockQuery filters', () => {
  it('recipes() returns only recipe items', () => {
    const recipes = qiStock().recipes().get();
    expect(recipes.length).toBeGreaterThan(0);
    for (const item of recipes) {
      expect(item.isRecipe).toBe(true);
    }
  });

  it('items() returns only non-recipe items', () => {
    const items = qiStock().items().get();
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expect(item.isRecipe).toBeFalsy();
    }
  });

  it('byCurrency() filters by currency type', () => {
    const gems = qiStock().byCurrency('qi-gem').get();
    expect(gems.length).toBeGreaterThan(0);
    for (const item of gems) {
      expect(item.currency).toBe('qi-gem');
    }
  });
});

describe('QiStockQuery additional filters', () => {
  it('alwaysAvailable() returns items with no availability condition', () => {
    const available = qiStock().alwaysAvailable().get();
    for (const item of available) {
      expect(item.availability).toBeUndefined();
    }
  });
});

describe('QiStockQuery sorts', () => {
  it('sortByCost asc has lowest first', () => {
    const sorted = qiStock().sortByCost('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].cost).toBeLessThanOrEqual(sorted[i].cost);
    }
  });

  it('sortByCost desc has highest first', () => {
    const sorted = qiStock().sortByCost('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].cost).toBeGreaterThanOrEqual(sorted[i].cost);
    }
  });

  it('sortByName asc sorts alphabetically', () => {
    const sorted = qiStock().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc sorts reverse alphabetically', () => {
    const sorted = qiStock().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new QiStockQuery().count()).toBeGreaterThan(0);
  });

  it('sortByCost default order', () => {
    expect(qiStock().sortByCost().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(qiStock().sortByName().count()).toBeGreaterThan(0);
  });
});
