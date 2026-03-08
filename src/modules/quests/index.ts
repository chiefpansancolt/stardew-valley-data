import { QueryBase } from '@/common/query-base';
import questData from '@/data/quests.json';
import { Quest, QuestType } from '@/types';

const questsData: Quest[] = questData as Quest[];

/**
 * Query builder for quest data (story quests, special orders, Qi special orders).
 * All filter and sort methods return a new QuestQuery for chaining.
 */
export class QuestQuery extends QueryBase<Quest> {
  constructor(data: Quest[] = questsData) {
    super(data);
  }

  /** Filter by quest type (`'story'`, `'special-order'`, or `'qi-special-order'`). */
  byType(type: QuestType): QuestQuery {
    return new QuestQuery(this.data.filter((q) => q.type === type));
  }

  /** Filter to repeatable special orders. Only applies to `type === 'special-order'` quests. */
  repeatable(): QuestQuery {
    return new QuestQuery(this.data.filter((q) => q.type === 'special-order' && q.repeatable));
  }

  /** Sort alphabetically by name. Default: `'asc'`. */
  sortByName(order: 'asc' | 'desc' = 'asc'): QuestQuery {
    return new QuestQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }
}

/** Returns a QuestQuery for all quest data. Pass `source` to wrap a pre-filtered array. */
export function quests(source: Quest[] = questsData): QuestQuery {
  return new QuestQuery(source);
}
