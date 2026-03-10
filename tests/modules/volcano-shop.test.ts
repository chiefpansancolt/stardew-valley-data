import { volcanoShop, VolcanoShopQuery } from '@/modules/volcano-shop';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('volcanoShop', () => volcanoShop());

describe('VolcanoShopQuery filters', () => {
  it('goldItems() returns only gold-currency items', () => {
    const gold = volcanoShop().goldItems().get();
    expect(gold.length).toBeGreaterThan(0);
    for (const item of gold) {
      expect(item.currency).toBe('gold');
    }
  });

  it('cinderShardItems() returns only cinder-shard items', () => {
    const cinder = volcanoShop().cinderShardItems().get();
    expect(cinder.length).toBeGreaterThan(0);
    for (const item of cinder) {
      expect(item.currency).toBe('cinder-shard');
    }
  });

  it('byCurrency() matches currency filter shorthand', () => {
    const diamond = volcanoShop().byCurrency('diamond').get();
    expect(diamond).toEqual(volcanoShop().diamondItems().get());
  });
});

describe('VolcanoShopQuery additional filters', () => {
  it('byCategory() filters by category', () => {
    const consumables = volcanoShop().byCategory('consumable').get();
    for (const item of consumables) {
      expect(item.category).toBe('consumable');
    }
  });

  it('consumables() returns only consumable items', () => {
    const consumables = volcanoShop().consumables().get();
    for (const item of consumables) {
      expect(item.category).toBe('consumable');
    }
  });

  it('food() returns only food items', () => {
    const food = volcanoShop().food().get();
    for (const item of food) {
      expect(item.category).toBe('food');
    }
  });

  it('alwaysAvailable() returns items with no availability condition', () => {
    const available = volcanoShop().alwaysAvailable().get();
    for (const item of available) {
      expect(item.availability).toBeUndefined();
    }
  });

  it('diamondItems() returns only diamond-currency items', () => {
    const diamond = volcanoShop().diamondItems().get();
    for (const item of diamond) {
      expect(item.currency).toBe('diamond');
    }
  });
});

describe('VolcanoShopQuery sorts', () => {
  it('sortByPrice asc has lowest first', () => {
    const sorted = volcanoShop().sortByPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByPrice desc has highest first', () => {
    const sorted = volcanoShop().sortByPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeGreaterThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName asc sorts alphabetically', () => {
    const sorted = volcanoShop().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc sorts reverse alphabetically', () => {
    const sorted = volcanoShop().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new VolcanoShopQuery().count()).toBeGreaterThan(0);
  });

  it('sortByPrice default order', () => {
    expect(volcanoShop().sortByPrice().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(volcanoShop().sortByName().count()).toBeGreaterThan(0);
  });
});
