import { parseInventory } from '../../../../src/save-file/parsers/v1/inventory';

describe('parseInventory()', () => {
  it('parses items with all fields', () => {
    const items = {
      Item: [
        {
          name: 'Parsnip',
          itemId: '(O)24',
          '@_xsi:type': 'Object',
          stack: 5,
          quality: 2,
        },
      ],
    };

    const result = parseInventory(items);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: '24',
      name: 'Parsnip',
      type: 'Object',
      stack: 5,
      quality: 2,
    });
  });

  it('skips items with empty name', () => {
    const items = {
      Item: [
        { name: '', itemId: '24', '@_xsi:type': 'Object', stack: 1, quality: 0 },
        { name: 'Parsnip', itemId: '24', '@_xsi:type': 'Object', stack: 1, quality: 0 },
      ],
    };

    const result = parseInventory(items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Parsnip');
  });

  it('skips items with undefined/null name', () => {
    const items = {
      Item: [{ itemId: '24', '@_xsi:type': 'Object', stack: 1, quality: 0 }],
    };

    const result = parseInventory(items);
    expect(result).toHaveLength(0);
  });

  it('uses @_type fallback when @_xsi:type is missing', () => {
    const items = {
      Item: [
        {
          name: 'Axe',
          itemId: '(T)Axe',
          '@_type': 'Tool',
          stack: 1,
          quality: 0,
        },
      ],
    };

    const result = parseInventory(items);
    expect(result[0].type).toBe('Tool');
  });

  it('defaults stack to 1 when stack is 0 or missing', () => {
    const items = {
      Item: [
        { name: 'Stone', itemId: '390', stack: 0, quality: 0 },
        { name: 'Wood', itemId: '388', quality: 0 },
      ],
    };

    const result = parseInventory(items);
    expect(result[0].stack).toBe(1);
    expect(result[1].stack).toBe(1);
  });

  it('defaults quality to 0 when missing', () => {
    const items = {
      Item: [{ name: 'Parsnip', itemId: '24', stack: 5 }],
    };

    const result = parseInventory(items);
    expect(result[0].quality).toBe(0);
  });

  it('normalizes item IDs by stripping prefix', () => {
    const items = {
      Item: [{ name: 'Bee House', itemId: '(BC)10', stack: 1, quality: 0 }],
    };

    const result = parseInventory(items);
    expect(result[0].id).toBe('10');
  });

  it('handles single item (not wrapped in array)', () => {
    const items = {
      Item: { name: 'Parsnip', itemId: '24', '@_xsi:type': 'Object', stack: 3, quality: 0 },
    };

    const result = parseInventory(items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Parsnip');
  });

  it('returns empty array for undefined input', () => {
    expect(parseInventory(undefined)).toEqual([]);
  });

  it('returns empty array for null input', () => {
    expect(parseInventory(null)).toEqual([]);
  });

  it('handles type being empty string when both @_xsi:type and @_type are missing', () => {
    const items = {
      Item: [{ name: 'Mystery', itemId: '999', stack: 1, quality: 0 }],
    };

    const result = parseInventory(items);
    expect(result[0].type).toBe('');
  });
});
