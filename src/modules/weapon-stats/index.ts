import { QueryBase } from '@/common/query-base';
import weaponStatData from '@/data/weapon-stats.json';
import { WeaponStat } from '@/types';

const weaponStatsData: WeaponStat[] = weaponStatData as WeaponStat[];

/** Query builder for weapon stat data (Speed, Defense, Weight, Crit. Chance, Crit. Power). All sort methods return a new WeaponStatQuery for chaining. */
export class WeaponStatQuery extends QueryBase<WeaponStat> {
  constructor(data: WeaponStat[] = weaponStatsData) {
    super(data);
  }

  /** Sort alphabetically by name. Default: `'asc'`. */
  sortByName(order: 'asc' | 'desc' = 'asc'): WeaponStatQuery {
    return new WeaponStatQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }
}

/** Returns a WeaponStatQuery for all weapon stat data. Pass `source` to wrap a pre-filtered array. */
export function weaponStats(source: WeaponStat[] = weaponStatsData): WeaponStatQuery {
  return new WeaponStatQuery(source);
}
