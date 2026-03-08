import { QueryBase } from '@/common/query-base';
import mineralData from '@/data/minerals.json';
import {
  BarItem,
  GeodeContainer,
  Mineral,
  MineralItem,
  NodeItem,
  OreItem,
  ResourceItem,
} from '@/types';

const allMineralData: Mineral[] = mineralData as Mineral[];

/**
 * Query builder for mineral data (gems, geode minerals, foraged crystals, and geode containers).
 * Use mineralItems() / geodes() to narrow to specific variants.
 * All filter and sort methods return a new MineralQuery for chaining.
 */
export class MineralQuery extends QueryBase<Mineral> {
  constructor(data: Mineral[] = allMineralData) {
    super(data);
  }

  /** Filter to donatable minerals only (excludes geode containers). */
  mineralItems(): MineralQuery {
    return new MineralQuery(this.data.filter((m): m is MineralItem => m.kind === 'mineral'));
  }

  /** Filter to geode containers only (Geode, Frozen Geode, Magma Geode, Omni Geode). */
  geodes(): MineralQuery {
    return new MineralQuery(this.data.filter((m): m is GeodeContainer => m.kind === 'geode'));
  }

  /** Filter to ore items only (Copper Ore, Iron Ore, Gold Ore, Iridium Ore, Radioactive Ore). */
  ores(): MineralQuery {
    return new MineralQuery(this.data.filter((m): m is OreItem => m.kind === 'ore'));
  }

  /** Filter to smelted bar items only (Copper Bar, Iron Bar, Gold Bar, Iridium Bar, Radioactive Bar, Refined Quartz). */
  bars(): MineralQuery {
    return new MineralQuery(this.data.filter((m): m is BarItem => m.kind === 'bar'));
  }

  /** Filter to mining node entries only. */
  nodes(): MineralQuery {
    return new MineralQuery(this.data.filter((m): m is NodeItem => m.kind === 'node'));
  }

  /** Filter to resource items (Coal and similar raw materials). */
  resources(): MineralQuery {
    return new MineralQuery(this.data.filter((m): m is ResourceItem => m.kind === 'resource'));
  }

  /** Filter to minerals found in a specific geode type (e.g. 'Frozen Geode'). */
  fromGeode(geodeType: string): MineralQuery {
    return new MineralQuery(
      this.data.filter(
        (m): m is MineralItem | GeodeContainer | OreItem | NodeItem | ResourceItem =>
          m.kind !== 'bar' &&
          m.locations.some((l) => l.toLowerCase().includes(geodeType.toLowerCase())),
      ),
    );
  }

  /** Sort alphabetically by name. Default: 'asc'. */
  sortByName(order: 'asc' | 'desc' = 'asc'): MineralQuery {
    return new MineralQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  /** Sort by sell price. Default: 'desc' (highest first). Items without a sell price (nodes) sort as 0. */
  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): MineralQuery {
    return new MineralQuery(
      [...this.data].sort((a, b) => {
        const aPrice = 'sellPrice' in a ? a.sellPrice : 0;
        const bPrice = 'sellPrice' in b ? b.sellPrice : 0;
        return order === 'asc' ? aPrice - bPrice : bPrice - aPrice;
      }),
    );
  }
}

/** Returns a MineralQuery for all mineral data. Pass `source` to wrap a pre-filtered array. */
export function minerals(source: Mineral[] = allMineralData): MineralQuery {
  return new MineralQuery(source);
}
