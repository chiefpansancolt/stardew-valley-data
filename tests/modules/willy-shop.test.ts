import { willy, WillyQuery } from '@/modules/willy-shop';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('willy', () => willy());

describe('WillyQuery filters', () => {
  it('byCategory() filters by category', () => {
    const rods = willy().byCategory('rod').get();
    expect(rods.length).toBeGreaterThan(0);
    for (const item of rods) {
      expect(item.category).toBe('rod');
    }
  });

  it('byFishingLevel() includes items at or below the level', () => {
    const lvl2 = willy().byFishingLevel(2).get();
    for (const item of lvl2) {
      if (item.fishingLevelRequired !== undefined) {
        expect(item.fishingLevelRequired).toBeLessThanOrEqual(2);
      }
    }
  });
});

describe('WillyQuery additional filters', () => {
  it('rods() returns only rod items', () => {
    const rods = willy().rods().get();
    expect(rods.length).toBeGreaterThan(0);
    for (const item of rods) {
      expect(item.category).toBe('rod');
    }
  });

  it('bait() returns only bait items', () => {
    const baitItems = willy().bait().get();
    expect(baitItems.length).toBeGreaterThan(0);
    for (const item of baitItems) {
      expect(item.category).toBe('bait');
    }
  });

  it('tackle() returns only tackle items', () => {
    const tackleItems = willy().tackle().get();
    expect(tackleItems.length).toBeGreaterThan(0);
    for (const item of tackleItems) {
      expect(item.category).toBe('tackle');
    }
  });

  it('alwaysAvailable() returns items with no availability condition', () => {
    const available = willy().alwaysAvailable().get();
    for (const item of available) {
      expect(item.availability).toBeUndefined();
    }
  });
});

describe('WillyQuery sorts', () => {
  it('sortByFishingLevel asc orders by level required', () => {
    const sorted = willy().sortByFishingLevel('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      const a = sorted[i - 1].fishingLevelRequired ?? 0;
      const b = sorted[i].fishingLevelRequired ?? 0;
      expect(a).toBeLessThanOrEqual(b);
    }
  });

  it('sortByFishingLevel desc orders by level descending', () => {
    const sorted = willy().sortByFishingLevel('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      const a = sorted[i - 1].fishingLevelRequired ?? 0;
      const b = sorted[i].fishingLevelRequired ?? 0;
      expect(a).toBeGreaterThanOrEqual(b);
    }
  });

  it('sortByPrice asc has lowest first', () => {
    const sorted = willy().sortByPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByPrice desc has highest first', () => {
    const sorted = willy().sortByPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeGreaterThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName asc sorts alphabetically', () => {
    const sorted = willy().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc sorts reverse alphabetically', () => {
    const sorted = willy().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new WillyQuery().count()).toBeGreaterThan(0);
  });

  it('sortByPrice default order', () => {
    expect(willy().sortByPrice().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(willy().sortByName().count()).toBeGreaterThan(0);
  });

  it('sortByFishingLevel default order', () => {
    expect(willy().sortByFishingLevel().count()).toBeGreaterThan(0);
  });
});
