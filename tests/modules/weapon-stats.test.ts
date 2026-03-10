import { WeaponStatQuery, weaponStats } from '@/modules/weapon-stats';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('weaponStats', () => weaponStats());

describe('WeaponStatQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = weaponStats().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = weaponStats().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new WeaponStatQuery().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(weaponStats().sortByName().count()).toBeGreaterThan(0);
  });
});
