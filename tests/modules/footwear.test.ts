import { FootwearQuery, footwear } from '@/modules/footwear';
import { testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new FootwearQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByName() uses default order (asc)', () => {
    const sorted = footwear().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = footwear().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });

  it('sortByDefense() uses default order (desc)', () => {
    const sorted = footwear().sortByDefense().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].defense).toBeGreaterThanOrEqual(sorted[i].defense);
    }
  });

  it('sortByDefense asc has lowest first', () => {
    const sorted = footwear().sortByDefense('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].defense).toBeLessThanOrEqual(sorted[i].defense);
    }
  });

  it('sortByImmunity() uses default order (desc)', () => {
    const sorted = footwear().sortByImmunity().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].immunity).toBeGreaterThanOrEqual(sorted[i].immunity);
    }
  });

  it('sortByImmunity asc has lowest first', () => {
    const sorted = footwear().sortByImmunity('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].immunity).toBeLessThanOrEqual(sorted[i].immunity);
    }
  });
});

testQueryBaseContract('footwear', () => footwear());

describe('FootwearQuery sorts', () => {
  it('sortByDefense desc has highest first', () => {
    const sorted = footwear().sortByDefense('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].defense).toBeGreaterThanOrEqual(sorted[i].defense);
    }
  });

  it('sortByImmunity desc has highest first', () => {
    const sorted = footwear().sortByImmunity('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].immunity).toBeGreaterThanOrEqual(sorted[i].immunity);
    }
  });

  it('sortByName asc is alphabetical', () => {
    const sorted = footwear().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});
