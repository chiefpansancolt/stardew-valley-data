import { QueryBase } from '@/common/query-base';
import villagerData from '@/data/villagers.json';
import { Season, Villager } from '@/types';

const villagersData: Villager[] = villagerData as Villager[];

/** Query builder for villager data. All filter and sort methods return a new VillagerQuery for chaining. */
export class VillagerQuery extends QueryBase<Villager> {
  constructor(data: Villager[] = villagersData) {
    super(data);
  }

  /** Filter to villagers who can be married or become roommates. */
  marriageable(): VillagerQuery {
    return new VillagerQuery(this.data.filter((v) => v.marriageable));
  }

  /** Filter to villagers with a birthday in the given season. Excludes `'ginger island'`. */
  byBirthdaySeason(season: Exclude<Season, 'ginger island'>): VillagerQuery {
    return new VillagerQuery(this.data.filter((v) => v.birthday.season === season));
  }

  /** Sort alphabetically by name. Default: `'asc'`. */
  sortByName(order: 'asc' | 'desc' = 'asc'): VillagerQuery {
    return new VillagerQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  /** Sort by birthday in calendar order (spring → winter, day 1 → 28). */
  sortByBirthday(): VillagerQuery {
    const seasonOrder: Record<string, number> = { spring: 0, summer: 1, fall: 2, winter: 3 };
    return new VillagerQuery(
      [...this.data].sort((a, b) => {
        const seasonDiff = seasonOrder[a.birthday.season] - seasonOrder[b.birthday.season];
        return seasonDiff !== 0 ? seasonDiff : a.birthday.day - b.birthday.day;
      }),
    );
  }
}

/** Returns a VillagerQuery for all villager data. Pass `source` to wrap a pre-filtered array. */
export function villagers(source: Villager[] = villagersData): VillagerQuery {
  return new VillagerQuery(source);
}
