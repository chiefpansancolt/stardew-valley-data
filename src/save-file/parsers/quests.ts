import type { SaveQuest } from '../types';
import { ensureArray, num, str } from './util';

/** Parse active quests from the player's quest log. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseQuests(questLog: any): SaveQuest[] {
  const result: SaveQuest[] = [];
  for (const quest of ensureArray(questLog?.Quest)) {
    const q = quest as Record<string, unknown>;
    result.push({
      id: str(q.id),
      title: str(q.questTitle),
      description: str(q._questDescription),
      type: num(q.questType),
      completed: q.completed === true || q.completed === 'true',
    });
  }
  return result;
}
