import { cooking, CookingQuery } from '@/modules/cooking';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new CookingQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByName() uses default order (asc)', () => {
    const sorted = cooking().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortBySellPrice() uses default order (desc)', () => {
    const sorted = cooking().sortBySellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].sellPrice).toBeGreaterThanOrEqual(sorted[i].sellPrice);
    }
  });

  it('sortBySellPrice asc has lowest first', () => {
    const sorted = cooking().sortBySellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].sellPrice).toBeLessThanOrEqual(sorted[i].sellPrice);
    }
  });

  it('sortByEnergy() uses default order (desc)', () => {
    const sorted = cooking().sortByEnergy().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].energyHealth.energy ?? 0).toBeGreaterThanOrEqual(
        sorted[i].energyHealth.energy ?? 0,
      );
    }
  });

  it('sortByEnergy asc has least energising first', () => {
    const sorted = cooking().sortByEnergy('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].energyHealth.energy ?? 0).toBeLessThanOrEqual(
        sorted[i].energyHealth.energy ?? 0,
      );
    }
  });

  it('sortByEnergy handles dishes with undefined energy via custom source', () => {
    const base = cooking().get().slice(0, 3);
    const withUndef = [
      { ...base[0], energyHealth: { energy: undefined, health: undefined } },
      { ...base[1], energyHealth: { energy: 50, health: 22 } },
      { ...base[2], energyHealth: { energy: undefined, health: undefined } },
    ];
    const sorted = new CookingQuery(withUndef as any).sortByEnergy('asc').get();
    expect(sorted.length).toBe(3);
    expect(sorted[0].energyHealth.energy ?? 0).toBeLessThanOrEqual(
      sorted[2].energyHealth.energy ?? 0,
    );
  });
});

testQueryBaseContract('cooking', () => cooking());

describe('CookingQuery filters', () => {
  it('withIngredient() returns dishes containing that ingredient', () => {
    const all = cooking().get();
    const firstIngredientId = all[0].ingredients[0]?.id;
    if (firstIngredientId) {
      const filtered = cooking().withIngredient(firstIngredientId).get();
      expect(filtered.length).toBeGreaterThan(0);
      for (const d of filtered) {
        expect(d.ingredients.some((i) => i.id === firstIngredientId)).toBe(true);
      }
    }
  });
});

describe('CookingQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = cooking().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = cooking().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });

  it('sortBySellPrice desc has highest first', () => {
    const sorted = cooking().sortBySellPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].sellPrice).toBeGreaterThanOrEqual(sorted[i].sellPrice);
    }
  });

  it('sortByEnergy desc has most energising first', () => {
    const sorted = cooking().sortByEnergy('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].energyHealth.energy ?? 0).toBeGreaterThanOrEqual(
        sorted[i].energyHealth.energy ?? 0,
      );
    }
  });
});

testFilterImmutability(
  'withIngredient',
  () => cooking(),
  (q) => {
    const firstId = q.get()[0]?.ingredients[0]?.id ?? '';
    return (q as CookingQuery).withIngredient(firstId);
  },
);
