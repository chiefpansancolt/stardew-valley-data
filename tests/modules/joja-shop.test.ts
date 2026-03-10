import { joja, JojaQuery } from '@/modules/joja-shop';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('joja', () => joja());

describe('JojaQuery filters', () => {
  it('bySeason() filters by season', () => {
    const spring = joja().bySeason('spring').get();
    expect(spring.length).toBeGreaterThan(0);
    expect(spring.length).toBeLessThanOrEqual(joja().count());
  });

  it('permanent() returns items with no seasons', () => {
    const perma = joja().permanent().get();
    expect(perma.length).toBeGreaterThan(0);
    for (const item of perma) {
      expect(item.seasons).toHaveLength(0);
    }
  });

  it('seeds() returns only seasonal items', () => {
    const seeds = joja().seeds().get();
    expect(seeds.length).toBeGreaterThan(0);
    for (const item of seeds) {
      expect(item.seasons.length).toBeGreaterThan(0);
    }
  });
});

describe('JojaQuery additional filters', () => {
  it('alwaysAvailable() returns items with no availability condition', () => {
    const available = joja().alwaysAvailable().get();
    for (const item of available) {
      expect(item.availability).toBeUndefined();
    }
  });
});

describe('JojaQuery sorts', () => {
  it('sortByPrice asc has lowest first', () => {
    const sorted = joja().sortByPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByPrice desc has highest first', () => {
    const sorted = joja().sortByPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeGreaterThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName asc sorts alphabetically', () => {
    const sorted = joja().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc sorts reverse alphabetically', () => {
    const sorted = joja().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new JojaQuery().count()).toBeGreaterThan(0);
  });

  it('sortByPrice default order', () => {
    expect(joja().sortByPrice().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(joja().sortByName().count()).toBeGreaterThan(0);
  });
});
