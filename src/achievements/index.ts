import achievementData from '@/data/achievements.json';
import { Achievement } from '@/types';

const achievementsData: Achievement[] = achievementData as Achievement[];

export class AchievementQuery {
  constructor(private data: Achievement[] = achievementsData) {}

  secret(): AchievementQuery {
    return new AchievementQuery(this.data.filter((a) => a.secret));
  }

  inGame(): AchievementQuery {
    return new AchievementQuery(this.data.filter((a) => a.icon !== null));
  }

  withReward(): AchievementQuery {
    return new AchievementQuery(this.data.filter((a) => a.reward !== null));
  }

  sortByName(order: 'asc' | 'desc' = 'asc'): AchievementQuery {
    return new AchievementQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  get(): Achievement[] {
    return this.data;
  }

  first(): Achievement | undefined {
    return this.data[0];
  }

  find(id: string): Achievement | undefined {
    return this.data.find((a) => a.id === id);
  }

  findByName(name: string): Achievement | undefined {
    const q = name.toLowerCase();
    return this.data.find((a) => a.name.toLowerCase() === q);
  }

  count(): number {
    return this.data.length;
  }
}

export function achievements(source: Achievement[] = achievementsData): AchievementQuery {
  return new AchievementQuery(source);
}
