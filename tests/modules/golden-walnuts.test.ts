import { GoldenWalnutQuery, goldenWalnuts } from '@/modules/golden-walnuts';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('goldenWalnuts', () => goldenWalnuts());

describe('GoldenWalnutQuery filters', () => {
  it('byLocation() filters by location substring', () => {
    const first = goldenWalnuts().first()!;
    const results = goldenWalnuts().byLocation(first.location).get();
    expect(results.length).toBeGreaterThan(0);
    for (const w of results) {
      expect(w.location.toLowerCase()).toContain(first.location.toLowerCase());
    }
  });

  it('byTrackingType() filters by tracking type', () => {
    const first = goldenWalnuts().first()!;
    const results = goldenWalnuts()
      .byTrackingType(first.trackingType as any)
      .get();
    expect(results.length).toBeGreaterThan(0);
    for (const w of results) {
      expect(w.trackingType).toBe(first.trackingType);
    }
  });
});

describe('GoldenWalnutQuery extras', () => {
  it('totalAmount() sums all walnut amounts', () => {
    const total = goldenWalnuts().totalAmount();
    expect(total).toBeGreaterThan(0);
    const manual = goldenWalnuts()
      .get()
      .reduce((s, w) => s + w.amount, 0);
    expect(total).toBe(manual);
  });

  it('sortByAmount desc has highest first', () => {
    const sorted = goldenWalnuts().sortByAmount('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].amount).toBeGreaterThanOrEqual(sorted[i].amount);
    }
  });

  it('sortByLocation asc is alphabetical', () => {
    const sorted = goldenWalnuts().sortByLocation('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].location.localeCompare(sorted[i].location)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByLocation desc is reverse alphabetical', () => {
    const sorted = goldenWalnuts().sortByLocation('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].location.localeCompare(sorted[i].location)).toBeGreaterThanOrEqual(0);
    }
  });
});

testFilterImmutability(
  'byLocation',
  () => goldenWalnuts(),
  (q) => {
    const loc = goldenWalnuts().first()!.location;
    return (q as GoldenWalnutQuery).byLocation(loc);
  },
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new GoldenWalnutQuery().count()).toBeGreaterThan(0);
  });

  it('sortByLocation default order', () => {
    expect(goldenWalnuts().sortByLocation().count()).toBeGreaterThan(0);
  });

  it('sortByAmount default order', () => {
    expect(goldenWalnuts().sortByAmount().count()).toBeGreaterThan(0);
  });

  it('sortByAmount asc has lowest first', () => {
    const sorted = goldenWalnuts().sortByAmount('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].amount).toBeLessThanOrEqual(sorted[i].amount);
    }
  });
});
