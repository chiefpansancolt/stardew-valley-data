import weaponData from '@/data/weapons.json';
import { MeleeWeapon, Slingshot, Weapon, WeaponType } from '@/types';

const weaponsData: Weapon[] = weaponData as Weapon[];

export class WeaponQuery {
  constructor(private data: Weapon[] = weaponsData) {}

  byType(type: WeaponType): WeaponQuery {
    return new WeaponQuery(this.data.filter((w) => w.type === type));
  }

  swords(): WeaponQuery {
    return new WeaponQuery(this.data.filter((w): w is MeleeWeapon => w.type === 'sword'));
  }

  daggers(): WeaponQuery {
    return new WeaponQuery(this.data.filter((w): w is MeleeWeapon => w.type === 'dagger'));
  }

  clubs(): WeaponQuery {
    return new WeaponQuery(this.data.filter((w): w is MeleeWeapon => w.type === 'club'));
  }

  slingshots(): WeaponQuery {
    return new WeaponQuery(this.data.filter((w): w is Slingshot => w.type === 'slingshot'));
  }

  melee(): WeaponQuery {
    return new WeaponQuery(
      this.data.filter(
        (w): w is MeleeWeapon => w.type === 'sword' || w.type === 'dagger' || w.type === 'club',
      ),
    );
  }

  canEnchant(): WeaponQuery {
    return new WeaponQuery(this.data.filter((w) => w.canEnchant));
  }

  byMinLevel(level: number): WeaponQuery {
    return new WeaponQuery(
      this.data.filter((w): w is MeleeWeapon => w.type !== 'slingshot' && w.level >= level),
    );
  }

  byMaxLevel(level: number): WeaponQuery {
    return new WeaponQuery(
      this.data.filter((w): w is MeleeWeapon => w.type !== 'slingshot' && w.level <= level),
    );
  }

  sortByDamage(order: 'asc' | 'desc' = 'desc'): WeaponQuery {
    return new WeaponQuery(
      [...this.data].sort((a, b) => {
        const aMax = 'damageMax' in a ? a.damageMax : 0;
        const bMax = 'damageMax' in b ? b.damageMax : 0;
        return order === 'asc' ? aMax - bMax : bMax - aMax;
      }),
    );
  }

  sortByName(order: 'asc' | 'desc' = 'asc'): WeaponQuery {
    return new WeaponQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  sortByLevel(order: 'asc' | 'desc' = 'asc'): WeaponQuery {
    return new WeaponQuery(
      [...this.data].sort((a, b) => {
        const aLevel = 'level' in a ? a.level : 0;
        const bLevel = 'level' in b ? b.level : 0;
        return order === 'asc' ? aLevel - bLevel : bLevel - aLevel;
      }),
    );
  }

  get(): Weapon[] {
    return this.data;
  }

  first(): Weapon | undefined {
    return this.data[0];
  }

  find(id: string): Weapon | undefined {
    return this.data.find((w) => w.id === id);
  }

  findByName(name: string): Weapon | undefined {
    const q = name.toLowerCase();
    return this.data.find((w) => w.name.toLowerCase() === q);
  }

  count(): number {
    return this.data.length;
  }
}

export function weapons(source: Weapon[] = weaponsData): WeaponQuery {
  return new WeaponQuery(source);
}
