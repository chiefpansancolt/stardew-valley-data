export interface MonsterLoot {
  id: string;
  name: string;
  sellPrice: number;
  image: string;
  droppedBy: string[];
}

export interface MonsterVariant {
  name: string;
  hp: number;
  damage: number;
  speed: number;
  xp: number;
  image: string;
  locations: string[];
  lootIds: string[];
  dangerous: boolean;
}

export interface Monster {
  id: string;
  name: string;
  hp: number;
  damage: number;
  speed: number;
  xp: number;
  image: string;
  locations: string[];
  lootIds: string[];
  dangerous: boolean;
  /** Additional variants that share this monster's game ID */
  variants?: MonsterVariant[];
}
