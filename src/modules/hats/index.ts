import { QueryBase } from '@/common/query-base';
import hatData from '@/data/hats.json';
import { Hat } from '@/types';

const hatsData: Hat[] = hatData as Hat[];

/** Query builder for hat data. All sort methods return a new HatQuery for chaining. */
export class HatQuery extends QueryBase<Hat> {
  constructor(data: Hat[] = hatsData) {
    super(data);
  }

  sortByName(order: 'asc' | 'desc' = 'asc'): HatQuery {
    return new HatQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }
}

/** Returns a HatQuery for all hat data. Pass `source` to wrap a pre-filtered array. */
export function hats(source: Hat[] = hatsData): HatQuery {
  return new HatQuery(source);
}
