import { QueryBase } from '@/common/query-base';

class TestQuery extends QueryBase<{ id: string; name: string }> {}

describe('QueryBase', () => {
  const items = [
    { id: '1', name: 'Alpha' },
    { id: '2', name: 'Beta' },
    { id: '3', name: 'Gamma' },
  ];

  describe('with populated data', () => {
    const query = new TestQuery(items);

    it('get() returns all items', () => {
      expect(query.get()).toEqual(items);
    });

    it('count() returns the number of items', () => {
      expect(query.count()).toBe(3);
    });

    it('first() returns the first item', () => {
      expect(query.first()).toBe(items[0]);
    });

    it('find() returns an item by exact ID', () => {
      expect(query.find('2')).toBe(items[1]);
    });

    it('find() returns undefined for missing ID', () => {
      expect(query.find('999')).toBeUndefined();
    });

    it('findByName() matches case-insensitively', () => {
      expect(query.findByName('alpha')).toBe(items[0]);
      expect(query.findByName('BETA')).toBe(items[1]);
      expect(query.findByName('GaMmA')).toBe(items[2]);
    });

    it('findByName() returns undefined for missing name', () => {
      expect(query.findByName('Delta')).toBeUndefined();
    });
  });

  describe('with empty data', () => {
    const query = new TestQuery([]);

    it('get() returns an empty array', () => {
      expect(query.get()).toEqual([]);
    });

    it('count() returns 0', () => {
      expect(query.count()).toBe(0);
    });

    it('first() returns undefined', () => {
      expect(query.first()).toBeUndefined();
    });

    it('find() returns undefined', () => {
      expect(query.find('1')).toBeUndefined();
    });

    it('findByName() returns undefined', () => {
      expect(query.findByName('Alpha')).toBeUndefined();
    });
  });

  describe('with single item', () => {
    const query = new TestQuery([{ id: '1', name: 'Solo' }]);

    it('count() returns 1', () => {
      expect(query.count()).toBe(1);
    });

    it('first() returns that item', () => {
      expect(query.first()).toEqual({ id: '1', name: 'Solo' });
    });
  });
});
