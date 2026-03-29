import { fish, FishQuery } from '@/modules/fish';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new FishQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByName() uses default order (asc)', () => {
    const sorted = fish().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortBySellPrice() uses default order (desc)', () => {
    const sorted = fish().sortBySellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].sellPrice).toBeGreaterThanOrEqual(sorted[i].sellPrice);
    }
  });

  it('sortBySellPrice asc has lowest first', () => {
    const sorted = fish().sortBySellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].sellPrice).toBeLessThanOrEqual(sorted[i].sellPrice);
    }
  });

  it('sortByDifficulty() uses default order (desc)', () => {
    const sorted = fish().sortByDifficulty().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].difficulty ?? 0).toBeGreaterThanOrEqual(sorted[i].difficulty ?? 0);
    }
  });

  it('sortByDifficulty asc has easiest first', () => {
    const sorted = fish().sortByDifficulty('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].difficulty ?? 0).toBeLessThanOrEqual(sorted[i].difficulty ?? 0);
    }
  });
});

testQueryBaseContract('fish', () => fish());

describe('FishQuery filters', () => {
  it('bySeason() returns only fish for that season', () => {
    const spring = fish().bySeason('spring').get();
    expect(spring.length).toBeGreaterThan(0);
    for (const f of spring) {
      expect(f.seasons).toContain('spring');
    }
  });

  it('byCatchType() filters by rod or crab-pot', () => {
    const rod = fish().byCatchType('rod').get();
    expect(rod.length).toBeGreaterThan(0);
    for (const f of rod) {
      expect(f.catchType).toBe('rod');
    }
  });

  it('byWeather() filters by weather condition', () => {
    const rainy = fish().byWeather('rainy').get();
    expect(rainy.length).toBeGreaterThan(0);
    for (const f of rainy) {
      expect(f.weather).toBe('rainy');
    }
  });

  it('byLocation() filters by location substring', () => {
    const ocean = fish().byLocation('ocean').get();
    expect(ocean.length).toBeGreaterThan(0);
    for (const f of ocean) {
      expect(f.location.toLowerCase()).toContain('ocean');
    }
  });

  it('smokeable() returns only fish that can be smoked', () => {
    const smokeable = fish().smokeable().get();
    expect(smokeable.length).toBeGreaterThan(0);
    for (const f of smokeable) {
      expect(f.canSmoke).toBe(true);
    }
  });

  it('smokeable() excludes crab-pot fish and algae', () => {
    const smokeable = fish().smokeable().get();
    for (const f of smokeable) {
      expect(f.catchType).not.toBe('crab-pot');
    }
  });

  it('byRoe("roe") returns standard roe producers', () => {
    const roe = fish().byRoe('roe').get();
    expect(roe.length).toBeGreaterThan(0);
    for (const f of roe) {
      expect(f.roe).toBe('roe');
    }
  });

  it('byRoe("caviar") returns only Sturgeon', () => {
    const caviar = fish().byRoe('caviar').get();
    expect(caviar.length).toBe(1);
    expect(caviar[0].name).toBe('Sturgeon');
  });

  it('pondEligible() returns fish with a fishPond', () => {
    const pond = fish().pondEligible().get();
    expect(pond.length).toBeGreaterThan(0);
    for (const f of pond) {
      expect(f.fishPond).not.toBeNull();
    }
  });

  it('pondEligible() excludes algae and jellies', () => {
    const pond = fish().pondEligible().get();
    const names = pond.map((f) => f.name);
    expect(names).not.toContain('Seaweed');
    expect(names).not.toContain('Green Algae');
    expect(names).not.toContain('White Algae');
  });

  it('byCategory("regular") returns only regular fish', () => {
    const regular = fish().byCategory('regular').get();
    expect(regular.length).toBeGreaterThan(0);
    for (const f of regular) {
      expect(f.category).toBe('regular');
    }
  });

  it('byCategory("crab-pot") returns only crab-pot fish', () => {
    const crabPot = fish().byCategory('crab-pot').get();
    expect(crabPot.length).toBeGreaterThan(0);
    for (const f of crabPot) {
      expect(f.category).toBe('crab-pot');
    }
  });

  it('byCategory("night-market") returns only Night Market fish', () => {
    const nightMarket = fish().byCategory('night-market').get();
    expect(nightMarket.length).toBe(3);
    const names = nightMarket.map((f) => f.name);
    expect(names).toContain('Blobfish');
    expect(names).toContain('Midnight Squid');
    expect(names).toContain('Spook Fish');
  });

  it('byCategory("legendary") returns the 5 legendary fish', () => {
    const legendary = fish().byCategory('legendary').get();
    expect(legendary.length).toBe(5);
    const names = legendary.map((f) => f.name);
    expect(names).toContain('Legend');
    expect(names).toContain('Mutant Carp');
    expect(names).toContain('Crimsonfish');
    expect(names).toContain('Angler');
    expect(names).toContain('Glacierfish');
  });

  it('byCategory("legendary-2") returns the 5 Extended Family fish', () => {
    const legendary2 = fish().byCategory('legendary-2').get();
    expect(legendary2.length).toBe(5);
    const names = legendary2.map((f) => f.name);
    expect(names).toContain('Legend II');
    expect(names).toContain('Radioactive Carp');
    expect(names).toContain('Son of Crimsonfish');
    expect(names).toContain('Ms. Angler');
    expect(names).toContain('Glacierfish Jr.');
  });

  it('byCategory("other") returns algae, seaweed, and jellies', () => {
    const other = fish().byCategory('other').get();
    expect(other.length).toBe(6);
    const names = other.map((f) => f.name);
    expect(names).toContain('Green Algae');
    expect(names).toContain('White Algae');
    expect(names).toContain('Seaweed');
    expect(names).toContain('Sea Jelly');
    expect(names).toContain('River Jelly');
    expect(names).toContain('Cave Jelly');
  });

  it('all fish have a valid category', () => {
    const valid = new Set([
      'regular',
      'crab-pot',
      'night-market',
      'legendary',
      'legendary-2',
      'other',
    ]);
    for (const f of fish().get()) {
      expect(valid.has(f.category)).toBe(true);
    }
  });

  it('category counts sum to total fish count', () => {
    const total = fish().count();
    const sum =
      fish().byCategory('regular').count() +
      fish().byCategory('crab-pot').count() +
      fish().byCategory('night-market').count() +
      fish().byCategory('legendary').count() +
      fish().byCategory('legendary-2').count() +
      fish().byCategory('other').count();
    expect(sum).toBe(total);
  });
});

describe('FishQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = fish().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = fish().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });

  it('sortBySellPrice desc has highest first', () => {
    const sorted = fish().sortBySellPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].sellPrice).toBeGreaterThanOrEqual(sorted[i].sellPrice);
    }
  });

  it('sortByDifficulty desc has hardest first', () => {
    const sorted = fish().sortByDifficulty('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].difficulty ?? 0).toBeGreaterThanOrEqual(sorted[i].difficulty ?? 0);
    }
  });
});

testFilterImmutability(
  'bySeason',
  () => fish(),
  (q) => (q as FishQuery).bySeason('spring'),
);
testFilterImmutability(
  'byCatchType',
  () => fish(),
  (q) => (q as FishQuery).byCatchType('rod'),
);
testFilterImmutability(
  'byCategory',
  () => fish(),
  (q) => (q as FishQuery).byCategory('legendary'),
);
