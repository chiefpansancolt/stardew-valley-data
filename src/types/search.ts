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
  | 'monster-loot'
  | 'ring'
  | 'tool'
  | 'weapon'
  | 'hat'
  | 'footwear'
  | 'forageable'
  | 'fish'
  | 'bait'
  | 'tackle';

export interface SearchResult {
  kind: SearchResultKind;
  id: string;
  name: string;
  image: string;
  sellPrice: number | null;
  parents?: { id: string; name: string }[];
}
