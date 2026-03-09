import { QueryBase } from '@/common/query-base';
import data from '@/data/special-items.json';
import { MasterySkill, SpecialItem, SpecialItemType } from '@/types';

const allSpecialItems: SpecialItem[] = data as SpecialItem[];

/** Query builder for Special Items & Powers data. All filter and sort methods return a new SpecialItemQuery for chaining. */
export class SpecialItemQuery extends QueryBase<SpecialItem> {
  constructor(data: SpecialItem[] = allSpecialItems) {
    super(data);
  }

  /** Filter to entries of the given type ("special-item", "book", "skill-book", or "mastery"). */
  byType(type: SpecialItemType): SpecialItemQuery {
    return new SpecialItemQuery(this.data.filter((s) => s.type === type));
  }

  /** Filter mastery items by associated skill. */
  bySkill(skill: MasterySkill): SpecialItemQuery {
    return new SpecialItemQuery(this.data.filter((s) => s.skill === skill));
  }

  /** Sort alphabetically by name. */
  sortByName(order: 'asc' | 'desc' = 'asc'): SpecialItemQuery {
    return new SpecialItemQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a SpecialItemQuery for all Special Items & Powers data. Pass `source` to wrap a pre-filtered array. */
export function specialItems(source: SpecialItem[] = allSpecialItems): SpecialItemQuery {
  return new SpecialItemQuery(source);
}
