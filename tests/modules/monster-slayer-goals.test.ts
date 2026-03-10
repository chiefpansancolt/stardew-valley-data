import { MonsterSlayerGoalQuery, monsterSlayerGoals } from '@/modules/monster-slayer-goals';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('monsterSlayerGoals', () => monsterSlayerGoals());

describe('MonsterSlayerGoalQuery', () => {
  it('returns non-empty data', () => {
    expect(monsterSlayerGoals().count()).toBeGreaterThan(0);
  });

  it('sortByKillTarget asc has lowest first', () => {
    const sorted = monsterSlayerGoals().sortByKillTarget('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].killTarget).toBeLessThanOrEqual(sorted[i].killTarget);
    }
  });

  it('sortByKillTarget desc has highest first', () => {
    const sorted = monsterSlayerGoals().sortByKillTarget('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].killTarget).toBeGreaterThanOrEqual(sorted[i].killTarget);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new MonsterSlayerGoalQuery().count()).toBeGreaterThan(0);
  });

  it('sortByKillTarget default order', () => {
    expect(monsterSlayerGoals().sortByKillTarget().count()).toBeGreaterThan(0);
  });
});
