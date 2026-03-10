import { QueryBase } from '@/common/query-base';

/**
 * Standard assertions every QueryBase subclass should pass.
 * Call from each module's test file with the factory function.
 */
export function testQueryBaseContract<T extends { id: string; name: string }>(
  factoryName: string,
  factory: () => QueryBase<T>,
) {
  describe(`${factoryName} — QueryBase contract`, () => {
    it('get() returns a non-empty array', () => {
      const results = factory().get();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
    });

    it('count() matches get().length', () => {
      const query = factory();
      expect(query.count()).toBe(query.get().length);
    });

    it('first() returns the first element of get()', () => {
      const query = factory();
      expect(query.first()).toBe(query.get()[0]);
    });

    it('find() locates an item by ID', () => {
      const item = factory().first()!;
      expect(factory().find(item.id)).toEqual(item);
    });

    it('find() returns undefined for non-existent ID', () => {
      expect(factory().find('__nonexistent__')).toBeUndefined();
    });

    it('findByName() is case-insensitive', () => {
      const item = factory().first()!;
      expect(factory().findByName(item.name.toUpperCase())).toEqual(item);
      expect(factory().findByName(item.name.toLowerCase())).toEqual(item);
    });

    it('findByName() returns undefined for non-existent name', () => {
      expect(factory().findByName('__nonexistent__')).toBeUndefined();
    });
  });
}

/**
 * Assert that a filter method returns a new query (immutability)
 * and that results are a subset of the original.
 */
export function testFilterImmutability<T extends { id: string; name: string }>(
  description: string,
  factory: () => QueryBase<T>,
  filterFn: (query: QueryBase<T>) => QueryBase<T>,
) {
  describe(`${description} — immutability`, () => {
    it('returns a new query instance', () => {
      const original = factory();
      const filtered = filterFn(original);
      expect(filtered).not.toBe(original);
    });

    it('does not mutate the original query', () => {
      const original = factory();
      const originalCount = original.count();
      filterFn(original);
      expect(original.count()).toBe(originalCount);
    });

    it('filtered results are a subset of original', () => {
      const originalIds = new Set(
        factory()
          .get()
          .map((i) => i.id),
      );
      const filteredIds = filterFn(factory())
        .get()
        .map((i) => i.id);
      for (const id of filteredIds) {
        expect(originalIds.has(id)).toBe(true);
      }
    });
  });
}
