export type GuildCategory = 'weapon' | 'boots' | 'ring' | 'slingshot' | 'ammo' | 'furniture';

export type GuildWeaponType = 'sword' | 'dagger' | 'club';

export interface GuildItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: GuildCategory;
  weaponType?: GuildWeaponType;
  mineLevel?: number;
  availability?: string;
}
