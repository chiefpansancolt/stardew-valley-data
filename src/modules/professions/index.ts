import { QueryBase } from '@/common/query-base';
import professionData from '@/data/professions.json';
import { ProfessionData, ProfessionSkill } from '@/types';

const allProfessions: ProfessionData[] = professionData as ProfessionData[];

/** Query builder for Profession data. All filter and sort methods return a new ProfessionQuery for chaining. */
export class ProfessionQuery extends QueryBase<ProfessionData> {
  constructor(data: ProfessionData[] = allProfessions) {
    super(data);
  }

  /** Filter by skill name. */
  bySkill(skill: ProfessionSkill): ProfessionQuery {
    return new ProfessionQuery(this.data.filter((p) => p.skill === skill));
  }

  /** Filter by level (5 or 10). */
  byLevel(level: 5 | 10): ProfessionQuery {
    return new ProfessionQuery(this.data.filter((p) => p.level === level));
  }

  /** Filter to professions that branch from a given parent profession ID. */
  byParent(parentId: string): ProfessionQuery {
    return new ProfessionQuery(this.data.filter((p) => p.parentProfession === parentId));
  }

  /** Sort alphabetically by name. */
  sortByName(order: 'asc' | 'desc' = 'asc'): ProfessionQuery {
    const sorted = [...this.data].sort((a, b) => a.name.localeCompare(b.name));
    return new ProfessionQuery(order === 'desc' ? sorted.reverse() : sorted);
  }
}

/** Returns a ProfessionQuery for all Profession data. Pass `source` to wrap a pre-filtered array. */
export function professions(source: ProfessionData[] = allProfessions): ProfessionQuery {
  return new ProfessionQuery(source);
}
