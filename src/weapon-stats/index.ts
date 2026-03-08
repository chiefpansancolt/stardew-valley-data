import weaponStatData from '@/data/weapon-stats.json';
import { WeaponStat } from '@/types';

const weaponStatsData: WeaponStat[] = weaponStatData as WeaponStat[];

export class WeaponStatQuery {
  constructor(private data: WeaponStat[] = weaponStatsData) {}

  sortByName(order: 'asc' | 'desc' = 'asc'): WeaponStatQuery {
    return new WeaponStatQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  get(): WeaponStat[] {
    return this.data;
  }

  first(): WeaponStat | undefined {
    return this.data[0];
  }

  find(id: string): WeaponStat | undefined {
    return this.data.find((s) => s.id === id);
  }

  findByName(name: string): WeaponStat | undefined {
    const q = name.toLowerCase();
    return this.data.find((s) => s.name.toLowerCase() === q);
  }

  count(): number {
    return this.data.length;
  }
}

export function weaponStats(source: WeaponStat[] = weaponStatsData): WeaponStatQuery {
  return new WeaponStatQuery(source);
}
