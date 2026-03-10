import { WeaponQuery, weapons } from '@/modules/weapons';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('weapons', () => weapons());

describe('WeaponQuery filters', () => {
  it('swords() returns only swords', () => {
    const result = weapons().swords().get();
    expect(result.length).toBeGreaterThan(0);
    for (const w of result) {
      expect(w.type).toBe('sword');
    }
  });

  it('melee() excludes slingshots', () => {
    const result = weapons().melee().get();
    for (const w of result) {
      expect(w.type).not.toBe('slingshot');
    }
  });

  it('byType() filters by type string', () => {
    const clubs = weapons().byType('club').get();
    expect(clubs.length).toBeGreaterThan(0);
    for (const w of clubs) {
      expect(w.type).toBe('club');
    }
  });

  it('canEnchant() returns only enchantable weapons', () => {
    const result = weapons().canEnchant().get();
    for (const w of result) {
      expect(w.canEnchant).toBe(true);
    }
  });
});

describe('WeaponQuery additional filters', () => {
  it('daggers() returns only daggers', () => {
    const result = weapons().daggers().get();
    expect(result.length).toBeGreaterThan(0);
    for (const w of result) {
      expect(w.type).toBe('dagger');
    }
  });

  it('clubs() returns only clubs', () => {
    const result = weapons().clubs().get();
    expect(result.length).toBeGreaterThan(0);
    for (const w of result) {
      expect(w.type).toBe('club');
    }
  });

  it('slingshots() returns only slingshots', () => {
    const result = weapons().slingshots().get();
    expect(result.length).toBeGreaterThan(0);
    for (const w of result) {
      expect(w.type).toBe('slingshot');
    }
  });

  it('byMinLevel() returns melee weapons at or above level', () => {
    const result = weapons().byMinLevel(10).get();
    expect(result.length).toBeGreaterThan(0);
    for (const w of result) {
      expect(w.type).not.toBe('slingshot');
      if ('level' in w) {
        expect(w.level).toBeGreaterThanOrEqual(10);
      }
    }
  });

  it('byMaxLevel() returns melee weapons at or below level', () => {
    const result = weapons().byMaxLevel(5).get();
    expect(result.length).toBeGreaterThan(0);
    for (const w of result) {
      expect(w.type).not.toBe('slingshot');
      if ('level' in w) {
        expect(w.level).toBeLessThanOrEqual(5);
      }
    }
  });
});

describe('WeaponQuery sorts', () => {
  it('sortByDamage desc has highest first', () => {
    const sorted = weapons().sortByDamage('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      const curr = sorted[i];
      const prevMax = prev.type !== 'slingshot' ? prev.damageMax : 0;
      const currMax = curr.type !== 'slingshot' ? curr.damageMax : 0;
      expect(prevMax).toBeGreaterThanOrEqual(currMax);
    }
  });
});

describe('WeaponQuery additional sorts', () => {
  it('sortByDamage asc has lowest first', () => {
    const sorted = weapons().sortByDamage('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      const curr = sorted[i];
      const prevMax = prev.type !== 'slingshot' ? prev.damageMax : 0;
      const currMax = curr.type !== 'slingshot' ? curr.damageMax : 0;
      expect(prevMax).toBeLessThanOrEqual(currMax);
    }
  });

  it('sortByName asc sorts alphabetically', () => {
    const sorted = weapons().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc sorts reverse alphabetically', () => {
    const sorted = weapons().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });

  it('sortByLevel asc has lowest level first', () => {
    const sorted = weapons().sortByLevel('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      const aLevel = 'level' in sorted[i - 1] ? (sorted[i - 1] as { level: number }).level : 0;
      const bLevel = 'level' in sorted[i] ? (sorted[i] as { level: number }).level : 0;
      expect(aLevel).toBeLessThanOrEqual(bLevel);
    }
  });

  it('sortByLevel desc has highest level first', () => {
    const sorted = weapons().sortByLevel('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      const aLevel = 'level' in sorted[i - 1] ? (sorted[i - 1] as { level: number }).level : 0;
      const bLevel = 'level' in sorted[i] ? (sorted[i] as { level: number }).level : 0;
      expect(aLevel).toBeGreaterThanOrEqual(bLevel);
    }
  });
});

testFilterImmutability(
  'swords',
  () => weapons(),
  (q) => (q as WeaponQuery).swords(),
);
testFilterImmutability(
  'melee',
  () => weapons(),
  (q) => (q as WeaponQuery).melee(),
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new WeaponQuery().count()).toBeGreaterThan(0);
  });

  it('sortByDamage default order', () => {
    expect(weapons().sortByDamage().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(weapons().sortByName().count()).toBeGreaterThan(0);
  });

  it('sortByLevel default order', () => {
    expect(weapons().sortByLevel().count()).toBeGreaterThan(0);
  });
});
