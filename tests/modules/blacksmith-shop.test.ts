import { blacksmith, BlacksmithQuery } from '@/modules/blacksmith-shop';
import { testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new BlacksmithQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByPrice() uses default params (year=1, order=asc)', () => {
    const sorted = blacksmith().sortByPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].priceYear1).toBeLessThanOrEqual(sorted[i].priceYear1);
    }
  });

  it('sortByName() uses default order (asc)', () => {
    const sorted = blacksmith().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = blacksmith().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

testQueryBaseContract('blacksmith', () => blacksmith());

describe('BlacksmithQuery sorts', () => {
  it('sortByPrice year 1 asc has lowest first', () => {
    const sorted = blacksmith().sortByPrice(1, 'asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].priceYear1).toBeLessThanOrEqual(sorted[i].priceYear1);
    }
  });

  it('sortByPrice year 2 desc has highest first', () => {
    const sorted = blacksmith().sortByPrice(2, 'desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].priceYear2).toBeGreaterThanOrEqual(sorted[i].priceYear2);
    }
  });

  it('sortByName asc is alphabetical', () => {
    const sorted = blacksmith().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});
