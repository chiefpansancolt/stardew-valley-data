import { QuestQuery, quests } from '@/modules/quests';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('quests', () => quests());

describe('QuestQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = quests().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new QuestQuery().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(quests().sortByName().count()).toBeGreaterThan(0);
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = quests().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});
