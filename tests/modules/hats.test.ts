import { HatQuery, hats } from '@/modules/hats';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('hats', () => hats());

describe('HatQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = hats().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = hats().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new HatQuery().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(hats().sortByName().count()).toBeGreaterThan(0);
  });
});
