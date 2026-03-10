import { ArtifactQuery, artifacts } from '@/modules/artifacts';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new ArtifactQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByName() uses default order (asc)', () => {
    const sorted = artifacts().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = artifacts().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });

  it('sortBySellPrice() uses default order (desc)', () => {
    const sorted = artifacts().sortBySellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].sellPrice).toBeGreaterThanOrEqual(sorted[i].sellPrice);
    }
  });

  it('sortBySellPrice asc has lowest first', () => {
    const sorted = artifacts().sortBySellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].sellPrice).toBeLessThanOrEqual(sorted[i].sellPrice);
    }
  });
});

testQueryBaseContract('artifacts', () => artifacts());

describe('ArtifactQuery filters', () => {
  it('withDonationNotes() returns only artifacts with donation notes', () => {
    const results = artifacts().withDonationNotes().get();
    expect(results.length).toBeGreaterThan(0);
    for (const a of results) {
      expect(a.donationNotes).not.toBeNull();
    }
  });

  it('fromFishing() returns only artifacts found via fishing', () => {
    const results = artifacts().fromFishing().get();
    expect(results.length).toBeGreaterThan(0);
    for (const a of results) {
      expect(a.locations.some((l) => l.toLowerCase().includes('fishing'))).toBe(true);
    }
  });
});

describe('ArtifactQuery sorts', () => {
  it('sortBySellPrice desc has highest first', () => {
    const sorted = artifacts().sortBySellPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].sellPrice).toBeGreaterThanOrEqual(sorted[i].sellPrice);
    }
  });

  it('sortByName asc is alphabetical', () => {
    const sorted = artifacts().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testFilterImmutability(
  'withDonationNotes',
  () => artifacts(),
  (q) => (q as ArtifactQuery).withDonationNotes(),
);
