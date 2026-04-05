import { RarecrowQuery, rarecrows } from '@/modules/rarecrows';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('rarecrows', () => rarecrows());

describe('RarecrowQuery sorts', () => {
  it('sortByNumber asc is ascending', () => {
    const sorted = rarecrows().sortByNumber('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].number).toBeLessThanOrEqual(sorted[i].number);
    }
  });

  it('sortByNumber desc is descending', () => {
    const sorted = rarecrows().sortByNumber('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].number).toBeGreaterThanOrEqual(sorted[i].number);
    }
  });
});

describe('rarecrows data integrity', () => {
  it('has exactly 8 rarecrows', () => {
    expect(rarecrows().count()).toBe(8);
  });

  it('numbers run from 1 to 8', () => {
    const numbers = rarecrows()
      .sortByNumber()
      .get()
      .map((r) => r.number);
    expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('each rarecrow has a non-empty obtain string', () => {
    for (const crow of rarecrows().get()) {
      expect(crow.obtain.length).toBeGreaterThan(0);
    }
  });

  it('each rarecrow has an image path', () => {
    for (const crow of rarecrows().get()) {
      expect(crow.image).toMatch(/^images\/scarecrows\//);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new RarecrowQuery().count()).toBeGreaterThan(0);
  });

  it('sortByNumber default order', () => {
    expect(rarecrows().sortByNumber().count()).toBeGreaterThan(0);
  });

  it('accepts custom source array', () => {
    const subset = rarecrows().get().slice(0, 3);
    expect(rarecrows(subset).count()).toBe(3);
  });
});
