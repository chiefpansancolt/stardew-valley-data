import { QueryBase } from '@/common/query-base';
import desertTraderData from '@/data/desert-trader.json';
import { DesertTraderDay, DesertTraderItem } from '@/types';

const allDesertTraderData: DesertTraderItem[] = desertTraderData as DesertTraderItem[];

/** Query builder for the Desert Trader's barter stock. Items are traded for goods rather than gold. All filter and sort methods return a new DesertTraderQuery for chaining. */
export class DesertTraderQuery extends QueryBase<DesertTraderItem> {
  constructor(data: DesertTraderItem[] = allDesertTraderData) {
    super(data);
  }

  /** Filter to items always in stock (no day restriction). */
  permanent(): DesertTraderQuery {
    return new DesertTraderQuery(this.data.filter((item) => item.day === undefined));
  }

  /** Filter to day-specific rotating items only. */
  daily(): DesertTraderQuery {
    return new DesertTraderQuery(this.data.filter((item) => item.day !== undefined));
  }

  /** Filter to all items available on the given day (permanent + that day's item). */
  byDay(day: DesertTraderDay): DesertTraderQuery {
    return new DesertTraderQuery(
      this.data.filter((item) => item.day === undefined || item.day === day),
    );
  }

  /** Filter to recipe items only. */
  recipes(): DesertTraderQuery {
    return new DesertTraderQuery(this.data.filter((item) => item.isRecipe === true));
  }

  /** Filter to items traded for the specified trade item (by item ID). */
  byTradeItem(tradeItemId: string): DesertTraderQuery {
    return new DesertTraderQuery(this.data.filter((item) => item.tradeItemId === tradeItemId));
  }

  /** Filter to items with no special availability condition. */
  alwaysAvailable(): DesertTraderQuery {
    return new DesertTraderQuery(this.data.filter((item) => item.availability === undefined));
  }

  /** Sort by trade amount ascending or descending. */
  sortByTradeAmount(order: 'asc' | 'desc' = 'asc'): DesertTraderQuery {
    return new DesertTraderQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.tradeAmount - b.tradeAmount : b.tradeAmount - a.tradeAmount,
      ),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): DesertTraderQuery {
    return new DesertTraderQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a DesertTraderQuery for all barter trades at the Desert Trader. Pass `source` to wrap a pre-filtered array. */
export function desertTrader(source: DesertTraderItem[] = allDesertTraderData): DesertTraderQuery {
  return new DesertTraderQuery(source);
}
