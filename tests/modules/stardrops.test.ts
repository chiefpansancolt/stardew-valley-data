import { StarDropQuery, starDrops } from '@/modules/stardrops';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('starDrops', () => starDrops());

describe('StarDropQuery filters', () => {
  it('bySource() filters by source category', () => {
    const first = starDrops().first()!;
    const results = starDrops()
      .bySource(first.source as any)
      .get();
    expect(results.length).toBeGreaterThan(0);
    for (const s of results) {
      expect(s.source).toBe(first.source);
    }
  });
});

describe('StarDropQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = starDrops().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testFilterImmutability(
  'bySource',
  () => starDrops(),
  (q) => {
    const src = starDrops().first()!.source;
    return (q as StarDropQuery).bySource(src as any);
  },
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new StarDropQuery().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(starDrops().sortByName().count()).toBeGreaterThan(0);
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = starDrops().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});
