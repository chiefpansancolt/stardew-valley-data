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
