import {
  ensureArray,
  extractDictItems,
  normalizeItemId,
  num,
  str,
} from '../../../src/save-file/parsers/util';

describe('normalizeItemId()', () => {
  it('strips (O) prefix', () => {
    expect(normalizeItemId('(O)129')).toBe('129');
  });

  it('strips (BC) prefix', () => {
    expect(normalizeItemId('(BC)10')).toBe('10');
  });

  it('passes through plain IDs', () => {
    expect(normalizeItemId('773')).toBe('773');
  });

  it('strips other type prefixes', () => {
    expect(normalizeItemId('(WD)5')).toBe('5');
  });
});

describe('num()', () => {
  it('returns number from number', () => {
    expect(num(42)).toBe(42);
  });

  it('returns number from numeric string', () => {
    expect(num('100')).toBe(100);
  });

  it('returns 0 for undefined', () => {
    expect(num(undefined)).toBe(0);
  });

  it('returns 0 for null', () => {
    expect(num(null)).toBe(0);
  });

  it('returns 0 for NaN-producing input', () => {
    expect(num('abc')).toBe(0);
  });
});

describe('str()', () => {
  it('returns string from string', () => {
    expect(str('hello')).toBe('hello');
  });

  it('returns fallback for undefined', () => {
    expect(str(undefined)).toBe('');
    expect(str(undefined, 'default')).toBe('default');
  });

  it('returns fallback for null', () => {
    expect(str(null, 'fallback')).toBe('fallback');
  });

  it('converts numbers to string', () => {
    expect(str(42)).toBe('42');
  });
});

describe('ensureArray()', () => {
  it('wraps a single value in an array', () => {
    expect(ensureArray('item')).toEqual(['item']);
  });

  it('passes through an array', () => {
    expect(ensureArray([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('returns empty array for undefined', () => {
    expect(ensureArray(undefined)).toEqual([]);
  });

  it('returns empty array for null', () => {
    expect(ensureArray(null)).toEqual([]);
  });
});

describe('extractDictItems()', () => {
  it('extracts key-value items from dict structure', () => {
    const dict = {
      item: [
        { key: { string: 'daysPlayed' }, value: { unsignedInt: 100 } },
        { key: { string: 'fishCaught' }, value: { unsignedInt: 5 } },
      ],
    };
    const items = extractDictItems(dict);
    expect(items).toHaveLength(2);
    expect(items[0].key).toEqual({ string: 'daysPlayed' });
    expect(items[0].value).toEqual({ unsignedInt: 100 });
  });

  it('returns empty array for undefined', () => {
    expect(extractDictItems(undefined)).toEqual([]);
  });

  it('returns empty array for null', () => {
    expect(extractDictItems(null)).toEqual([]);
  });

  it('returns empty array for non-object', () => {
    expect(extractDictItems('string')).toEqual([]);
  });
});
