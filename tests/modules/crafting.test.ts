import { crafting, CraftingQuery } from '@/modules/crafting';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new CraftingQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByName() uses default order (asc)', () => {
    const sorted = crafting().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByCategory() uses default order (asc)', () => {
    const sorted = crafting().sortByCategory().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].category.localeCompare(sorted[i].category)).toBeLessThanOrEqual(0);
    }
  });
});

testQueryBaseContract('crafting', () => crafting());

describe('CraftingQuery filters', () => {
  it('byCategory() filters by category', () => {
    const first = crafting().first()!;
    const results = crafting().byCategory(first.category).get();
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) {
      expect(r.category.toLowerCase()).toBe(first.category.toLowerCase());
    }
  });

  it('bySource() filters by partial source match', () => {
    const first = crafting().first()!;
    const keyword = first.source.split(' ')[0];
    const results = crafting().bySource(keyword).get();
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) {
      expect(r.source.toLowerCase()).toContain(keyword.toLowerCase());
    }
  });

  it('findByOutputId() finds a recipe by output id', () => {
    const first = crafting().first()!;
    const found = crafting().findByOutputId(first.output.id);
    expect(found).toBeDefined();
    expect(found!.output.id).toBe(first.output.id);
  });
});

describe('CraftingQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = crafting().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = crafting().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });

  it('sortByCategory asc is alphabetical by category', () => {
    const sorted = crafting().sortByCategory('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].category.localeCompare(sorted[i].category)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByCategory desc is reverse alphabetical by category', () => {
    const sorted = crafting().sortByCategory('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].category.localeCompare(sorted[i].category)).toBeGreaterThanOrEqual(0);
    }
  });
});

testFilterImmutability(
  'byCategory',
  () => crafting(),
  (q) => {
    const cat = crafting().first()!.category;
    return (q as CraftingQuery).byCategory(cat);
  },
);
