import { MineralQuery, minerals } from '@/modules/minerals';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('minerals', () => minerals());

describe('MineralQuery filters', () => {
  it('mineralItems() returns only kind=mineral', () => {
    const results = minerals().mineralItems().get();
    expect(results.length).toBeGreaterThan(0);
    for (const m of results) {
      expect(m.kind).toBe('mineral');
    }
  });

  it('geodes() returns only kind=geode', () => {
    const results = minerals().geodes().get();
    expect(results.length).toBeGreaterThan(0);
    for (const m of results) {
      expect(m.kind).toBe('geode');
    }
  });

  it('ores() returns only kind=ore', () => {
    const results = minerals().ores().get();
    expect(results.length).toBeGreaterThan(0);
    for (const m of results) {
      expect(m.kind).toBe('ore');
    }
  });

  it('bars() returns only kind=bar', () => {
    const results = minerals().bars().get();
    expect(results.length).toBeGreaterThan(0);
    for (const m of results) {
      expect(m.kind).toBe('bar');
    }
  });

  it('nodes() returns only kind=node', () => {
    const results = minerals().nodes().get();
    expect(results.length).toBeGreaterThan(0);
    for (const m of results) {
      expect(m.kind).toBe('node');
    }
  });

  it('resources() returns only kind=resource', () => {
    const results = minerals().resources().get();
    expect(results.length).toBeGreaterThan(0);
    for (const m of results) {
      expect(m.kind).toBe('resource');
    }
  });

  it('fromGeode() filters minerals found in a specific geode type', () => {
    const results = minerals().fromGeode('Frozen Geode').get();
    expect(results.length).toBeGreaterThan(0);
    for (const m of results) {
      expect(m.kind).not.toBe('bar');
      expect(
        (m as any).locations.some((l: string) => l.toLowerCase().includes('frozen geode')),
      ).toBe(true);
    }
  });
});

describe('MineralQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = minerals().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = minerals().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });

  it('sortBySellPrice desc has highest first', () => {
    const sorted = minerals().sortBySellPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      const aPrice = 'sellPrice' in sorted[i - 1] ? (sorted[i - 1] as any).sellPrice : 0;
      const bPrice = 'sellPrice' in sorted[i] ? (sorted[i] as any).sellPrice : 0;
      expect(aPrice).toBeGreaterThanOrEqual(bPrice);
    }
  });

  it('sortBySellPrice asc has lowest first', () => {
    const sorted = minerals().sortBySellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      const aPrice = 'sellPrice' in sorted[i - 1] ? (sorted[i - 1] as any).sellPrice : 0;
      const bPrice = 'sellPrice' in sorted[i] ? (sorted[i] as any).sellPrice : 0;
      expect(aPrice).toBeLessThanOrEqual(bPrice);
    }
  });
});

testFilterImmutability(
  'mineralItems',
  () => minerals(),
  (q) => (q as MineralQuery).mineralItems(),
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new MineralQuery().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(minerals().sortByName().count()).toBeGreaterThan(0);
  });

  it('sortBySellPrice default order', () => {
    expect(minerals().sortBySellPrice().count()).toBeGreaterThan(0);
  });
});
