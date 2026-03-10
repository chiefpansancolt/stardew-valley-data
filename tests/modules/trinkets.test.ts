import { TrinketQuery, trinkets } from '@/modules/trinkets';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('trinkets', () => trinkets());

describe('TrinketQuery filters', () => {
  it('forgeable() returns only forgeable trinkets', () => {
    const results = trinkets().forgeable().get();
    expect(results.length).toBeGreaterThan(0);
    for (const t of results) {
      expect(t.forgeable).toBe(true);
    }
  });

  it('bySource() filters by source', () => {
    const first = trinkets().first()!;
    const results = trinkets()
      .bySource(first.source as any)
      .get();
    expect(results.length).toBeGreaterThan(0);
    for (const t of results) {
      expect(t.source).toBe(first.source);
    }
  });
});

describe('TrinketQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = trinkets().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testFilterImmutability(
  'forgeable',
  () => trinkets(),
  (q) => (q as TrinketQuery).forgeable(),
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new TrinketQuery().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(trinkets().sortByName().count()).toBeGreaterThan(0);
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = trinkets().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});
