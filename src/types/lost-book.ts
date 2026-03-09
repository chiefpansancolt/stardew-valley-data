export interface LostBook {
  /** Numeric identifier matching the in-game collection order */
  id: string;
  /** Display name of the book */
  name: string;
  /** Full text content of the book */
  description: string;
  /** Image path relative to package root */
  image: string;
}
