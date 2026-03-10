import { SpecialOrderQuery, specialOrders } from '@/modules/special-orders';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('specialOrders', () => specialOrders());

describe('SpecialOrderQuery filters', () => {
  it('byType() filters by order type', () => {
    const town = specialOrders().byType('town').get();
    expect(town.length).toBeGreaterThan(0);
    for (const o of town) {
      expect(o.type).toBe('town');
    }
  });

  it('byRequester() filters by requester name', () => {
    const first = specialOrders().first()!;
    const results = specialOrders().byRequester(first.requester).get();
    expect(results.length).toBeGreaterThan(0);
    for (const o of results) {
      expect(o.requester.toLowerCase()).toBe(first.requester.toLowerCase());
    }
  });

  it('repeatable() returns only repeatable orders', () => {
    const results = specialOrders().repeatable().get();
    expect(results.length).toBeGreaterThan(0);
    for (const o of results) {
      expect(o.repeatable).toBe(true);
    }
  });
});

describe('SpecialOrderQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = specialOrders().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testFilterImmutability(
  'byType',
  () => specialOrders(),
  (q) => (q as SpecialOrderQuery).byType('town'),
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new SpecialOrderQuery().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(specialOrders().sortByName().count()).toBeGreaterThan(0);
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = specialOrders().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});
