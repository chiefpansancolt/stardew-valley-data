export type SpecialItemType = 'special-item' | 'book' | 'skill-book' | 'mastery';

export type MasterySkill = 'farming' | 'mining' | 'foraging' | 'fishing' | 'combat';

export interface SpecialItem {
  /** Unique identifier in kebab-case */
  id: string;
  /** Display name */
  name: string;
  /** Category of special item */
  type: SpecialItemType;
  /** What this item does when obtained or used */
  effect: string;
  /** How to obtain this item */
  obtainedFrom: string;
  /** Image path relative to package root */
  image: string;
  /** Only present for mastery type — the associated skill */
  skill?: MasterySkill;
}
