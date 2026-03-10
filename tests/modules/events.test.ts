import { EventQuery, events } from '@/modules/events';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new EventQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByHearts() uses default order (asc)', () => {
    const sorted = events().sortByHearts().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].hearts).toBeLessThanOrEqual(sorted[i].hearts);
    }
  });

  it('sortByVillager() uses default order (asc)', () => {
    const sorted = events().sortByVillager().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].villager.localeCompare(sorted[i].villager)).toBeLessThanOrEqual(0);
    }
  });
});

testQueryBaseContract('events', () => events());

describe('EventQuery filters', () => {
  it('byVillager() filters to a specific villager', () => {
    const first = events().first()!;
    const results = events().byVillager(first.villager).get();
    expect(results.length).toBeGreaterThan(0);
    for (const e of results) {
      expect(e.villager.toLowerCase()).toBe(first.villager.toLowerCase());
    }
  });

  it('byHearts() filters by heart level', () => {
    const first = events().first()!;
    const results = events().byHearts(first.hearts).get();
    expect(results.length).toBeGreaterThan(0);
    for (const e of results) {
      expect(e.hearts).toBe(first.hearts);
    }
  });

  it('marriageEvents() returns only marriage heart levels', () => {
    const marriageHearts = [2, 4, 6, 8, 10, 14];
    const results = events().marriageEvents().get();
    expect(results.length).toBeGreaterThan(0);
    for (const e of results) {
      expect(marriageHearts).toContain(e.hearts);
    }
  });
});

describe('EventQuery sorts', () => {
  it('sortByHearts asc has lowest first', () => {
    const sorted = events().sortByHearts('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].hearts).toBeLessThanOrEqual(sorted[i].hearts);
    }
  });

  it('sortByHearts desc has highest first', () => {
    const sorted = events().sortByHearts('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].hearts).toBeGreaterThanOrEqual(sorted[i].hearts);
    }
  });

  it('sortByVillager asc is alphabetical', () => {
    const sorted = events().sortByVillager('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].villager.localeCompare(sorted[i].villager)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByVillager desc is reverse alphabetical', () => {
    const sorted = events().sortByVillager('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].villager.localeCompare(sorted[i].villager)).toBeGreaterThanOrEqual(0);
    }
  });
});

testFilterImmutability(
  'byVillager',
  () => events(),
  (q) => {
    const villager = events().first()!.villager;
    return (q as EventQuery).byVillager(villager);
  },
);
