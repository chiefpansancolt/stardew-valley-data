import { ConcessionQuery, concessions } from '@/modules/concessions';
import { testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new ConcessionQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByPrice() uses default order (asc)', () => {
    const sorted = concessions().sortByPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByPrice desc has highest first', () => {
    const sorted = concessions().sortByPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeGreaterThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName() uses default order (asc)', () => {
    const sorted = concessions().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = concessions().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

testQueryBaseContract('concessions', () => concessions());

describe('ConcessionQuery filters', () => {
  it('byTag() filters items by tag', () => {
    const sweet = concessions().byTag('sweet').get();
    expect(sweet.length).toBeGreaterThan(0);
    for (const item of sweet) {
      expect(item.tags).toContain('sweet');
    }
  });
});

describe('ConcessionQuery sorts', () => {
  it('sortByPrice asc has lowest first', () => {
    const sorted = concessions().sortByPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName asc is alphabetical', () => {
    const sorted = concessions().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});
