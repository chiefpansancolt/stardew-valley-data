import { QueryBase } from '@/common/query-base';
import data from '@/data/trees.json';
import { ArtisanUses, FruitTree, Season, Tree, WildTree } from '@/types';

const treeData: Tree[] = data as Tree[];

/**
 * Query builder for tree data (fruit trees and wild trees).
 * All filter and sort methods return a new TreeQuery for chaining.
 * Use `.fruitTrees()` or `.wildTrees()` to narrow to a specific subtype.
 */
export class TreeQuery extends QueryBase<Tree> {
  constructor(data: Tree[] = treeData) {
    super(data);
  }

  /** Filter to fruit trees only (`type === 'fruit-tree'`). */
  fruitTrees(): TreeQuery {
    return new TreeQuery(this.data.filter((t): t is FruitTree => t.type === 'fruit-tree'));
  }

  /** Filter to wild trees only (`type === 'wild-tree'`). */
  wildTrees(): TreeQuery {
    return new TreeQuery(this.data.filter((t): t is WildTree => t.type === 'wild-tree'));
  }

  /** Filter fruit trees by season they produce in. Wild trees are excluded. */
  bySeason(season: Season): TreeQuery {
    return new TreeQuery(
      this.data.filter((t) => t.type === 'fruit-tree' && (t as FruitTree).seasons.includes(season)),
    );
  }

  /** Filter to fruit trees whose produce can be used for the given artisan good. Wild trees always return false for all uses. */
  byArtisanUse(use: keyof ArtisanUses): TreeQuery {
    return new TreeQuery(
      this.data.filter((t) => t.type === 'fruit-tree' && (t as FruitTree).produce.artisanUses[use]),
    );
  }

  /** Filter to wild trees that can be tapped (have a `tapper` product). */
  tappable(): TreeQuery {
    return new TreeQuery(
      this.data.filter((t) => t.type === 'wild-tree' && (t as WildTree).tapper !== undefined),
    );
  }

  /**
   * Sort by produce sell price. For fruit trees uses `produce.sellPrice`;
   * for wild trees uses `tapper.sellPrice` (or 0 if untappable). Default: `'desc'`.
   */
  sortByProduceSellPrice(order: 'asc' | 'desc' = 'desc'): TreeQuery {
    return new TreeQuery(
      [...this.data].sort((a, b) => {
        const aPrice = a.type === 'fruit-tree' ? a.produce.sellPrice : (a.tapper?.sellPrice ?? 0);
        const bPrice = b.type === 'fruit-tree' ? b.produce.sellPrice : (b.tapper?.sellPrice ?? 0);
        return order === 'desc' ? bPrice - aPrice : aPrice - bPrice;
      }),
    );
  }
}

/** Returns a TreeQuery for all tree data (fruit + wild). Pass `source` to wrap a pre-filtered array. */
export function trees(source: Tree[] = treeData): TreeQuery {
  return new TreeQuery(source);
}
