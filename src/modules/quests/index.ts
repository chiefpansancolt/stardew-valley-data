import { QueryBase } from '@/common/query-base';
import questData from '@/data/quests.json';
import { Quest } from '@/types';

const questsData: Quest[] = questData as Quest[];

/** Query builder for quest data. All filter and sort methods return a new QuestQuery for chaining. */
export class QuestQuery extends QueryBase<Quest> {
  constructor(data: Quest[] = questsData) {
    super(data);
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
