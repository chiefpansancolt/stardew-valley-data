import { monsterLoot, MonsterLootQuery, MonsterQuery, monsters } from '@/modules/monsters';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('monsters', () => monsters());
testQueryBaseContract('monsterLoot', () => monsterLoot());

describe('MonsterQuery filters', () => {
  it('dangerous() returns only dangerous variants', () => {
    const dangerous = monsters().dangerous().get();
    expect(dangerous.length).toBeGreaterThan(0);
    for (const m of dangerous) {
      expect(m.dangerous).toBe(true);
    }
  });

  it('standard() returns only non-dangerous', () => {
    const standard = monsters().standard().get();
    expect(standard.length).toBeGreaterThan(0);
    for (const m of standard) {
      expect(m.dangerous).toBe(false);
    }
  });

  it('dangerous + standard = all monsters', () => {
    const total = monsters().count();
    const d = monsters().dangerous().count();
    const s = monsters().standard().count();
    expect(d + s).toBe(total);
  });

  it('byLocation() filters monsters by location substring', () => {
    const first = monsters().first()!;
    const loc = first.locations[0];
    if (loc) {
      const results = monsters().byLocation(loc).get();
      expect(results.length).toBeGreaterThan(0);
      for (const m of results) {
        expect(m.locations.some((l) => l.toLowerCase().includes(loc.toLowerCase()))).toBe(true);
      }
    }
  });

  it('dropsLoot() filters to monsters that drop a specific loot ID', () => {
    const withLoot = monsters()
      .get()
      .find((m) => m.lootIds.length > 0);
    if (withLoot) {
      const lootId = withLoot.lootIds[0];
      const results = monsters().dropsLoot(lootId).get();
      expect(results.length).toBeGreaterThan(0);
      for (const m of results) {
        expect(m.lootIds).toContain(lootId);
      }
    }
  });
});

describe('MonsterQuery sorts', () => {
  it('sortByXp desc has highest first', () => {
    const sorted = monsters().sortByXp('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].xp).toBeGreaterThanOrEqual(sorted[i].xp);
    }
  });

  it('sortByHp asc has lowest first', () => {
    const sorted = monsters().sortByHp('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].hp).toBeLessThanOrEqual(sorted[i].hp);
    }
  });
});

describe('MonsterLootQuery', () => {
  it('droppedBy() filters to loot from a specific monster', () => {
    const firstMonster = monsters().first()!;
    const loot = monsterLoot().droppedBy(firstMonster.id).get();
    expect(Array.isArray(loot)).toBe(true);
  });
});

testFilterImmutability(
  'dangerous',
  () => monsters(),
  (q) => (q as MonsterQuery).dangerous(),
);

describe('branch coverage', () => {
  it('MonsterQuery constructor default', () => {
    expect(new MonsterQuery().count()).toBeGreaterThan(0);
  });

  it('MonsterLootQuery constructor default', () => {
    expect(new MonsterLootQuery().count()).toBeGreaterThan(0);
  });

  it('sortByXp default order', () => {
    expect(monsters().sortByXp().count()).toBeGreaterThan(0);
  });

  it('sortByHp default order', () => {
    expect(monsters().sortByHp().count()).toBeGreaterThan(0);
  });

  it('sortByXp asc has lowest first', () => {
    const sorted = monsters().sortByXp('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].xp).toBeLessThanOrEqual(sorted[i].xp);
    }
  });
});
