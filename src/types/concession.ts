export type ConcessionTag =
  | 'sweet'
  | 'candy'
  | 'drink'
  | 'hot'
  | 'healthy'
  | 'sour'
  | 'fatty'
  | 'sandwich'
  | 'burger'
  | 'cold'
  | 'salty'
  | 'gourmet'
  | 'joja';

export interface Concession {
  /** Unique identifier in kebab-case */
  id: string;
  /** Display name */
  name: string;
  /** Price in Qi coins */
  price: number;
  /** Flavor/category tags */
  tags: ConcessionTag[];
  /** Image path relative to package root */
  image: string;
}
