import { VillagerQuery, villagers } from '@/modules/villagers';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('villagers', () => villagers());

describe('VillagerQuery filters', () => {
  it('marriageable() returns only marriageable villagers', () => {
    const result = villagers().marriageable().get();
    expect(result.length).toBeGreaterThan(0);
    for (const v of result) {
      expect(v.marriageable).toBe(true);
    }
  });

  it('byBirthdaySeason() returns villagers born in that season', () => {
    const spring = villagers().byBirthdaySeason('spring').get();
    expect(spring.length).toBeGreaterThan(0);
    for (const v of spring) {
      expect(v.birthday.season).toBe('spring');
    }
  });
});

describe('VillagerQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = villagers().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByBirthday puts spring before winter', () => {
    const sorted = villagers().sortByBirthday().get();
    const seasonOrder: Record<string, number> = { spring: 0, summer: 1, fall: 2, winter: 3 };
    for (let i = 1; i < sorted.length; i++) {
      const prev = seasonOrder[sorted[i - 1].birthday.season] * 100 + sorted[i - 1].birthday.day;
      const curr = seasonOrder[sorted[i].birthday.season] * 100 + sorted[i].birthday.day;
      expect(prev).toBeLessThanOrEqual(curr);
    }
  });
});

testFilterImmutability(
  'marriageable',
  () => villagers(),
  (q) => (q as VillagerQuery).marriageable(),
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new VillagerQuery().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(villagers().sortByName().count()).toBeGreaterThan(0);
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = villagers().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});
