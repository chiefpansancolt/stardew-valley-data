import {
  parseCookingRecipes,
  parseCraftingRecipes,
} from '../../../../src/save-file/parsers/v1/recipes';

describe('parseCookingRecipes()', () => {
  it('parses cooking recipe entries', () => {
    const data = {
      item: [
        { key: { string: 'Fried Egg' }, value: { int: 5 } },
        { key: { string: 'Salad' }, value: { int: 0 } },
      ],
    };

    const result = parseCookingRecipes(data);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ name: 'Fried Egg', timesMade: 5 });
    expect(result[1]).toEqual({ name: 'Salad', timesMade: 0 });
  });

  it('skips entries with empty name', () => {
    const data = {
      item: [{ key: { string: '' }, value: { int: 3 } }],
    };

    expect(parseCookingRecipes(data)).toEqual([]);
  });

  it('returns empty array for undefined input', () => {
    expect(parseCookingRecipes(undefined)).toEqual([]);
  });
});

describe('parseCraftingRecipes()', () => {
  it('parses crafting recipe entries', () => {
    const data = {
      item: [
        { key: { string: 'Chest' }, value: { int: 10 } },
        { key: { string: 'Furnace' }, value: { int: 2 } },
      ],
    };

    const result = parseCraftingRecipes(data);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ name: 'Chest', timesMade: 10 });
    expect(result[1]).toEqual({ name: 'Furnace', timesMade: 2 });
  });

  it('returns empty array for null input', () => {
    expect(parseCraftingRecipes(null)).toEqual([]);
  });
});
