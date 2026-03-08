export type WeaponType = 'sword' | 'dagger' | 'club' | 'slingshot';

export interface MeleeWeapon {
  id: string;
  type: 'sword' | 'dagger' | 'club';
  name: string;
  image: string;
  damageMin: number;
  damageMax: number;
  speed: number;
  critChance: number;
  critPower: number;
  defense: number;
  knockback: number;
  level: number;
  obtain: string;
  sellPrice: number;
  canEnchant: boolean;
}

export interface Slingshot {
  id: string;
  type: 'slingshot';
  name: string;
  image: string;
  obtain: string;
  sellPrice: number;
  canEnchant: boolean;
}

export type Weapon = MeleeWeapon | Slingshot;
