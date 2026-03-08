import { QueryBase } from '@/common/query-base';
import data from '@/data/maps.json';
import { FarmMap } from '@/types';

const mapData: FarmMap[] = data as FarmMap[];

/** Query builder for farm map data. All filter methods return a new FarmMapQuery for chaining. */
export class FarmMapQuery extends QueryBase<FarmMap> {
  constructor(data: FarmMap[] = mapData) {
    super(data);
  }

  bySkill(skill: string): FarmMapQuery {
    return new FarmMapQuery(
      this.data.filter((m) => m.skills.some((s) => s.toLowerCase() === skill.toLowerCase())),
    );
  }
}

/** Returns a FarmMapQuery for all farm map data. Pass `source` to wrap a pre-filtered array. */
export function maps(source: FarmMap[] = mapData): FarmMapQuery {
  return new FarmMapQuery(source);
}
