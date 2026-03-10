import { FarmMapQuery, maps } from '@/modules/maps';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('maps', () => maps());

describe('FarmMapQuery filters', () => {
  it('bySkill() returns maps with that skill', () => {
    const all = maps().get();
    const firstSkill = all[0]?.skills[0];
    if (firstSkill) {
      const filtered = maps().bySkill(firstSkill).get();
      expect(filtered.length).toBeGreaterThan(0);
      for (const m of filtered) {
        expect(m.skills.map((s) => s.toLowerCase())).toContain(firstSkill.toLowerCase());
      }
    }
  });

  it('bySkill() is case-insensitive', () => {
    const all = maps().get();
    const firstSkill = all[0]?.skills[0];
    if (firstSkill) {
      const lower = maps().bySkill(firstSkill.toLowerCase()).count();
      const upper = maps().bySkill(firstSkill.toUpperCase()).count();
      expect(lower).toBe(upper);
    }
  });
});

testFilterImmutability(
  'bySkill',
  () => maps(),
  (q) => {
    const skill = q.get()[0]?.skills[0] ?? '';
    return (q as FarmMapQuery).bySkill(skill);
  },
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new FarmMapQuery().count()).toBeGreaterThan(0);
  });
});
