import {
  fieldOffice,
  FieldOfficeDonationQuery,
  fieldOfficeDonations,
  FieldOfficeQuery,
} from '@/modules/field-office';
import { testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('FieldOfficeQuery constructor uses default data when called without args', () => {
    const query = new FieldOfficeQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('FieldOfficeDonationQuery constructor uses default data when called without args', () => {
    const query = new FieldOfficeDonationQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('fieldOffice sortByName() uses default order (asc)', () => {
    const sorted = fieldOffice().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('fieldOfficeDonations sortByName() uses default order (asc)', () => {
    const sorted = fieldOfficeDonations().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('fieldOfficeDonations sortByName desc is reverse alphabetical', () => {
    const sorted = fieldOfficeDonations().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

testQueryBaseContract('fieldOffice', () => fieldOffice());
testQueryBaseContract('fieldOfficeDonations', () => fieldOfficeDonations());

describe('FieldOfficeQuery', () => {
  it('byCollection() filters to a specific collection', () => {
    const first = fieldOffice().first()!;
    const results = fieldOffice()
      .byCollection(first.id as any)
      .get();
    expect(results.length).toBeGreaterThan(0);
    for (const c of results) {
      expect(c.id).toBe(first.id);
    }
  });
});

describe('FieldOfficeQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = fieldOffice().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = fieldOffice().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('FieldOfficeDonationQuery', () => {
  it('byCollection() filters donations by collection', () => {
    const first = fieldOfficeDonations().first()!;
    const results = fieldOfficeDonations()
      .byCollection(first.collection as any)
      .get();
    expect(results.length).toBeGreaterThan(0);
    for (const d of results) {
      expect(d.collection).toBe(first.collection);
    }
  });

  it('sortByName asc is alphabetical', () => {
    const sorted = fieldOfficeDonations().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});
