export interface MonsterLoot {
  id: string;
  name: string;
  sellPrice: number;
  image: string;
  /** IDs of monsters that drop this loot */
  droppedBy: string[];
}

export interface Monster {
  id: string;
  name: string;
  hp: number;
  damage: number;
  speed: number;
  /** Combat XP granted on kill */
  xp: number;
  image: string;
  locations: string[];
  /** IDs of classified monster loot items this monster can drop */
  lootIds: string[];
  /** Whether this monster only appears in Dangerous Mines / Dangerous Skull Cavern */
  dangerous: boolean;
}
