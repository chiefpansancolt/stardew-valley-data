import { oasis, OasisQuery } from '@/modules/oasis-shop';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('oasis', () => oasis());

describe('OasisQuery filters', () => {
  it('seeds() returns only seed items', () => {
    const seeds = oasis().seeds().get();
    expect(seeds.length).toBeGreaterThan(0);
    for (const item of seeds) {
      expect(item.category).toBe('seed');
    }
  });

  it('permanent() returns items with no day restriction', () => {
    const perma = oasis().permanent().get();
    for (const item of perma) {
      expect(item.day).toBeUndefined();
    }
  });

  it('byDay() includes permanent + that day', () => {
    const monday = oasis().byDay('Monday').get();
    const permanentCount = oasis().permanent().count();
    expect(monday.length).toBeGreaterThanOrEqual(permanentCount);
  });
});

describe('OasisQuery additional filters', () => {
  it('food() returns only food items', () => {
    const food = oasis().food().get();
    expect(food.length).toBeGreaterThan(0);
    for (const item of food) {
      expect(item.category).toBe('food');
    }
  });

  it('clothing() returns only clothing items', () => {
    const clothing = oasis().clothing().get();
    expect(clothing.length).toBeGreaterThan(0);
    for (const item of clothing) {
      expect(item.category).toBe('clothing');
    }
  });

  it('byCategory() filters by arbitrary category', () => {
    const seeds = oasis().byCategory('seed').get();
    expect(seeds.length).toBeGreaterThan(0);
    for (const item of seeds) {
      expect(item.category).toBe('seed');
    }
  });

  it('daily() returns only day-specific items', () => {
    const daily = oasis().daily().get();
    expect(daily.length).toBeGreaterThan(0);
    for (const item of daily) {
      expect(item.day).toBeDefined();
    }
  });

  it('alwaysAvailable() returns items with no availability condition', () => {
    const available = oasis().alwaysAvailable().get();
    for (const item of available) {
      expect(item.availability).toBeUndefined();
    }
  });
});

describe('OasisQuery sorts', () => {
  it('sortByPrice asc has lowest first', () => {
    const sorted = oasis().sortByPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByPrice desc has highest first', () => {
    const sorted = oasis().sortByPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeGreaterThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName asc sorts alphabetically', () => {
    const sorted = oasis().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc sorts reverse alphabetically', () => {
    const sorted = oasis().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new OasisQuery().count()).toBeGreaterThan(0);
  });

  it('sortByPrice default order', () => {
    expect(oasis().sortByPrice().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(oasis().sortByName().count()).toBeGreaterThan(0);
  });
});
