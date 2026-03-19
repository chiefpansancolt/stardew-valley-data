import { ForageableQuery, forageables } from '@/modules/forageables';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new ForageableQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByName() uses default order (asc)', () => {
    const sorted = forageables().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortBySellPrice() uses default order (desc)', () => {
    const sorted = forageables().sortBySellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].sellPrice).toBeGreaterThanOrEqual(sorted[i].sellPrice);
    }
  });

  it('sortBySellPrice asc has lowest first', () => {
    const sorted = forageables().sortBySellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].sellPrice).toBeLessThanOrEqual(sorted[i].sellPrice);
    }
  });
});

testQueryBaseContract('forageables', () => forageables());

describe('ForageableQuery filters', () => {
  it('bySeason() returns only forageables for that season', () => {
    const fall = forageables().bySeason('fall').get();
    expect(fall.length).toBeGreaterThan(0);
    for (const f of fall) {
      expect(f.seasons).toContain('fall');
    }
  });

  it('byArtisanUse() returns forageables with that artisan use enabled', () => {
    const wine = forageables().byArtisanUse('wine').get();
    expect(wine.length).toBeGreaterThan(0);
    for (const f of wine) {
      expect(f.artisanUses.wine).toBe(true);
    }
  });

  it('byArtisanUse() returns correct items for driedMushrooms', () => {
    const dried = forageables().byArtisanUse('driedMushrooms').get();
    expect(dried.length).toBeGreaterThan(0);
    for (const f of dried) {
      expect(f.artisanUses.driedMushrooms).toBe(true);
    }
  });
});

describe('ForageableQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = forageables().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = forageables().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });

  it('sortBySellPrice desc has highest first', () => {
    const sorted = forageables().sortBySellPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].sellPrice).toBeGreaterThanOrEqual(sorted[i].sellPrice);
    }
  });
});

testFilterImmutability(
  'bySeason',
  () => forageables(),
  (q) => (q as ForageableQuery).bySeason('spring'),
);
