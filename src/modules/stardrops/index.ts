import { QueryBase } from '@/common/query-base';
import starDropsData from '@/data/stardrops.json';
import { StarDrop, StarDropSource } from '@/types';

const allStarDrops: StarDrop[] = starDropsData as StarDrop[];

/** Query builder for StarDrop data. All filter and sort methods return a new StarDropQuery for chaining. */
export class StarDropQuery extends QueryBase<StarDrop> {
  constructor(data: StarDrop[] = allStarDrops) {
    super(data);
  }

  /** Filter by acquisition source category. */
  bySource(source: StarDropSource): StarDropQuery {
    return new StarDropQuery(this.data.filter((s) => s.source === source));
  }

  /** Sort alphabetically by name. */
  sortByName(order: 'asc' | 'desc' = 'asc'): StarDropQuery {
    const sorted = [...this.data].sort((a, b) => a.name.localeCompare(b.name));
    return new StarDropQuery(order === 'desc' ? sorted.reverse() : sorted);
  }
}

/** Returns a StarDropQuery for all StarDrops. Pass `source` to wrap a pre-filtered array. */
export function starDrops(source: StarDrop[] = allStarDrops): StarDropQuery {
  return new StarDropQuery(source);
}
