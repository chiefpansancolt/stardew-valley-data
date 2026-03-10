export type SpecialItemType = 'special-item' | 'book' | 'skill-book' | 'mastery';

export type MasterySkill = 'farming' | 'mining' | 'foraging' | 'fishing' | 'combat';

export interface SpecialItem {
  id: string;
  name: string;
  type: SpecialItemType;
  effect: string;
  obtainedFrom: string;
  image: string;
  skill?: MasterySkill;
  mailFlags?: string[];
  eventFlags?: string[];
}
