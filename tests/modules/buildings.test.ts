import { BuildingQuery, buildings } from '@/modules/buildings';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new BuildingQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByCost() uses default order (asc)', () => {
    const sorted = buildings().sortByCost().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].buildCost).toBeLessThanOrEqual(sorted[i].buildCost);
    }
  });

  it('sortByName() uses default order (asc)', () => {
    const sorted = buildings().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testQueryBaseContract('buildings', () => buildings());

describe('BuildingQuery filters', () => {
  it('byBuilder() filters by builder', () => {
    const robin = buildings().byBuilder('Robin').get();
    expect(robin.length).toBeGreaterThan(0);
    for (const b of robin) {
      expect(b.builder).toBe('Robin');
    }
  });

  it('magical() returns only magical buildings', () => {
    const magical = buildings().magical().get();
    expect(magical.length).toBeGreaterThan(0);
    for (const b of magical) {
      expect(b.magical).toBe(true);
    }
  });

  it('base() + upgrades() = all buildings', () => {
    const total = buildings().count();
    const baseCount = buildings().base().count();
    const upgradeCount = buildings().upgrades().count();
    expect(baseCount + upgradeCount).toBe(total);
  });
});

describe('BuildingQuery sorts', () => {
  it('sortByCost asc has lowest first', () => {
    const sorted = buildings().sortByCost('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].buildCost).toBeLessThanOrEqual(sorted[i].buildCost);
    }
  });

  it('sortByCost desc has highest first', () => {
    const sorted = buildings().sortByCost('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].buildCost).toBeGreaterThanOrEqual(sorted[i].buildCost);
    }
  });

  it('sortByName asc is alphabetical', () => {
    const sorted = buildings().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = buildings().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

testFilterImmutability(
  'byBuilder',
  () => buildings(),
  (q) => (q as BuildingQuery).byBuilder('Robin'),
);
