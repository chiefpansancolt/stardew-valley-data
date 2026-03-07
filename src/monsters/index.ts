import monsterLootData from '@/data/monster-loot.json';
import monsterData from '@/data/monsters.json';
import { Monster, MonsterLoot } from '@/types';

const monstersData: Monster[] = monsterData as Monster[];
const lootData: MonsterLoot[] = monsterLootData as MonsterLoot[];

export class MonsterQuery {
  constructor(private data: Monster[] = monstersData) {}

  byLocation(location: string): MonsterQuery {
    const q = location.toLowerCase();
    return new MonsterQuery(
      this.data.filter((m) => m.locations.some((l) => l.toLowerCase().includes(q))),
    );
  }

  dropsLoot(lootId: string): MonsterQuery {
    return new MonsterQuery(this.data.filter((m) => m.lootIds.includes(lootId)));
  }

  dangerous(): MonsterQuery {
    return new MonsterQuery(this.data.filter((m) => m.dangerous));
  }

  standard(): MonsterQuery {
    return new MonsterQuery(this.data.filter((m) => !m.dangerous));
  }

  sortByXp(order: 'asc' | 'desc' = 'desc'): MonsterQuery {
    return new MonsterQuery(
      [...this.data].sort((a, b) => (order === 'desc' ? b.xp - a.xp : a.xp - b.xp)),
    );
  }

  sortByHp(order: 'asc' | 'desc' = 'desc'): MonsterQuery {
    return new MonsterQuery(
      [...this.data].sort((a, b) => (order === 'desc' ? b.hp - a.hp : a.hp - b.hp)),
    );
  }

  get(): Monster[] {
    return this.data;
  }

  first(): Monster | undefined {
    return this.data[0];
  }

  find(id: string): Monster | undefined {
    return this.data.find((m) => m.id === id);
  }

  findByName(name: string): Monster | undefined {
    return this.data.find((m) => m.name.toLowerCase() === name.toLowerCase());
  }

  count(): number {
    return this.data.length;
  }
}

export class MonsterLootQuery {
  constructor(private data: MonsterLoot[] = lootData) {}

  droppedBy(monsterId: string): MonsterLootQuery {
    return new MonsterLootQuery(this.data.filter((l) => l.droppedBy.includes(monsterId)));
  }

  get(): MonsterLoot[] {
    return this.data;
  }

  first(): MonsterLoot | undefined {
    return this.data[0];
  }

  find(id: string): MonsterLoot | undefined {
    return this.data.find((l) => l.id === id);
  }

  findByName(name: string): MonsterLoot | undefined {
    return this.data.find((l) => l.name.toLowerCase() === name.toLowerCase());
  }

  count(): number {
    return this.data.length;
  }
}

export function monsters(source: Monster[] = monstersData): MonsterQuery {
  return new MonsterQuery(source);
}

export function monsterLoot(source: MonsterLoot[] = lootData): MonsterLootQuery {
  return new MonsterLootQuery(source);
}
