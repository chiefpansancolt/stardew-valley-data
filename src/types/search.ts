export type SearchResultKind =
  | 'crop'
  | 'crop-seed'
  | 'fruit-tree'
  | 'fruit-tree-produce'
  | 'wild-tree'
  | 'wild-tree-seed'
  | 'wild-tree-tapper'
  | 'animal'
  | 'animal-produce'
  | 'artisan-good'
  | 'monster'
  | 'monster-loot';

export interface SearchResult {
  kind: SearchResultKind;
  id: string;
  name: string;
  image: string;
  sellPrice: number | null;
  /** Present when the result is a nested item (e.g. produce from a farm animal). Multiple entries when the same item is shared across parents. */
  parents?: { id: string; name: string }[];
}
