import { QueryBase } from '@/common/query-base';
import islandTraderData from '@/data/island-trader-shop.json';
import { IslandTraderDay, IslandTraderItem } from '@/types';

const allIslandTraderData: IslandTraderItem[] = islandTraderData as IslandTraderItem[];

/** Query builder for the Island Trader's barter stock. Items are traded for goods rather than gold. All filter and sort methods return a new IslandTraderQuery for chaining. */
export class IslandTraderQuery extends QueryBase<IslandTraderItem> {
  constructor(data: IslandTraderItem[] = allIslandTraderData) {
    super(data);
  }

  /** Filter to items always in stock (no day restriction and no special availability). */
  permanent(): IslandTraderQuery {
    return new IslandTraderQuery(
      this.data.filter((item) => item.day === undefined && item.availability === undefined),
    );
  }

  /** Filter to day-specific rotating items only. */
  daily(): IslandTraderQuery {
    return new IslandTraderQuery(this.data.filter((item) => item.day !== undefined));
  }

  /** Filter to all items available on the given day (permanent + that day's item). */
  byDay(day: IslandTraderDay): IslandTraderQuery {
    return new IslandTraderQuery(
      this.data.filter((item) => item.day === undefined || item.day === day),
    );
  }

  /** Filter to recipe items only. */
  recipes(): IslandTraderQuery {
    return new IslandTraderQuery(this.data.filter((item) => item.isRecipe === true));
  }

  /** Filter to items traded for the specified trade item (by item ID). */
  byTradeItem(tradeItemId: string): IslandTraderQuery {
    return new IslandTraderQuery(this.data.filter((item) => item.tradeItemId === tradeItemId));
  }

  /** Filter to items with no special availability condition. */
  alwaysAvailable(): IslandTraderQuery {
    return new IslandTraderQuery(this.data.filter((item) => item.availability === undefined));
  }

  /** Sort by trade amount ascending or descending. */
  sortByTradeAmount(order: 'asc' | 'desc' = 'asc'): IslandTraderQuery {
    return new IslandTraderQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.tradeAmount - b.tradeAmount : b.tradeAmount - a.tradeAmount,
      ),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): IslandTraderQuery {
    return new IslandTraderQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns an IslandTraderQuery for all barter trades at the Island Trader. Pass `source` to wrap a pre-filtered array. */
export function islandTrader(source: IslandTraderItem[] = allIslandTraderData): IslandTraderQuery {
  return new IslandTraderQuery(source);
}
