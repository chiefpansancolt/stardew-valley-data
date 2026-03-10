import {
  BooksellerItemQuery,
  booksellerShop,
  BooksellerTradeQuery,
  booksellerTrades,
} from '@/modules/bookseller-shop';
import { testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('BooksellerItemQuery constructor uses default data when called without args', () => {
    const query = new BooksellerItemQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('BooksellerTradeQuery constructor uses default data when called without args', () => {
    const query = new BooksellerTradeQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByPrice() uses default order (asc)', () => {
    const sorted = booksellerShop().sortByPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByPrice desc has highest first', () => {
    const sorted = booksellerShop().sortByPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeGreaterThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName() uses default order (asc)', () => {
    const sorted = booksellerShop().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testQueryBaseContract('booksellerShop', () => booksellerShop());

describe('BooksellerItemQuery filters', () => {
  it('alwaysAvailable() returns items with always availability', () => {
    const always = booksellerShop().alwaysAvailable().get();
    expect(always.length).toBeGreaterThan(0);
    for (const item of always) {
      expect(item.availability).toBe('always');
    }
  });
});

describe('BooksellerItemQuery sorts', () => {
  it('sortByPrice asc has lowest first', () => {
    const sorted = booksellerShop().sortByPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName asc is alphabetical', () => {
    const sorted = booksellerShop().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = booksellerShop().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('BooksellerTradeQuery', () => {
  it('get() returns trade-in offers', () => {
    const trades = booksellerTrades().get();
    expect(trades.length).toBeGreaterThan(0);
  });

  it('count() matches get().length', () => {
    const q = booksellerTrades();
    expect(q.count()).toBe(q.get().length);
  });

  it('findByBookId() locates a trade by book ID', () => {
    const first = booksellerTrades().get()[0];
    const found = booksellerTrades().findByBookId(first.bookId);
    expect(found).toEqual(first);
  });
});
