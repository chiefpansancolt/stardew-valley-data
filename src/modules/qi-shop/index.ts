import { QueryBase } from '@/common/query-base';
import qiStockData from '@/data/qi-shop.json';
import { QiCurrency, QiStockItem } from '@/types';

const allQiStockData: QiStockItem[] = qiStockData as QiStockItem[];

/** Query builder for Qi's Walnut Room shop stock. All filter and sort methods return a new QiStockQuery for chaining. */
export class QiStockQuery extends QueryBase<QiStockItem> {
  constructor(data: QiStockItem[] = allQiStockData) {
    super(data);
  }

  /** Filter to items purchased with the given currency. */
  byCurrency(currency: QiCurrency): QiStockQuery {
    return new QiStockQuery(this.data.filter((item) => item.currency === currency));
  }

  /** Filter to recipe unlocks only. */
  recipes(): QiStockQuery {
    return new QiStockQuery(this.data.filter((item) => item.isRecipe));
  }

  /** Filter to non-recipe items only. */
  items(): QiStockQuery {
    return new QiStockQuery(this.data.filter((item) => !item.isRecipe));
  }

  /** Filter to items that are always available (no special availability condition). */
  alwaysAvailable(): QiStockQuery {
    return new QiStockQuery(this.data.filter((item) => item.availability === undefined));
  }

  /** Sort by cost ascending or descending. */
  sortByCost(order: 'asc' | 'desc' = 'asc'): QiStockQuery {
    return new QiStockQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.cost - b.cost : b.cost - a.cost)),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): QiStockQuery {
    return new QiStockQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a QiStockQuery for all items in Qi's Walnut Room shop. Pass `source` to wrap a pre-filtered array. */
export function qiStock(source: QiStockItem[] = allQiStockData): QiStockQuery {
  return new QiStockQuery(source);
}
