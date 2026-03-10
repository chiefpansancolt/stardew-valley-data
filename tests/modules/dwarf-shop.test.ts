import { dwarfShop, DwarfShopQuery } from '@/modules/dwarf-shop';
import { testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new DwarfShopQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByPrice() uses default order (asc)', () => {
    const sorted = dwarfShop().sortByPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByPrice desc has highest first', () => {
    const sorted = dwarfShop().sortByPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeGreaterThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName() uses default order (asc)', () => {
    const sorted = dwarfShop().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testQueryBaseContract('dwarfShop', () => dwarfShop());

describe('DwarfShopQuery filters', () => {
  it('explosives() returns only explosive items', () => {
    const explosives = dwarfShop().explosives().get();
    expect(explosives.length).toBeGreaterThan(0);
    for (const item of explosives) {
      expect(item.category).toBe('explosive');
    }
  });

  it('consumables() returns only consumable items', () => {
    const consumables = dwarfShop().consumables().get();
    expect(consumables.length).toBeGreaterThan(0);
    for (const item of consumables) {
      expect(item.category).toBe('consumable');
    }
  });

  it('recipes() returns only recipe items', () => {
    const recipes = dwarfShop().recipes().get();
    expect(recipes.length).toBeGreaterThan(0);
    for (const item of recipes) {
      expect(item.category).toBe('recipe');
    }
  });
});

describe('DwarfShopQuery filters (continued)', () => {
  it('byCategory() filters by category', () => {
    const first = dwarfShop().first()!;
    const results = dwarfShop()
      .byCategory(first.category as any)
      .get();
    expect(results.length).toBeGreaterThan(0);
    for (const item of results) {
      expect(item.category).toBe(first.category);
    }
  });
});

describe('DwarfShopQuery sorts', () => {
  it('sortByPrice asc has lowest first', () => {
    const sorted = dwarfShop().sortByPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName asc is alphabetical', () => {
    const sorted = dwarfShop().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = dwarfShop().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});
