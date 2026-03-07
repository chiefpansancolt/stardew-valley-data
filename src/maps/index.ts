import data from '@/data/maps.json';
import { FarmMap } from '@/types';

const mapData: FarmMap[] = data as FarmMap[];

export class FarmMapQuery {
  constructor(private data: FarmMap[] = mapData) {}

  bySkill(skill: string): FarmMapQuery {
    return new FarmMapQuery(
      this.data.filter((m) => m.skills.some((s) => s.toLowerCase() === skill.toLowerCase())),
    );
  }

  find(id: string): FarmMap | undefined {
    return this.data.find((m) => m.id === id);
  }

  findByName(name: string): FarmMap | undefined {
    return this.data.find((m) => m.name.toLowerCase() === name.toLowerCase());
  }

  get(): FarmMap[] {
    return this.data;
  }

  first(): FarmMap | undefined {
    return this.data[0];
  }

  count(): number {
    return this.data.length;
  }
}

export function maps(source: FarmMap[] = mapData): FarmMapQuery {
  return new FarmMapQuery(source);
}
