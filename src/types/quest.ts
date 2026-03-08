export interface StoryQuest {
  id: string;
  type: 'story';
  name: string;
  text: string;
  providedBy: string;
  requirements: string;
  rewards: string;
}

export interface SpecialOrder {
  id: string;
  type: 'special-order';
  name: string;
  text: string;
  providedBy: string;
  prerequisites: string | null;
  timeframe: number;
  requirements: string;
  rewards: string;
  repeatable: boolean;
}

export interface QiSpecialOrder {
  id: string;
  type: 'qi-special-order';
  name: string;
  text: string;
  timeframe: number;
  requirements: string;
  rewards: string;
}

export type Quest = StoryQuest | SpecialOrder | QiSpecialOrder;

export type QuestType = Quest['type'];
