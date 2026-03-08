import questData from '@/data/quests.json';
import { Quest, QuestType } from '@/types';

const questsData: Quest[] = questData as Quest[];

export class QuestQuery {
  constructor(private data: Quest[] = questsData) {}

  byType(type: QuestType): QuestQuery {
    return new QuestQuery(this.data.filter((q) => q.type === type));
  }

  repeatable(): QuestQuery {
    return new QuestQuery(this.data.filter((q) => q.type === 'special-order' && q.repeatable));
  }

  sortByName(order: 'asc' | 'desc' = 'asc'): QuestQuery {
    return new QuestQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  get(): Quest[] {
    return this.data;
  }

  first(): Quest | undefined {
    return this.data[0];
  }

  find(id: string): Quest | undefined {
    return this.data.find((q) => q.id === id);
  }

  findByName(name: string): Quest | undefined {
    const q = name.toLowerCase();
    return this.data.find((quest) => quest.name.toLowerCase() === q);
  }

  count(): number {
    return this.data.length;
  }
}

export function quests(source: Quest[] = questsData): QuestQuery {
  return new QuestQuery(source);
}
