import { parseDate } from '../../../../src/save-file/parsers/v1/date';

describe('parseDate()', () => {
  it('parses date from root and player', () => {
    const player = {
      stats: {
        Values: {
          item: [{ key: { string: 'daysPlayed' }, value: { unsignedInt: 56 } }],
        },
      },
    };
    const root = {
      year: 2,
      currentSeason: 'summer',
      dayOfMonth: 15,
    };

    const result = parseDate(player, root);
    expect(result).toEqual({
      year: 2,
      season: 'summer',
      day: 15,
      totalDaysPlayed: 56,
    });
  });

  it('returns 0 for daysPlayed when not found in stats', () => {
    const player = {
      stats: {
        Values: {
          item: [{ key: { string: 'stepsTaken' }, value: { unsignedInt: 5000 } }],
        },
      },
    };
    const root = { year: 1, currentSeason: 'spring', dayOfMonth: 1 };

    const result = parseDate(player, root);
    expect(result.totalDaysPlayed).toBe(0);
  });

  it('returns 0 for daysPlayed when stats missing', () => {
    const player = {};
    const root = { year: 1, currentSeason: 'spring', dayOfMonth: 1 };

    const result = parseDate(player, root);
    expect(result.totalDaysPlayed).toBe(0);
  });

  it('returns 0 for daysPlayed when Values missing', () => {
    const player = { stats: {} };
    const root = { year: 1, currentSeason: 'spring', dayOfMonth: 1 };

    const result = parseDate(player, root);
    expect(result.totalDaysPlayed).toBe(0);
  });

  it('handles single item (not array) in Values', () => {
    const player = {
      stats: {
        Values: {
          item: { key: { string: 'daysPlayed' }, value: { unsignedInt: 10 } },
        },
      },
    };
    const root = { year: 1, currentSeason: 'spring', dayOfMonth: 10 };

    const result = parseDate(player, root);
    expect(result.totalDaysPlayed).toBe(10);
  });
});
