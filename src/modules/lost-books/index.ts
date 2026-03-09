import { QueryBase } from '@/common/query-base';
import lostBooksData from '@/data/lost-books.json';
import { LostBook } from '@/types';

const allLostBooks: LostBook[] = lostBooksData as LostBook[];

/** Query builder for Lost Books found in Stardew Valley. All filter and sort methods return a new LostBookQuery for chaining. */
export class LostBookQuery extends QueryBase<LostBook> {
  constructor(data: LostBook[] = allLostBooks) {
    super(data);
  }
}

/** Returns a LostBookQuery for all Lost Books. Pass `source` to wrap a pre-filtered array. */
export function lostBooks(source: LostBook[] = allLostBooks): LostBookQuery {
  return new LostBookQuery(source);
}
