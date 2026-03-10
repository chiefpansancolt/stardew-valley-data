import { parseFishCaught } from '../../../../src/save-file/parsers/v1/fish';

describe('parseFishCaught()', () => {
  it('parses fish caught entries with times caught and largest size', () => {
    const fishCaught = {
      item: [
        {
          key: { string: '128' },
          value: { ArrayOfInt: { int: [5, 32] } },
        },
        {
          key: { string: '129' },
          value: { ArrayOfInt: { int: [3, 18] } },
        },
      ],
    };

    const result = parseFishCaught(fishCaught);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ id: '128', timesCaught: 5, largestSize: 32 });
    expect(result[1]).toEqual({ id: '129', timesCaught: 3, largestSize: 18 });
  });

  it('normalizes item IDs with type prefix', () => {
    const fishCaught = {
      item: [
        {
          key: { string: '(O)128' },
          value: { ArrayOfInt: { int: [1, 10] } },
        },
      ],
    };

    const result = parseFishCaught(fishCaught);
    expect(result[0].id).toBe('128');
  });

  it('defaults to 0 and -1 when int array is empty', () => {
    const fishCaught = {
      item: [
        {
          key: { string: '128' },
          value: { ArrayOfInt: { int: [] } },
        },
      ],
    };

    const result = parseFishCaught(fishCaught);
    expect(result[0]).toEqual({ id: '128', timesCaught: 0, largestSize: -1 });
  });

  it('skips entries with empty id', () => {
    const fishCaught = {
      item: [
        {
          key: { string: '' },
          value: { ArrayOfInt: { int: [1, 10] } },
        },
      ],
    };

    const result = parseFishCaught(fishCaught);
    expect(result).toHaveLength(0);
  });

  it('returns empty array for undefined input', () => {
    expect(parseFishCaught(undefined)).toEqual([]);
  });

  it('returns empty array for null input', () => {
    expect(parseFishCaught(null)).toEqual([]);
  });

  it('handles single int (not array) in ArrayOfInt', () => {
    const fishCaught = {
      item: [
        {
          key: { string: '128' },
          value: { ArrayOfInt: { int: 5 } },
        },
      ],
    };

    const result = parseFishCaught(fishCaught);
    expect(result[0]).toEqual({ id: '128', timesCaught: 5, largestSize: -1 });
  });
});
