import { parseQuests } from '../../../../src/save-file/parsers/v1/quests';

describe('parseQuests()', () => {
  it('parses active quests from quest log', () => {
    const questLog = {
      Quest: [
        {
          id: '1',
          questTitle: 'Getting Started',
          _questDescription: 'Plant some parsnips.',
          questType: 1,
          completed: false,
        },
        {
          id: '2',
          questTitle: 'Introduction',
          _questDescription: 'Meet the townspeople.',
          questType: 2,
          completed: true,
        },
      ],
    };

    const result = parseQuests(questLog);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: '1',
      title: 'Getting Started',
      description: 'Plant some parsnips.',
      type: 1,
      completed: false,
    });
    expect(result[1].completed).toBe(true);
  });

  it('handles completed as string "true"', () => {
    const questLog = {
      Quest: [
        {
          id: '3',
          questTitle: 'Test',
          _questDescription: 'Desc',
          questType: 1,
          completed: 'true',
        },
      ],
    };

    const result = parseQuests(questLog);
    expect(result[0].completed).toBe(true);
  });

  it('returns empty array for undefined input', () => {
    expect(parseQuests(undefined)).toEqual([]);
  });

  it('returns empty array for null input', () => {
    expect(parseQuests(null)).toEqual([]);
  });

  it('handles single quest (not array)', () => {
    const questLog = {
      Quest: {
        id: '5',
        questTitle: 'Solo Quest',
        _questDescription: 'Do something.',
        questType: 3,
        completed: false,
      },
    };

    const result = parseQuests(questLog);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Solo Quest');
  });
});
