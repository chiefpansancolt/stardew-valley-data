export interface GrandpaInput {
  totalEarnings: number;
  totalSkillLevels: number;
  museumCompleted: boolean;
  masterAngler: boolean;
  fullShipment: boolean;
  married: boolean;
  villagersAt8Hearts: number;
  petFriendship: boolean;
  communityCenterCompleted: boolean;
  communityCenterCeremonyAttended: boolean;
  skullKeyObtained: boolean;
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
