import { MixedSeedQuery, mixedSeeds } from '@/modules/mixed-seeds';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('mixedSeeds', () => mixedSeeds());

describe('MixedSeedQuery filters', () => {
  it('byProduces() returns seeds that produce in a given season', () => {
    const spring = mixedSeeds().byProduces('spring').get();
    expect(spring.length).toBeGreaterThan(0);
    for (const s of spring) {
      expect(s.produces['spring']).toBeDefined();
    }
  });

  it('withBuyPrices() returns seeds with buy prices', () => {
    const result = mixedSeeds().withBuyPrices().get();
    for (const s of result) {
      expect(s.buyPrices.length).toBeGreaterThan(0);
    }
  });
});

testFilterImmutability(
  'byProduces',
  () => mixedSeeds(),
  (q) => (q as MixedSeedQuery).byProduces('spring'),
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new MixedSeedQuery().count()).toBeGreaterThan(0);
  });
});
