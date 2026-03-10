import { LocationQuery, locations } from '@/modules/locations';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('locations', () => locations());

describe('LocationQuery filters', () => {
  it('byCategory() filters by category', () => {
    const first = locations().first()!;
    const results = locations()
      .byCategory(first.category as any)
      .get();
    expect(results.length).toBeGreaterThan(0);
    for (const l of results) {
      expect(l.category).toBe(first.category);
    }
  });

  it('withShop() returns only locations with shops', () => {
    const results = locations().withShop().get();
    expect(results.length).toBeGreaterThan(0);
    for (const l of results) {
      expect(l.shop).not.toBeNull();
    }
  });

  it('alwaysOpen() returns only locations without hours', () => {
    const results = locations().alwaysOpen().get();
    expect(results.length).toBeGreaterThan(0);
    for (const l of results) {
      expect(l.openHours).toBeNull();
    }
  });

  it('byType() filters by type', () => {
    const result = locations().byType('location').get();
    expect(result.length).toBeGreaterThan(0);
    for (const l of result) {
      expect(l.type).toBe('location');
    }
  });

  it('closedOn() filters to locations closed on a given day', () => {
    const allLocs = locations().get();
    const locWithClosed = allLocs.find((l) => l.closed.length > 0);
    if (locWithClosed) {
      const day = locWithClosed.closed[0] as any;
      const results = locations().closedOn(day).get();
      expect(results.length).toBeGreaterThan(0);
      for (const l of results) {
        expect(l.closed).toContain(day);
      }
    }
  });

  it('byOccupant() filters by occupant name', () => {
    const allLocs = locations().get();
    const locWithOccupant = allLocs.find((l) => l.occupants.length > 0);
    if (locWithOccupant) {
      const occupant = locWithOccupant.occupants[0];
      const results = locations().byOccupant(occupant).get();
      expect(results.length).toBeGreaterThan(0);
      for (const l of results) {
        expect(l.occupants.some((o) => o.toLowerCase() === occupant.toLowerCase())).toBe(true);
      }
    }
  });
});

describe('LocationQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = locations().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testFilterImmutability(
  'withShop',
  () => locations(),
  (q) => (q as LocationQuery).withShop(),
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new LocationQuery().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(locations().sortByName().count()).toBeGreaterThan(0);
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = locations().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});
