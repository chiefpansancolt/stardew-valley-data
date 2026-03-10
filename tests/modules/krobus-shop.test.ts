import { krobus, KrobusQuery } from '@/modules/krobus-shop';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('krobus', () => krobus());

describe('KrobusQuery filters', () => {
  it('permanent() returns only permanent stock', () => {
    const perma = krobus().permanent().get();
    expect(perma.length).toBeGreaterThan(0);
    for (const item of perma) {
      expect(item.stockType).toBe('permanent');
    }
  });

  it('daily() returns only daily rotating items', () => {
    const daily = krobus().daily().get();
    expect(daily.length).toBeGreaterThan(0);
    for (const item of daily) {
      expect(item.stockType).toBe('daily');
    }
  });

  it('byDay() includes permanent + that day', () => {
    const monday = krobus().byDay('Monday').get();
    const permanentCount = krobus().permanent().count();
    expect(monday.length).toBeGreaterThanOrEqual(permanentCount);
  });
});

describe('KrobusQuery additional filters', () => {
  it('recipes() returns only recipe items', () => {
    const recipes = krobus().recipes().get();
    expect(recipes.length).toBeGreaterThan(0);
    for (const item of recipes) {
      expect(item.isRecipe).toBe(true);
    }
  });

  it('alwaysAvailable() returns items with no availability condition', () => {
    const available = krobus().alwaysAvailable().get();
    for (const item of available) {
      expect(item.availability).toBeUndefined();
    }
  });
});

describe('KrobusQuery sorts', () => {
  it('sortByPrice asc has lowest first', () => {
    const sorted = krobus().sortByPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByPrice desc has highest first', () => {
    const sorted = krobus().sortByPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeGreaterThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName asc sorts alphabetically', () => {
    const sorted = krobus().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc sorts reverse alphabetically', () => {
    const sorted = krobus().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new KrobusQuery().count()).toBeGreaterThan(0);
  });

  it('sortByPrice default order', () => {
    expect(krobus().sortByPrice().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(krobus().sortByName().count()).toBeGreaterThan(0);
  });
});
