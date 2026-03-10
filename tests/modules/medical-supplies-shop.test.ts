import { medicalSupplies, MedicalSupplyQuery } from '@/modules/medical-supplies-shop';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('medicalSupplies', () => medicalSupplies());

describe('MedicalSupplyQuery sorts', () => {
  it('sortByPrice asc has lowest first', () => {
    const sorted = medicalSupplies().sortByPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeLessThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName asc is alphabetical', () => {
    const sorted = medicalSupplies().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new MedicalSupplyQuery().count()).toBeGreaterThan(0);
  });

  it('sortByPrice default order', () => {
    expect(medicalSupplies().sortByPrice().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(medicalSupplies().sortByName().count()).toBeGreaterThan(0);
  });

  it('sortByPrice desc has highest first', () => {
    const sorted = medicalSupplies().sortByPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeGreaterThanOrEqual(sorted[i].price);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = medicalSupplies().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});
