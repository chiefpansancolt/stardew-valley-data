import { casino, CasinoQuery } from '@/modules/casino-shop';
import { testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new CasinoQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByPrice() uses default order (asc)', () => {
    const sorted = casino().sortByPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByPrice asc has lowest first', () => {
    const sorted = casino().sortByPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName() uses default order (asc)', () => {
    const sorted = casino().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testQueryBaseContract('casino', () => casino());

describe('CasinoQuery filters', () => {
  it('furniture() returns only furniture items', () => {
    const furniture = casino().furniture().get();
    expect(furniture.length).toBeGreaterThan(0);
    for (const item of furniture) {
      expect(item.category).toBe('furniture');
    }
  });

  it('consumables() returns only consumable items', () => {
    const consumables = casino().consumables().get();
    expect(consumables.length).toBeGreaterThan(0);
    for (const item of consumables) {
      expect(item.category).toBe('consumable');
    }
  });
});

describe('CasinoQuery filters (continued)', () => {
  it('byCategory() filters by category', () => {
    const first = casino().first()!;
    const results = casino()
      .byCategory(first.category as any)
      .get();
    expect(results.length).toBeGreaterThan(0);
    for (const item of results) {
      expect(item.category).toBe(first.category);
    }
  });
});

describe('CasinoQuery sorts', () => {
  it('sortByPrice desc has highest first', () => {
    const sorted = casino().sortByPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeGreaterThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName asc is alphabetical', () => {
    const sorted = casino().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = casino().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});
