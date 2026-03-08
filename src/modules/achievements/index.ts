import { QueryBase } from '@/common/query-base';
import achievementData from '@/data/achievements.json';
import { Achievement } from '@/types';

const achievementsData: Achievement[] = achievementData as Achievement[];

/** Query builder for achievement data. All filter and sort methods return a new AchievementQuery for chaining. */
export class AchievementQuery extends QueryBase<Achievement> {
  constructor(data: Achievement[] = achievementsData) {
    super(data);
  }

  /** Filter to secret achievements (hidden until unlocked). */
  secret(): AchievementQuery {
    return new AchievementQuery(this.data.filter((a) => a.secret));
  }

  /**
   * Filter to in-game achievements (those with an in-game icon).
   * Excludes platform-only achievements that only appear in Steam/GOG.
   */
  inGame(): AchievementQuery {
    return new AchievementQuery(this.data.filter((a) => a.icon !== null));
  }

  /** Filter to achievements that grant an in-game reward (hat, title, etc.). */
  withReward(): AchievementQuery {
    return new AchievementQuery(this.data.filter((a) => a.reward !== null));
  }

  /** Sort alphabetically by name. Default: `'asc'`. */
  sortByName(order: 'asc' | 'desc' = 'asc'): AchievementQuery {
    return new AchievementQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }
}

/** Returns an AchievementQuery for all achievement data. Pass `source` to wrap a pre-filtered array. */
export function achievements(source: Achievement[] = achievementsData): AchievementQuery {
  return new AchievementQuery(source);
}
