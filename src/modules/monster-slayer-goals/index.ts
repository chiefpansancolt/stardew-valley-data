import { QueryBase } from '@/common/query-base';
import goalData from '@/data/monster-slayer-goals.json';
import { MonsterSlayerGoal } from '@/types';

const monsterSlayerGoalData: MonsterSlayerGoal[] = goalData as MonsterSlayerGoal[];

/** Query builder for monster slayer goal data. All filter and sort methods return a new MonsterSlayerGoalQuery for chaining. */
export class MonsterSlayerGoalQuery extends QueryBase<MonsterSlayerGoal> {
  constructor(data: MonsterSlayerGoal[] = monsterSlayerGoalData) {
    super(data);
  }

  /** Sort by kill target. Default: `'asc'` (easiest first). */
  sortByKillTarget(order: 'asc' | 'desc' = 'asc'): MonsterSlayerGoalQuery {
    return new MonsterSlayerGoalQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.killTarget - b.killTarget : b.killTarget - a.killTarget,
      ),
    );
  }
}

/** Returns a MonsterSlayerGoalQuery for all monster slayer goal data. Pass `source` to wrap a pre-filtered array. */
export function monsterSlayerGoals(
  source: MonsterSlayerGoal[] = monsterSlayerGoalData,
): MonsterSlayerGoalQuery {
  return new MonsterSlayerGoalQuery(source);
}
