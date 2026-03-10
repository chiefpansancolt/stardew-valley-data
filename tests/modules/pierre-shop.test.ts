import { pierre, PierreQuery } from '@/modules/pierre-shop';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('pierre', () => pierre());

describe('PierreQuery filters', () => {
  it('bySeason() filters by season', () => {
    const spring = pierre().bySeason('spring').get();
    expect(spring.length).toBeGreaterThan(0);
    expect(spring.length).toBeLessThanOrEqual(pierre().count());
  });

  it('byCategory() filters by category', () => {
    const seeds = pierre().byCategory('seed').get();
    expect(seeds.length).toBeGreaterThan(0);
    for (const item of seeds) {
      expect(item.category).toBe('seed');
    }
  });

  it('permanent() returns items with no seasons', () => {
    const perma = pierre().permanent().get();
    expect(perma.length).toBeGreaterThan(0);
    for (const item of perma) {
      expect(item.seasons).toHaveLength(0);
    }
  });
});

describe('PierreQuery additional filters', () => {
  it('seeds() returns only seed items', () => {
    const seeds = pierre().seeds().get();
    expect(seeds.length).toBeGreaterThan(0);
    for (const item of seeds) {
      expect(item.category).toBe('seed');
    }
  });

  it('saplings() returns only sapling items', () => {
    const saplings = pierre().saplings().get();
    expect(saplings.length).toBeGreaterThan(0);
    for (const item of saplings) {
      expect(item.category).toBe('sapling');
    }
  });

  it('ingredients() returns only ingredient items', () => {
    const ingredients = pierre().ingredients().get();
    expect(ingredients.length).toBeGreaterThan(0);
    for (const item of ingredients) {
      expect(item.category).toBe('ingredient');
    }
  });

  it('fertilizers() returns only fertilizer items', () => {
    const fertilizers = pierre().fertilizers().get();
    expect(fertilizers.length).toBeGreaterThan(0);
    for (const item of fertilizers) {
      expect(item.category).toBe('fertilizer');
    }
  });

  it('recipes() returns only recipe items', () => {
    const recipes = pierre().recipes().get();
    expect(recipes.length).toBeGreaterThan(0);
    for (const item of recipes) {
      expect(item.category).toBe('recipe');
    }
  });

  it('alwaysAvailable() returns items with no availability condition', () => {
    const available = pierre().alwaysAvailable().get();
    for (const item of available) {
      expect(item.availability).toBeUndefined();
    }
  });
});

describe('PierreQuery sorts', () => {
  it('sortByPrice asc has lowest first', () => {
    const sorted = pierre().sortByPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByPrice desc has highest first', () => {
    const sorted = pierre().sortByPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeGreaterThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName asc sorts alphabetically', () => {
    const sorted = pierre().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc sorts reverse alphabetically', () => {
    const sorted = pierre().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new PierreQuery().count()).toBeGreaterThan(0);
  });

  it('sortByPrice default order', () => {
    expect(pierre().sortByPrice().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(pierre().sortByName().count()).toBeGreaterThan(0);
  });
});
