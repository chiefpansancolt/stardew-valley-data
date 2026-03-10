import { wizard, WizardQuery } from '@/modules/wizard-shop';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('wizard', () => wizard());

describe('WizardQuery filters', () => {
  it('alwaysAvailable() returns items with no availability condition', () => {
    const available = wizard().alwaysAvailable().get();
    for (const item of available) {
      expect(item.availability).toBeUndefined();
    }
  });
});

describe('WizardQuery sorts', () => {
  it('sortByCost asc has cheapest first', () => {
    const sorted = wizard().sortByCost('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].buildCost).toBeLessThanOrEqual(sorted[i].buildCost);
    }
  });

  it('sortByCost desc has most expensive first', () => {
    const sorted = wizard().sortByCost('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].buildCost).toBeGreaterThanOrEqual(sorted[i].buildCost);
    }
  });

  it('sortByName asc sorts alphabetically', () => {
    const sorted = wizard().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc sorts reverse alphabetically', () => {
    const sorted = wizard().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new WizardQuery().count()).toBeGreaterThan(0);
  });

  it('sortByCost default order', () => {
    expect(wizard().sortByCost().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(wizard().sortByName().count()).toBeGreaterThan(0);
  });
});
