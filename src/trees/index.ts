import data from '@/data/trees.json';
import { FruitTree, Season, Tree, WildTree } from '@/types';

const treeData: Tree[] = data as Tree[];

export class TreeQuery {
  constructor(private data: Tree[] = treeData) {}

  fruitTrees(): TreeQuery {
    return new TreeQuery(this.data.filter((t): t is FruitTree => t.type === 'fruit-tree'));
  }

  wildTrees(): TreeQuery {
    return new TreeQuery(this.data.filter((t): t is WildTree => t.type === 'wild-tree'));
  }

  bySeason(season: Season): TreeQuery {
    return new TreeQuery(
      this.data.filter(
        (t) => t.type === 'fruit-tree' && (t as FruitTree).seasons.includes(season),
      ),
    );
  }

  tappable(): TreeQuery {
    return new TreeQuery(
      this.data.filter((t) => t.type === 'wild-tree' && (t as WildTree).tapper !== undefined),
    );
  }

  sortByProduceSellPrice(order: 'asc' | 'desc' = 'desc'): TreeQuery {
    return new TreeQuery(
      [...this.data].sort((a, b) => {
        const aPrice = a.type === 'fruit-tree' ? a.produce.sellPrice : (a.tapper?.sellPrice ?? 0);
        const bPrice = b.type === 'fruit-tree' ? b.produce.sellPrice : (b.tapper?.sellPrice ?? 0);
        return order === 'desc' ? bPrice - aPrice : aPrice - bPrice;
      }),
    );
  }

  find(id: string): Tree | undefined {
    return this.data.find((t) => t.id === id);
  }

  findByName(name: string): Tree | undefined {
    return this.data.find((t) => t.name.toLowerCase() === name.toLowerCase());
  }

  get(): Tree[] {
    return this.data;
  }

  first(): Tree | undefined {
    return this.data[0];
  }

  count(): number {
    return this.data.length;
  }
}

export function trees(source: Tree[] = treeData): TreeQuery {
  return new TreeQuery(source);
}
