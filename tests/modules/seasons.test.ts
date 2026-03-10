import { findFestival, SeasonQuery, seasons } from '@/modules/seasons';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('seasons', () => seasons());

describe('SeasonQuery filters', () => {
  it('withFestivals() returns seasons that have festivals', () => {
    const result = seasons().withFestivals().get();
    expect(result.length).toBeGreaterThan(0);
    for (const s of result) {
      expect(s.festivals.length).toBeGreaterThan(0);
    }
  });
});

describe('findFestival()', () => {
  it('finds a festival by name substring', () => {
    const results = findFestival('egg');
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) {
      expect(r.festival.name.toLowerCase()).toContain('egg');
    }
  });

  it('returns empty array for non-existent festival', () => {
    expect(findFestival('__nonexistent__')).toEqual([]);
  });
});

testFilterImmutability(
  'withFestivals',
  () => seasons(),
  (q) => (q as SeasonQuery).withFestivals(),
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new SeasonQuery().count()).toBeGreaterThan(0);
  });
});
