import { tackle, TackleQuery } from '@/modules/tackle';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('tackle', () => tackle());

describe('TackleQuery sorts', () => {
  it('sortBySellPrice desc has highest first', () => {
    const sorted = tackle().sortBySellPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].sellPrice).toBeGreaterThanOrEqual(sorted[i].sellPrice);
    }
  });

  it('sortByName asc is alphabetical', () => {
    const sorted = tackle().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new TackleQuery().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(tackle().sortByName().count()).toBeGreaterThan(0);
  });

  it('sortBySellPrice default order', () => {
    expect(tackle().sortBySellPrice().count()).toBeGreaterThan(0);
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = tackle().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });

  it('sortBySellPrice asc has lowest first', () => {
    const sorted = tackle().sortBySellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].sellPrice).toBeLessThanOrEqual(sorted[i].sellPrice);
    }
  });
});
