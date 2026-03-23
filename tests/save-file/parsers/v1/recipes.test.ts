import {
  parseCookingRecipes,
  parseCraftingRecipes,
} from '../../../../src/save-file/parsers/v1/recipes';

describe('parseCookingRecipes()', () => {
  it('merges known recipes with times-cooked counts by ID', () => {
    // cookingRecipes: known by name (values are always 0 in the save file)
    const knownData = {
      item: [
        { key: { string: 'Fried Egg' }, value: { int: 0 } },
        { key: { string: 'Salad' }, value: { int: 0 } },
      ],
    };
    // recipesCooked: actual counts keyed by item ID
    // Fried Egg = id 194, Salad = id 196
    const cookedData = {
      item: [{ key: { string: '194' }, value: { int: 5 } }],
    };

    const result = parseCookingRecipes(knownData, cookedData);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ name: 'Fried Egg', timesMade: 5 });
    expect(result[1]).toEqual({ name: 'Salad', timesMade: 0 });
  });

  it('defaults timesMade to 0 when recipe not in recipesCooked', () => {
    const knownData = {
      item: [{ key: { string: 'Salad' }, value: { int: 0 } }],
    };

    const result = parseCookingRecipes(knownData, undefined);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ name: 'Salad', timesMade: 0 });
  });

  it('skips entries with empty name', () => {
    const data = {
      item: [{ key: { string: '' }, value: { int: 3 } }],
    };

    expect(parseCookingRecipes(data, undefined)).toEqual([]);
  });

  it('returns empty array for undefined input', () => {
    expect(parseCookingRecipes(undefined, undefined)).toEqual([]);
  });

  it('ignores cooked IDs not found in cooking data', () => {
    const knownData = {
      item: [{ key: { string: 'Fried Egg' }, value: { int: 0 } }],
    };
    // ID 99999 doesn't exist in cooking.json
    const cookedData = {
      item: [
        { key: { string: '194' }, value: { int: 3 } },
        { key: { string: '99999' }, value: { int: 10 } },
      ],
    };

    const result = parseCookingRecipes(knownData, cookedData);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ name: 'Fried Egg', timesMade: 3 });
  });

  it('skips cooked entries with empty ID', () => {
    const knownData = {
      item: [{ key: { string: 'Fried Egg' }, value: { int: 0 } }],
    };
    const cookedData = {
      item: [{ key: { string: '' }, value: { int: 5 } }],
    };

    const result = parseCookingRecipes(knownData, cookedData);
    expect(result).toHaveLength(1);
    expect(result[0].timesMade).toBe(0);
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

  it('skips entries with empty name', () => {
    const data = {
      item: [
        { key: { string: '' }, value: { int: 5 } },
        { key: { string: 'Chest' }, value: { int: 2 } },
      ],
    };

    const result = parseCraftingRecipes(data);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Chest');
  });
});
