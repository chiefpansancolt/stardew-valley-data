import { AchievementQuery, achievements } from '@/modules/achievements';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new AchievementQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByName() uses default order (asc)', () => {
    const sorted = achievements().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = achievements().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

testQueryBaseContract('achievements', () => achievements());

describe('AchievementQuery filters', () => {
  it('secret() returns only secret achievements', () => {
    const result = achievements().secret().get();
    expect(result.length).toBeGreaterThan(0);
    for (const a of result) {
      expect(a.secret).toBe(true);
    }
  });

  it('inGame() returns achievements with icons', () => {
    const result = achievements().inGame().get();
    expect(result.length).toBeGreaterThan(0);
    for (const a of result) {
      expect(a.icon).not.toBeNull();
    }
  });

  it('withReward() returns achievements that grant rewards', () => {
    const result = achievements().withReward().get();
    expect(result.length).toBeGreaterThan(0);
    for (const a of result) {
      expect(a.reward).not.toBeNull();
    }
  });
});

describe('AchievementQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = achievements().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testFilterImmutability(
  'secret',
  () => achievements(),
  (q) => (q as AchievementQuery).secret(),
);
testFilterImmutability(
  'inGame',
  () => achievements(),
  (q) => (q as AchievementQuery).inGame(),
);
