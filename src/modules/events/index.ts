import { QueryBase } from '@/common/query-base';
import eventData from '@/data/events.json';
import { GameEvent } from '@/types';

const allEvents: GameEvent[] = eventData.map((e) => ({
  ...e,
  name: `${e.villager} ${e.hearts}-Heart`,
}));

/**
 * Query builder for heart event data. All filter and sort methods return a new EventQuery for chaining.
 * Each event has a generated `name` field in the format "Villager N-Heart" for QueryBase compatibility.
 */
export class EventQuery extends QueryBase<GameEvent> {
  constructor(data: GameEvent[] = allEvents) {
    super(data);
  }

  /** Filter by villager name (case-insensitive exact match). */
  byVillager(villager: string): EventQuery {
    const q = villager.toLowerCase();
    return new EventQuery(this.data.filter((e) => e.villager.toLowerCase() === q));
  }

  /** Filter by heart level. */
  byHearts(hearts: number): EventQuery {
    return new EventQuery(this.data.filter((e) => e.hearts === hearts));
  }

  /** Filter to only marriage candidate events (hearts 2, 4, 6, 8, 10, 14). */
  marriageEvents(): EventQuery {
    const marriageHearts = [2, 4, 6, 8, 10, 14];
    return new EventQuery(this.data.filter((e) => marriageHearts.includes(e.hearts)));
  }

  /** Sort by heart level. */
  sortByHearts(order: 'asc' | 'desc' = 'asc'): EventQuery {
    const sorted = [...this.data].sort((a, b) => a.hearts - b.hearts);
    return new EventQuery(order === 'desc' ? sorted.reverse() : sorted);
  }

  /** Sort alphabetically by villager name. */
  sortByVillager(order: 'asc' | 'desc' = 'asc'): EventQuery {
    const sorted = [...this.data].sort((a, b) => a.villager.localeCompare(b.villager));
    return new EventQuery(order === 'desc' ? sorted.reverse() : sorted);
  }
}

/** Returns an EventQuery for all heart event data. Pass `source` to wrap a pre-filtered array. */
export function events(source?: GameEvent[]): EventQuery {
  return new EventQuery(source ?? allEvents);
}
