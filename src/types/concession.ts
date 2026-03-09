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
  id: string;
  name: string;
  price: number;
  tags: ConcessionTag[];
  image: string;
}
