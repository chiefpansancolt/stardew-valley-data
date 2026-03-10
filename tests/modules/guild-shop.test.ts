import { guild, GuildQuery } from '@/modules/guild-shop';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('guild', () => guild());

describe('GuildQuery filters', () => {
  it('weapons() returns only weapons', () => {
    const weapons = guild().weapons().get();
    expect(weapons.length).toBeGreaterThan(0);
    for (const item of weapons) {
      expect(item.category).toBe('weapon');
    }
  });

  it('byMineLevel() includes items at or below the level', () => {
    const lvl40 = guild().byMineLevel(40).get();
    for (const item of lvl40) {
      if (item.mineLevel !== undefined) {
        expect(item.mineLevel).toBeLessThanOrEqual(40);
      }
    }
  });

  it('byWeaponType() filters weapons by type', () => {
    const swords = guild().byWeaponType('sword').get();
    for (const item of swords) {
      expect(item.weaponType).toBe('sword');
    }
  });
});

describe('GuildQuery additional filters', () => {
  it('boots() returns only boots', () => {
    const boots = guild().boots().get();
    expect(boots.length).toBeGreaterThan(0);
    for (const item of boots) {
      expect(item.category).toBe('boots');
    }
  });

  it('rings() returns only rings', () => {
    const rings = guild().rings().get();
    expect(rings.length).toBeGreaterThan(0);
    for (const item of rings) {
      expect(item.category).toBe('ring');
    }
  });

  it('slingshots() returns only slingshots', () => {
    const slings = guild().slingshots().get();
    expect(slings.length).toBeGreaterThan(0);
    for (const item of slings) {
      expect(item.category).toBe('slingshot');
    }
  });

  it('byCategory() filters by arbitrary category', () => {
    const ammo = guild().byCategory('ammo').get();
    for (const item of ammo) {
      expect(item.category).toBe('ammo');
    }
  });

  it('alwaysAvailable() returns items with no availability condition', () => {
    const available = guild().alwaysAvailable().get();
    for (const item of available) {
      expect(item.availability).toBeUndefined();
    }
  });
});

describe('GuildQuery sorts', () => {
  it('sortByMineLevel asc orders by mine level', () => {
    const sorted = guild().sortByMineLevel('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      const a = sorted[i - 1].mineLevel ?? 0;
      const b = sorted[i].mineLevel ?? 0;
      expect(a).toBeLessThanOrEqual(b);
    }
  });

  it('sortByMineLevel desc orders by mine level descending', () => {
    const sorted = guild().sortByMineLevel('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      const a = sorted[i - 1].mineLevel ?? 0;
      const b = sorted[i].mineLevel ?? 0;
      expect(a).toBeGreaterThanOrEqual(b);
    }
  });

  it('sortByPrice asc has lowest first', () => {
    const sorted = guild().sortByPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByPrice desc has highest first', () => {
    const sorted = guild().sortByPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeGreaterThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName asc sorts alphabetically', () => {
    const sorted = guild().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc sorts reverse alphabetically', () => {
    const sorted = guild().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new GuildQuery().count()).toBeGreaterThan(0);
  });

  it('sortByPrice default order', () => {
    expect(guild().sortByPrice().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(guild().sortByName().count()).toBeGreaterThan(0);
  });

  it('sortByMineLevel default order', () => {
    expect(guild().sortByMineLevel().count()).toBeGreaterThan(0);
  });
});
