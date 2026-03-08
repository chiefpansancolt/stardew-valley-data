import { QueryBase } from '@/common/query-base';
import monsterLootData from '@/data/monster-loot.json';
import monsterData from '@/data/monsters.json';
import { Monster, MonsterLoot } from '@/types';

const monstersData: Monster[] = monsterData as Monster[];
const lootData: MonsterLoot[] = monsterLootData as MonsterLoot[];

/** Query builder for monster data. All filter and sort methods return a new MonsterQuery for chaining. */
export class MonsterQuery extends QueryBase<Monster> {
  constructor(data: Monster[] = monstersData) {
    super(data);
  }

  /** Filter to monsters that spawn in the given location (case-insensitive substring match). */
  byLocation(location: string): MonsterQuery {
    const q = location.toLowerCase();
    return new MonsterQuery(
      this.data.filter((m) => m.locations.some((l) => l.toLowerCase().includes(q))),
    );
  }

  /** Filter to monsters that drop the given loot item ID. */
  dropsLoot(lootId: string): MonsterQuery {
    return new MonsterQuery(this.data.filter((m) => m.lootIds.includes(lootId)));
  }

  /** Filter to Dangerous mode variants only. */
  dangerous(): MonsterQuery {
    return new MonsterQuery(this.data.filter((m) => m.dangerous));
  }

  /** Filter to standard (non-Dangerous) variants only. */
  standard(): MonsterQuery {
    return new MonsterQuery(this.data.filter((m) => !m.dangerous));
  }

  /** Sort by XP rewarded on kill. Default: `'desc'` (most XP first). */
  sortByXp(order: 'asc' | 'desc' = 'desc'): MonsterQuery {
    return new MonsterQuery(
      [...this.data].sort((a, b) => (order === 'desc' ? b.xp - a.xp : a.xp - b.xp)),
    );
  }

  /** Sort by max HP. Default: `'desc'` (tankiest first). */
  sortByHp(order: 'asc' | 'desc' = 'desc'): MonsterQuery {
    return new MonsterQuery(
      [...this.data].sort((a, b) => (order === 'desc' ? b.hp - a.hp : a.hp - b.hp)),
    );
  }
}

/** Query builder for monster loot data. Filter methods return a new MonsterLootQuery for chaining. */
export class MonsterLootQuery extends QueryBase<MonsterLoot> {
  constructor(data: MonsterLoot[] = lootData) {
    super(data);
  }

  /** Filter to loot items dropped by the given monster ID. */
  droppedBy(monsterId: string): MonsterLootQuery {
    return new MonsterLootQuery(this.data.filter((l) => l.droppedBy.includes(monsterId)));
  }
}

/** Returns a MonsterQuery for all monster data. Pass `source` to wrap a pre-filtered array. */
export function monsters(source: Monster[] = monstersData): MonsterQuery {
  return new MonsterQuery(source);
}

/** Returns a MonsterLootQuery for all monster loot data. Pass `source` to wrap a pre-filtered array. */
export function monsterLoot(source: MonsterLoot[] = lootData): MonsterLootQuery {
  return new MonsterLootQuery(source);
}
