import {
  getMasteryLevel,
  getProfessionOptions,
  getTitle,
  getTitleScore,
  MASTERY_LEVELS,
  SKILL_TITLES,
  skills,
} from '@/modules/skills';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('skills', () => skills());

describe('getTitleScore()', () => {
  it('returns floor of sum / 2', () => {
    expect(getTitleScore(10, 10, 10, 10, 10)).toBe(25);
    expect(getTitleScore(0, 0, 0, 0, 0)).toBe(0);
    expect(getTitleScore(1, 0, 0, 0, 0)).toBe(0); // floor(1/2) = 0
    expect(getTitleScore(3, 0, 0, 0, 0)).toBe(1); // floor(3/2) = 1
  });
});

describe('getTitle()', () => {
  it('returns Newcomer for all zeros', () => {
    expect(getTitle(0, 0, 0, 0, 0)).toBe('Newcomer');
  });

  it('returns a title for max skills', () => {
    const title = getTitle(10, 10, 10, 10, 10);
    expect(typeof title).toBe('string');
    expect(title.length).toBeGreaterThan(0);
    expect(title).not.toBe('Newcomer');
  });
});

describe('getMasteryLevel()', () => {
  it('returns 0 for 0 XP', () => {
    expect(getMasteryLevel(0)).toBe(0);
  });

  it('returns correct levels at thresholds', () => {
    for (let i = 0; i < MASTERY_LEVELS.length; i++) {
      expect(getMasteryLevel(MASTERY_LEVELS[i].totalXp)).toBe(i + 1);
    }
  });

  it('caps at max level', () => {
    expect(getMasteryLevel(999999999)).toBe(MASTERY_LEVELS.length);
  });
});

describe('getProfessionOptions()', () => {
  it('returns level 10 options for a valid profession', () => {
    const options = getProfessionOptions('Farming', 'Rancher');
    expect(options.length).toBeGreaterThan(0);
    for (const opt of options) {
      expect(opt.name).toBeDefined();
    }
  });

  it('returns empty for invalid skill', () => {
    expect(getProfessionOptions('InvalidSkill', 'Invalid')).toEqual([]);
  });
});

describe('SKILL_TITLES', () => {
  it('contains entries with minScore and title', () => {
    expect(SKILL_TITLES.length).toBeGreaterThan(0);
    for (const t of SKILL_TITLES) {
      expect(typeof t.minScore).toBe('number');
      expect(typeof t.title).toBe('string');
    }
  });
});

describe('branch coverage', () => {
  it('SkillQuery constructor uses default data when called without args', () => {
    const { SkillQuery } = require('@/modules/skills');
    const query = new SkillQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('getTitle returns Newcomer when no title matches (fallback via empty SKILL_TITLES)', () => {
    // Temporarily clear SKILL_TITLES to exercise the ?? 'Newcomer' fallback
    const original = [...SKILL_TITLES];
    SKILL_TITLES.length = 0;
    try {
      const title = getTitle(10, 10, 10, 10, 10);
      expect(title).toBe('Newcomer');
    } finally {
      SKILL_TITLES.push(...original);
    }
  });
});

describe('MASTERY_LEVELS', () => {
  it('has ascending totalXp', () => {
    for (let i = 1; i < MASTERY_LEVELS.length; i++) {
      expect(MASTERY_LEVELS[i].totalXp).toBeGreaterThan(MASTERY_LEVELS[i - 1].totalXp);
    }
  });
});
