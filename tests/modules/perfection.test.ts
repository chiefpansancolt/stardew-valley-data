import { perfection, PerfectionQuery } from '@/modules/perfection';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('perfection', () => perfection());

describe('PerfectionQuery', () => {
  it('returns non-empty data', () => {
    expect(perfection().count()).toBeGreaterThan(0);
  });

  it('totalWeight() sums to 100', () => {
    expect(perfection().totalWeight()).toBe(100);
  });

  it('totalWeight() on subset is less than 100', () => {
    const first = perfection().first()!;
    const subset = perfection([first]);
    expect(subset.totalWeight()).toBeLessThan(100);
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new PerfectionQuery().count()).toBeGreaterThan(0);
  });
});
