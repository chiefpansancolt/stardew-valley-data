import { QueryBase } from '@/common/query-base';
import data from '@/data/bookseller-shop.json';
import { BooksellerAvailability, BooksellerItem, BooksellerTrade } from '@/types';

const allItems: BooksellerItem[] = data.items as BooksellerItem[];
const allTrades: BooksellerTrade[] = data.trades as BooksellerTrade[];

/** Query builder for Bookseller shop item data. All filter and sort methods return a new BooksellerItemQuery for chaining. */
export class BooksellerItemQuery extends QueryBase<BooksellerItem> {
  constructor(data: BooksellerItem[] = allItems) {
    super(data);
  }

  /** Filter to items with the given availability. */
  byAvailability(availability: BooksellerAvailability): BooksellerItemQuery {
    return new BooksellerItemQuery(this.data.filter((i) => i.availability === availability));
  }

  /** Filter to items always in stock. */
  alwaysAvailable(): BooksellerItemQuery {
    return this.byAvailability('always');
  }

  /** Sort by price ascending or descending. */
  sortByPrice(order: 'asc' | 'desc' = 'asc'): BooksellerItemQuery {
    return new BooksellerItemQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price)),
    );
  }

  /** Sort alphabetically by name. */
  sortByName(order: 'asc' | 'desc' = 'asc'): BooksellerItemQuery {
    return new BooksellerItemQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Accessor for Bookseller trade-in data. */
export class BooksellerTradeQuery {
  constructor(private readonly data: BooksellerTrade[] = allTrades) {}

  /** All trade-in offers. */
  get(): BooksellerTrade[] {
    return this.data;
  }

  /** Number of trade-in offers. */
  count(): number {
    return this.data.length;
  }

  /** Find a trade-in offer by the book ID being traded. */
  findByBookId(bookId: string): BooksellerTrade | undefined {
    return this.data.find((t) => t.bookId === bookId);
  }
}

/** Returns a BooksellerItemQuery for all Bookseller shop items. Pass `source` to wrap a pre-filtered array. */
export function booksellerShop(source: BooksellerItem[] = allItems): BooksellerItemQuery {
  return new BooksellerItemQuery(source);
}

/** Returns a BooksellerTradeQuery for all Bookseller trade-in offers. Pass `source` to wrap a pre-filtered array. */
export function booksellerTrades(source: BooksellerTrade[] = allTrades): BooksellerTradeQuery {
  return new BooksellerTradeQuery(source);
}
