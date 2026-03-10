import { marnie, MarnieQuery } from '@/modules/marnie-shop';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('marnie', () => marnie());

describe('MarnieQuery filters', () => {
  it('byCategory() filters by category', () => {
    const supplies = marnie().byCategory('animal-supply').get();
    expect(supplies.length).toBeGreaterThan(0);
    for (const item of supplies) {
      expect(item.category).toBe('animal-supply');
    }
  });

  it('tools() returns only tool items', () => {
    const tools = marnie().tools().get();
    expect(tools.length).toBeGreaterThan(0);
    for (const item of tools) {
      expect(item.category).toBe('tool');
    }
  });
});

describe('MarnieQuery additional filters', () => {
  it('animalSupplies() returns only animal-supply items', () => {
    const supplies = marnie().animalSupplies().get();
    expect(supplies.length).toBeGreaterThan(0);
    for (const item of supplies) {
      expect(item.category).toBe('animal-supply');
    }
  });

  it('furniture() returns only furniture items', () => {
    const furniture = marnie().furniture().get();
    expect(furniture.length).toBeGreaterThan(0);
    for (const item of furniture) {
      expect(item.category).toBe('furniture');
    }
  });

  it('alwaysAvailable() returns items with no availability condition', () => {
    const available = marnie().alwaysAvailable().get();
    for (const item of available) {
      expect(item.availability).toBeUndefined();
    }
  });
});

describe('MarnieQuery sorts', () => {
  it('sortByPrice asc has lowest first', () => {
    const sorted = marnie().sortByPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByPrice desc has highest first', () => {
    const sorted = marnie().sortByPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeGreaterThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName asc sorts alphabetically', () => {
    const sorted = marnie().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc sorts reverse alphabetically', () => {
    const sorted = marnie().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new MarnieQuery().count()).toBeGreaterThan(0);
  });

  it('sortByPrice default order', () => {
    expect(marnie().sortByPrice().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(marnie().sortByName().count()).toBeGreaterThan(0);
  });
});
