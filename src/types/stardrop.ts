export type StarDropSource =
  | 'purchase'
  | 'exploration'
  | 'friendship'
  | 'achievement'
  | 'collection';

export interface StarDrop {
  id: string;
  name: string;
  description: string;
  source: StarDropSource;
  image: string;
}
