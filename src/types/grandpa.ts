export interface GrandpaInput {
  /** Lifetime total earnings in gold. */
  totalEarnings: number;
  /** Sum of all 5 skill levels (Farming + Fishing + Foraging + Mining + Combat). Max 50. */
  totalSkillLevels: number;
  /** Completed the museum (A Complete Collection achievement). */
  museumCompleted: boolean;
  /** Caught every fish (Master Angler achievement). */
  masterAngler: boolean;
  /** Shipped every item (Full Shipment achievement). */
  fullShipment: boolean;
  /** Married with at least 2 house upgrades (kitchen + nursery). */
  married: boolean;
  /** Number of villagers with 8+ hearts. */
  villagersAt8Hearts: number;
  /** Pet has reached maximum friendship (~1,975+ relationship points). */
  petFriendship: boolean;
  /** Community Center has been completed. */
  communityCenterCompleted: boolean;
  /** Watched the Community Center completion ceremony cutscene. */
  communityCenterCeremonyAttended: boolean;
  /** Obtained the Skull Key. */
  skullKeyObtained: boolean;
  /** Obtained the Rusty Key. */
  rustyKeyObtained: boolean;
}

export interface GrandpaScoreEntry {
  criterion: string;
  points: number;
  maxPoints: number;
  category: GrandpaCategory;
}

export type GrandpaCategory =
  | 'earnings'
  | 'skills'
  | 'achievements'
  | 'friendship'
  | 'community-center'
  | 'exploration';

export interface GrandpaResult {
  score: number;
  maxScore: number;
  candles: 1 | 2 | 3 | 4;
  breakdown: GrandpaScoreEntry[];
}
