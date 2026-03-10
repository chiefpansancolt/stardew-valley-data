import { SpecialItemQuery, specialItems } from '@/modules/special-items';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('specialItems', () => specialItems());

describe('SpecialItemQuery filters', () => {
  it('byType() filters by type', () => {
    const books = specialItems().byType('book').get();
    expect(books.length).toBeGreaterThan(0);
    for (const s of books) {
      expect(s.type).toBe('book');
    }
  });

  it('byType() mastery returns mastery items', () => {
    const masteries = specialItems().byType('mastery').get();
    expect(masteries.length).toBeGreaterThan(0);
    for (const s of masteries) {
      expect(s.type).toBe('mastery');
    }
  });

  it('bySkill() filters by mastery skill', () => {
    const masteries = specialItems().byType('mastery').get();
    if (masteries.length > 0) {
      const skill = (masteries[0] as any).skill;
      const results = specialItems().bySkill(skill).get();
      expect(results.length).toBeGreaterThan(0);
      for (const s of results) {
        expect((s as any).skill).toBe(skill);
      }
    }
  });
});

describe('SpecialItemQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = specialItems().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testFilterImmutability(
  'byType',
  () => specialItems(),
  (q) => (q as SpecialItemQuery).byType('book'),
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new SpecialItemQuery().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(specialItems().sortByName().count()).toBeGreaterThan(0);
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = specialItems().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});
