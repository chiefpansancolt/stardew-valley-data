export interface SlayerReward {
  /** Display name of the reward item */
  name: string;
  /** Game item ID with type prefix, e.g. "(O)520", "(H)8", "(W)13". Null for non-item rewards. */
  itemId: string | null;
  /** Image path relative to package root. Null for non-item rewards. */
  image: string | null;
}

export interface MonsterSlayerGoal {
  /** Game-internal key from MonsterSlayerQuests.json (e.g. "Slimes", "FlameSpirits") */
  id: string;
  /** Display name shown in the Adventurer's Guild (e.g. "Slime", "Void Spirits") */
  name: string;
  /** Number of kills required to complete the goal */
  killTarget: number;
  /** Reward granted upon completion */
  reward: SlayerReward;
}
