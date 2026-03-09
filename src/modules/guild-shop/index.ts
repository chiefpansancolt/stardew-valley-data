import { QueryBase } from '@/common/query-base';
import guildData from '@/data/guild-shop.json';
import { GuildCategory, GuildItem, GuildWeaponType } from '@/types';

const allGuildData: GuildItem[] = guildData as GuildItem[];

/** Query builder for the Adventurer's Guild shop stock. All filter and sort methods return a new GuildQuery for chaining. */
export class GuildQuery extends QueryBase<GuildItem> {
  constructor(data: GuildItem[] = allGuildData) {
    super(data);
  }

  /** Filter to weapons only. */
  weapons(): GuildQuery {
    return new GuildQuery(this.data.filter((item) => item.category === 'weapon'));
  }

  /** Filter to boots only. */
  boots(): GuildQuery {
    return new GuildQuery(this.data.filter((item) => item.category === 'boots'));
  }

  /** Filter to rings only. */
  rings(): GuildQuery {
    return new GuildQuery(this.data.filter((item) => item.category === 'ring'));
  }

  /** Filter to slingshots only. */
  slingshots(): GuildQuery {
    return new GuildQuery(this.data.filter((item) => item.category === 'slingshot'));
  }

  /** Filter to items in the given category. */
  byCategory(category: GuildCategory): GuildQuery {
    return new GuildQuery(this.data.filter((item) => item.category === category));
  }

  /** Filter weapons by weapon type (sword, dagger, or club). */
  byWeaponType(type: GuildWeaponType): GuildQuery {
    return new GuildQuery(this.data.filter((item) => item.weaponType === type));
  }

  /** Filter to items that unlock at or below the given mine level. */
  byMineLevel(level: number): GuildQuery {
    return new GuildQuery(
      this.data.filter((item) => item.mineLevel === undefined || item.mineLevel <= level),
    );
  }

  /** Filter to items with no special purchase condition. */
  alwaysAvailable(): GuildQuery {
    return new GuildQuery(this.data.filter((item) => item.availability === undefined));
  }

  /** Sort by price ascending or descending. */
  sortByPrice(order: 'asc' | 'desc' = 'asc'): GuildQuery {
    return new GuildQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price)),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): GuildQuery {
    return new GuildQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }

  /** Sort by mine level required (ascending by default). */
  sortByMineLevel(order: 'asc' | 'desc' = 'asc'): GuildQuery {
    return new GuildQuery(
      [...this.data].sort((a, b) => {
        const la = a.mineLevel ?? 0;
        const lb = b.mineLevel ?? 0;
        return order === 'asc' ? la - lb : lb - la;
      }),
    );
  }
}

/** Returns a GuildQuery for all items sold at the Adventurer's Guild. Pass `source` to wrap a pre-filtered array. */
export function guild(source: GuildItem[] = allGuildData): GuildQuery {
  return new GuildQuery(source);
}
