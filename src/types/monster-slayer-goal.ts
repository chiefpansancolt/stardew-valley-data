export interface SlayerReward {
  name: string;
  itemId: string | null;
  image: string | null;
}

export interface MonsterSlayerGoal {
  id: string;
  name: string;
  killTarget: number;
  reward: SlayerReward;
}
