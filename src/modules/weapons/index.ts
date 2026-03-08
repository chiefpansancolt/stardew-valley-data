import { QueryBase } from '@/common/query-base';
import weaponData from '@/data/weapons.json';
import { MeleeWeapon, Slingshot, Weapon, WeaponType } from '@/types';

const weaponsData: Weapon[] = weaponData as Weapon[];

/**
 * Query builder for weapon data (swords, daggers, clubs, slingshots).
 * All filter and sort methods return a new WeaponQuery for chaining.
 */
export class WeaponQuery extends QueryBase<Weapon> {
  constructor(data: Weapon[] = weaponsData) {
    super(data);
  }

  /** Filter by weapon type string. Use the convenience methods below for type-narrowed results. */
  byType(type: WeaponType): WeaponQuery {
    return new WeaponQuery(this.data.filter((w) => w.type === type));
  }

  /** Filter to swords only. */
  swords(): WeaponQuery {
    return new WeaponQuery(this.data.filter((w): w is MeleeWeapon => w.type === 'sword'));
  }

  /** Filter to daggers only. */
  daggers(): WeaponQuery {
    return new WeaponQuery(this.data.filter((w): w is MeleeWeapon => w.type === 'dagger'));
  }

  /** Filter to clubs only. */
  clubs(): WeaponQuery {
    return new WeaponQuery(this.data.filter((w): w is MeleeWeapon => w.type === 'club'));
  }

  /** Filter to slingshots only. */
  slingshots(): WeaponQuery {
    return new WeaponQuery(this.data.filter((w): w is Slingshot => w.type === 'slingshot'));
  }

  /** Filter to all melee weapons (swords, daggers, clubs). */
  melee(): WeaponQuery {
    return new WeaponQuery(
      this.data.filter(
        (w): w is MeleeWeapon => w.type === 'sword' || w.type === 'dagger' || w.type === 'club',
      ),
    );
  }

  /** Filter to weapons that can be enchanted at the Forge. */
  canEnchant(): WeaponQuery {
    return new WeaponQuery(this.data.filter((w) => w.canEnchant));
  }

  /**
   * Filter to melee weapons at or above the given level threshold.
   * Slingshots are excluded as they have no level.
   */
  byMinLevel(level: number): WeaponQuery {
    return new WeaponQuery(
      this.data.filter((w): w is MeleeWeapon => w.type !== 'slingshot' && w.level >= level),
    );
  }

  /**
   * Filter to melee weapons at or below the given level threshold.
   * Slingshots are excluded as they have no level.
   */
  byMaxLevel(level: number): WeaponQuery {
    return new WeaponQuery(
      this.data.filter((w): w is MeleeWeapon => w.type !== 'slingshot' && w.level <= level),
    );
  }

  /**
   * Sort by max damage. Slingshots sort as 0 since they have no `damageMax`.
   * Default: `'desc'` (highest damage first).
   */
  sortByDamage(order: 'asc' | 'desc' = 'desc'): WeaponQuery {
    return new WeaponQuery(
      [...this.data].sort((a, b) => {
        const aMax = 'damageMax' in a ? a.damageMax : 0;
        const bMax = 'damageMax' in b ? b.damageMax : 0;
        return order === 'asc' ? aMax - bMax : bMax - aMax;
      }),
    );
  }

  /** Sort alphabetically by name. Default: `'asc'`. */
  sortByName(order: 'asc' | 'desc' = 'asc'): WeaponQuery {
    return new WeaponQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  /**
   * Sort by level. Slingshots sort as 0 since they have no level.
   * Default: `'asc'` (lowest level first).
   */
  sortByLevel(order: 'asc' | 'desc' = 'asc'): WeaponQuery {
    return new WeaponQuery(
      [...this.data].sort((a, b) => {
        const aLevel = 'level' in a ? a.level : 0;
        const bLevel = 'level' in b ? b.level : 0;
        return order === 'asc' ? aLevel - bLevel : bLevel - aLevel;
      }),
    );
  }
}

/** Returns a WeaponQuery for all weapon data. Pass `source` to wrap a pre-filtered array. */
export function weapons(source: Weapon[] = weaponsData): WeaponQuery {
  return new WeaponQuery(source);
}
