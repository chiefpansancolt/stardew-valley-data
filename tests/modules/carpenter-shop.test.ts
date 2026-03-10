import { carpenter, CarpenterQuery } from '@/modules/carpenter-shop';
import { testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new CarpenterQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByPrice() uses default order (asc)', () => {
    const sorted = carpenter().sortByPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName() uses default order (asc)', () => {
    const sorted = carpenter().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testQueryBaseContract('carpenter', () => carpenter());

describe('CarpenterQuery filters', () => {
  it('byCategory() filters by category', () => {
    const materials = carpenter().byCategory('material').get();
    expect(materials.length).toBeGreaterThan(0);
    for (const item of materials) {
      expect(item.category).toBe('material');
    }
  });

  it('permanent() excludes day-specific items', () => {
    const perma = carpenter().permanent().get();
    for (const item of perma) {
      expect(item.day).toBeUndefined();
    }
  });

  it('byDay() includes permanent + that day', () => {
    const monday = carpenter().byDay('Monday').get();
    const permanentCount = carpenter().permanent().count();
    expect(monday.length).toBeGreaterThanOrEqual(permanentCount);
  });

  it('byDay() includes matching day-specific items and excludes others', () => {
    const base = carpenter().get().slice(0, 2);
    const withDays = [
      { ...base[0], day: 'Monday' as const },
      { ...base[1], day: 'Tuesday' as const },
    ];
    const query = new CarpenterQuery([...base, ...withDays]);
    const mondayResults = query.byDay('Monday').get();
    expect(mondayResults.length).toBe(base.length + 1);
    expect(mondayResults.some((item) => item.day === 'Tuesday')).toBe(false);
  });
});

describe('CarpenterQuery filters (continued)', () => {
  it('recipes() returns only recipe items', () => {
    const recipes = carpenter().recipes().get();
    expect(recipes.length).toBeGreaterThan(0);
    for (const item of recipes) {
      expect(item.isRecipe).toBe(true);
    }
  });

  it('materials() returns only material items', () => {
    const materials = carpenter().materials().get();
    expect(materials.length).toBeGreaterThan(0);
    for (const item of materials) {
      expect(item.category).toBe('material');
    }
  });

  it('alwaysAvailable() returns items with no availability condition', () => {
    const always = carpenter().alwaysAvailable().get();
    for (const item of always) {
      expect(item.availability).toBeUndefined();
    }
  });
});

describe('CarpenterQuery sorts', () => {
  it('sortByPrice asc has lowest first', () => {
    const sorted = carpenter().sortByPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByPrice desc has highest first', () => {
    const sorted = carpenter().sortByPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeGreaterThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName asc is alphabetical', () => {
    const sorted = carpenter().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = carpenter().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});
