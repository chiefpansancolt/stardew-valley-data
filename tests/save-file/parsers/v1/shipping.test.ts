import { parseShipped } from '../../../../src/save-file/parsers/v1/shipping';

describe('parseShipped()', () => {
  it('parses shipped items with normalized IDs', () => {
    const basicShipped = {
      item: [
        { key: { string: '24' }, value: { int: 100 } },
        { key: { string: '(O)128' }, value: { int: 50 } },
      ],
    };

    const result = parseShipped(basicShipped);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ id: '24', count: 100 });
    expect(result[1]).toEqual({ id: '128', count: 50 });
  });

  it('skips entries with empty id', () => {
    const basicShipped = {
      item: [{ key: { string: '' }, value: { int: 10 } }],
    };

    expect(parseShipped(basicShipped)).toEqual([]);
  });

  it('returns empty array for undefined input', () => {
    expect(parseShipped(undefined)).toEqual([]);
  });

  it('returns empty array for null input', () => {
    expect(parseShipped(null)).toEqual([]);
  });
});
