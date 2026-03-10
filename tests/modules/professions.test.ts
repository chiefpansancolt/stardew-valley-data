import { ProfessionQuery, professions } from '@/modules/professions';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('professions', () => professions());

describe('ProfessionQuery filters', () => {
  it('bySkill() filters by skill', () => {
    const results = professions().bySkill('Farming').get();
    expect(results.length).toBeGreaterThan(0);
    for (const p of results) {
      expect(p.skill).toBe('Farming');
    }
  });

  it('byLevel() filters by level', () => {
    const level5 = professions().byLevel(5).get();
    expect(level5.length).toBeGreaterThan(0);
    for (const p of level5) {
      expect(p.level).toBe(5);
    }
  });

  it('byParent() filters by parent profession', () => {
    const level5First = professions().byLevel(5).first()!;
    const children = professions().byParent(level5First.id).get();
    for (const p of children) {
      expect(p.parentProfession).toBe(level5First.id);
    }
  });
});

describe('ProfessionQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = professions().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testFilterImmutability(
  'bySkill',
  () => professions(),
  (q) => (q as ProfessionQuery).bySkill('Farming'),
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new ProfessionQuery().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(professions().sortByName().count()).toBeGreaterThan(0);
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = professions().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});
