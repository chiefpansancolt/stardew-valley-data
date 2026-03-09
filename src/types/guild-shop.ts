export type GuildCategory = 'weapon' | 'boots' | 'ring' | 'slingshot' | 'ammo' | 'furniture';

export type GuildWeaponType = 'sword' | 'dagger' | 'club';

export interface GuildItem {
  /** Game item ID */
  id: string;
  /** Display name */
  name: string;
  /** Purchase price in gold */
  price: number;
  /** Item description */
  description: string;
  /** Image path */
  image: string;
  /** Item category */
  category: GuildCategory;
  /** Weapon type (weapons only) */
  weaponType?: GuildWeaponType;
  /** Minimum mine level required to unlock this item */
  mineLevel?: number;
  /** Purchase condition if not always available */
  availability?: string;
}
