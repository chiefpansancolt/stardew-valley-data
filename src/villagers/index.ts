import villagerData from '@/data/villagers.json';
import { Villager } from '@/types';
import { Season } from '@/types';

const villagersData: Villager[] = villagerData as Villager[];

export class VillagerQuery {
  constructor(private data: Villager[] = villagersData) {}

  marriageable(): VillagerQuery {
    return new VillagerQuery(this.data.filter((v) => v.marriageable));
  }

  byBirthdaySeason(season: Exclude<Season, 'ginger island'>): VillagerQuery {
    return new VillagerQuery(this.data.filter((v) => v.birthday.season === season));
  }

  sortByName(order: 'asc' | 'desc' = 'asc'): VillagerQuery {
    return new VillagerQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  sortByBirthday(): VillagerQuery {
    const seasonOrder: Record<string, number> = { spring: 0, summer: 1, fall: 2, winter: 3 };
    return new VillagerQuery(
      [...this.data].sort((a, b) => {
        const seasonDiff = seasonOrder[a.birthday.season] - seasonOrder[b.birthday.season];
        return seasonDiff !== 0 ? seasonDiff : a.birthday.day - b.birthday.day;
      }),
    );
  }

  get(): Villager[] {
    return this.data;
  }

  first(): Villager | undefined {
    return this.data[0];
  }

  find(id: string): Villager | undefined {
    return this.data.find((v) => v.id === id);
  }

  findByName(name: string): Villager | undefined {
    const q = name.toLowerCase();
    return this.data.find((v) => v.name.toLowerCase() === q);
  }

  count(): number {
    return this.data.length;
  }
}

export function villagers(source: Villager[] = villagersData): VillagerQuery {
  return new VillagerQuery(source);
}
