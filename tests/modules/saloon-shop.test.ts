import { saloon, SaloonQuery } from '@/modules/saloon-shop';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('saloon', () => saloon());

describe('SaloonQuery filters', () => {
  it('food() returns only food items', () => {
    const food = saloon().food().get();
    expect(food.length).toBeGreaterThan(0);
    for (const item of food) {
      expect(item.category).toBe('food');
    }
  });

  it('recipes() returns only recipe items', () => {
    const recipes = saloon().recipes().get();
    expect(recipes.length).toBeGreaterThan(0);
    for (const item of recipes) {
      expect(item.category).toBe('recipe');
    }
  });
});

describe('SaloonQuery additional filters', () => {
  it('byCategory() filters by category', () => {
    const food = saloon().byCategory('food').get();
    expect(food.length).toBeGreaterThan(0);
    for (const item of food) {
      expect(item.category).toBe('food');
    }
  });

  it('alwaysAvailable() returns items with no availability condition', () => {
    const available = saloon().alwaysAvailable().get();
    for (const item of available) {
      expect(item.availability).toBeUndefined();
    }
  });
});

describe('SaloonQuery sorts', () => {
  it('sortByPrice desc has highest first', () => {
    const sorted = saloon().sortByPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeGreaterThanOrEqual(sorted[i].price);
    }
  });

  it('sortByPrice asc has lowest first', () => {
    const sorted = saloon().sortByPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName asc sorts alphabetically', () => {
    const sorted = saloon().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc sorts reverse alphabetically', () => {
    const sorted = saloon().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new SaloonQuery().count()).toBeGreaterThan(0);
  });

  it('sortByPrice default order', () => {
    expect(saloon().sortByPrice().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(saloon().sortByName().count()).toBeGreaterThan(0);
  });
});
