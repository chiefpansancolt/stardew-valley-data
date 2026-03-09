export type StarDropSource =
  | 'purchase'
  | 'exploration'
  | 'friendship'
  | 'achievement'
  | 'collection';

export interface StarDrop {
  /** Game-internal identifier (e.g. "CF_Fair", "museumComplete") */
  id: string;
  /** Display name */
  name: string;
  /** How to obtain this stardrop */
  description: string;
  /** Broad category describing the acquisition method */
  source: StarDropSource;
  /** Image path relative to package root */
  image: string;
}
