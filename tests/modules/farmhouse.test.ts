import {
  HouseRenovationQuery,
  houseRenovations,
  HouseUpgradeQuery,
  houseUpgrades,
} from '@/modules/farmhouse';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('HouseUpgradeQuery constructor uses default data when called without args', () => {
    const query = new HouseUpgradeQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('HouseRenovationQuery constructor uses default data when called without args', () => {
    const query = new HouseRenovationQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByTier() uses default order (asc)', () => {
    const sorted = houseUpgrades().sortByTier().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].tier).toBeLessThanOrEqual(sorted[i].tier);
    }
  });

  it('sortByTier desc has highest first', () => {
    const sorted = houseUpgrades().sortByTier('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].tier).toBeGreaterThanOrEqual(sorted[i].tier);
    }
  });

  it('sortByPrice() uses default order (asc)', () => {
    const sorted = houseRenovations().sortByPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].cost).toBeLessThanOrEqual(sorted[i].cost);
    }
  });

  it('sortByName() uses default order (asc)', () => {
    const sorted = houseRenovations().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testQueryBaseContract('houseUpgrades', () => houseUpgrades());
testQueryBaseContract('houseRenovations', () => houseRenovations());

describe('HouseUpgradeQuery', () => {
  it('byTier() filters to a specific tier', () => {
    const results = houseUpgrades().byTier(1).get();
    expect(results.length).toBeGreaterThan(0);
    for (const u of results) {
      expect(u.tier).toBe(1);
    }
  });

  it('sortByTier asc has lowest first', () => {
    const sorted = houseUpgrades().sortByTier('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].tier).toBeLessThanOrEqual(sorted[i].tier);
    }
  });
});

describe('HouseRenovationQuery', () => {
  it('free() returns only zero-cost renovations', () => {
    const results = houseRenovations().free().get();
    for (const r of results) {
      expect(r.cost).toBe(0);
    }
  });

  it('withPrerequisite() returns only renovations with a prerequisite', () => {
    const results = houseRenovations().withPrerequisite().get();
    for (const r of results) {
      expect(r.prerequisite).not.toBeNull();
    }
  });

  it('sortByPrice asc has lowest first', () => {
    const sorted = houseRenovations().sortByPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].cost).toBeLessThanOrEqual(sorted[i].cost);
    }
  });

  it('sortByPrice desc has highest first', () => {
    const sorted = houseRenovations().sortByPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].cost).toBeGreaterThanOrEqual(sorted[i].cost);
    }
  });

  it('sortByName asc is alphabetical', () => {
    const sorted = houseRenovations().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = houseRenovations().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

testFilterImmutability(
  'byTier',
  () => houseUpgrades(),
  (q) => (q as HouseUpgradeQuery).byTier(1),
);
