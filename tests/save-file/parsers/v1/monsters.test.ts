import { parseMonstersKilled } from '../../../../src/save-file/parsers/v1/monsters';

describe('parseMonstersKilled()', () => {
  it('parses monster kill counts from player stats', () => {
    const player = {
      stats: {
        specificMonstersKilled: {
          item: [
            { key: { string: 'Green Slime' }, value: { int: 50 } },
            { key: { string: 'Skeleton' }, value: { int: 25 } },
          ],
        },
      },
    };

    const result = parseMonstersKilled(player);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ name: 'Green Slime', count: 50 });
    expect(result[1]).toEqual({ name: 'Skeleton', count: 25 });
  });

  it('sorts by count descending', () => {
    const player = {
      stats: {
        specificMonstersKilled: {
          item: [
            { key: { string: 'Bat' }, value: { int: 10 } },
            { key: { string: 'Bug' }, value: { int: 100 } },
          ],
        },
      },
    };

    const result = parseMonstersKilled(player);
    expect(result[0].name).toBe('Bug');
    expect(result[1].name).toBe('Bat');
  });

  it('skips entries with empty name', () => {
    const player = {
      stats: {
        specificMonstersKilled: {
          item: [{ key: { string: '' }, value: { int: 5 } }],
        },
      },
    };

    expect(parseMonstersKilled(player)).toEqual([]);
  });

  it('returns empty array when no stats', () => {
    expect(parseMonstersKilled({})).toEqual([]);
  });

  it('returns empty array when specificMonstersKilled is undefined', () => {
    expect(parseMonstersKilled({ stats: {} })).toEqual([]);
  });
});
