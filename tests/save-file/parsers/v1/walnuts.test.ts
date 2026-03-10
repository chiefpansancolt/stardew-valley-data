import { parseWalnuts } from '../../../../src/save-file/parsers/v1/walnuts';

describe('parseWalnuts()', () => {
  it('parses walnut data from root', () => {
    const root = {
      goldenWalnutsFound: 50,
      collectedNutTracker: {
        string: ['Birdie', 'VolcanoNormal25', 'IslandWest_21_17'],
      },
    };

    const result = parseWalnuts(root);
    expect(result).toEqual({
      found: 50,
      collected: ['Birdie', 'VolcanoNormal25', 'IslandWest_21_17'],
    });
  });

  it('handles single string (not array)', () => {
    const root = {
      goldenWalnutsFound: 1,
      collectedNutTracker: { string: 'Birdie' },
    };

    const result = parseWalnuts(root);
    expect(result.collected).toEqual(['Birdie']);
  });

  it('returns defaults for empty root', () => {
    const result = parseWalnuts({});
    expect(result).toEqual({ found: 0, collected: [] });
  });

  it('filters out empty strings from collected', () => {
    const root = {
      goldenWalnutsFound: 2,
      collectedNutTracker: { string: ['Birdie', ''] },
    };

    const result = parseWalnuts(root);
    expect(result.collected).toEqual(['Birdie']);
  });
});
