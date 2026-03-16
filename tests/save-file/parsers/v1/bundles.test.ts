import { parseBundles } from '../../../../src/save-file/parsers/v1/bundles';

describe('parseBundles()', () => {
  const makeBundleData = (entries: Array<{ key: string; value: string }>) => ({
    item: entries.map((e) => ({
      key: { string: e.key },
      value: { string: e.value },
    })),
  });

  const makeCCLocation = (
    bundleSlots: Array<{ index: number; booleans: boolean[] }>,
    areasComplete: boolean[],
  ) => ({
    name: 'CommunityCenter',
    bundles: {
      item: bundleSlots.map((s) => ({
        key: { int: s.index },
        value: { ArrayOfBoolean: { boolean: s.booleans } },
      })),
    },
    areasComplete: { boolean: areasComplete },
  });

  it('parses a complete bundle setup', () => {
    const root = {
      bundleData: makeBundleData([
        {
          key: 'Pantry/0',
          value: 'Spring Crops/O 465 20/24 1 0 188 1 0 190 1 0 192 1 0/0/4//Spring Crops',
        },
      ]),
      locations: {
        GameLocation: [
          makeCCLocation(
            [{ index: 0, booleans: [true, true, false, false] }],
            [false, false, false, false, false, false, false],
          ),
        ],
      },
    };

    const mail = new Set<string>();
    const result = parseBundles(root, mail);

    expect(result.rooms).toHaveLength(1);
    expect(result.rooms[0].bundles).toHaveLength(1);
    const bundle = result.rooms[0].bundles[0];
    expect(bundle.id).toBe('Pantry/0');
    expect(bundle.bundleIndex).toBe(0);
    expect(bundle.name).toBe('Spring Crops');
    expect(bundle.items).toHaveLength(4);
    expect(bundle.items[0].itemId).toBe('24');
    expect(bundle.items[0].quantity).toBe(1);
    expect(bundle.items[0].quality).toBe(0);
    expect(bundle.items[0].qualityName).toBe('Normal');
    expect(bundle.items[0].completed).toBe(true);
    expect(bundle.items[1].completed).toBe(true);
    expect(bundle.items[2].completed).toBe(false);
    expect(bundle.items[3].completed).toBe(false);
    expect(bundle.itemsRequired).toBe(4);
    expect(bundle.itemsCompleted).toBe(2);
    expect(bundle.complete).toBe(false);

    expect(bundle.reward).not.toBeNull();
    expect(bundle.reward!.type).toBe('Object');
    expect(bundle.reward!.itemId).toBe('465');
    expect(bundle.reward!.quantity).toBe(20);
  });

  it('parses reward with BigCraftable type', () => {
    const root = {
      bundleData: makeBundleData([
        {
          key: 'Crafts Room/1',
          value: 'Test Bundle/BO 10 1/388 99 0/0/1//Test Bundle',
        },
      ]),
      locations: { GameLocation: [] },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms[0].bundles[0].reward!.type).toBe('Big Craftable');
  });

  it('handles bundle with no reward string', () => {
    const root = {
      bundleData: makeBundleData([
        {
          key: 'Vault/4',
          value: 'Gold Bundle//-1 2500 0/0/1//2,500g Bundle',
        },
      ]),
      locations: { GameLocation: [] },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms[0].bundles[0].reward).toBeNull();
  });

  it('handles gold items (itemId -1)', () => {
    const root = {
      bundleData: makeBundleData([
        {
          key: 'Vault/5',
          value: 'Money Bundle/O 465 1/-1 2500 0 -1 5000 0/0///Money Bundle',
        },
      ]),
      locations: {
        GameLocation: [
          makeCCLocation(
            [{ index: 5, booleans: [true, false] }],
            [false, false, false, false, false, false, false],
          ),
        ],
      },
    };

    const result = parseBundles(root, new Set());
    const items = result.rooms[0].bundles[0].items;
    expect(items[0].name).toBe('2,500g');
    expect(items[1].name).toBe('5,000g');
  });

  it('detects Joja route from mail flags', () => {
    const root = { bundleData: makeBundleData([]), locations: { GameLocation: [] } };
    const mail = new Set(['jojaBoilerRoom']);

    const result = parseBundles(root, mail);
    expect(result.isJojaRoute).toBe(true);
    expect(result.isCCComplete).toBe(false);
  });

  it('detects CC complete from mail flags', () => {
    const root = { bundleData: makeBundleData([]), locations: { GameLocation: [] } };
    const mail = new Set(['ccIsComplete']);

    const result = parseBundles(root, mail);
    expect(result.isCCComplete).toBe(true);
    expect(result.isJojaRoute).toBe(false);
  });

  it('builds room summaries with area completion', () => {
    const root = {
      bundleData: makeBundleData([
        {
          key: 'Pantry/0',
          value: 'Bundle A/O 24 1/24 1 0/0/1//Bundle A',
        },
        {
          key: 'Pantry/1',
          value: 'Bundle B/O 24 1/188 1 0/0/1//Bundle B',
        },
      ]),
      locations: {
        GameLocation: [
          makeCCLocation(
            [
              { index: 0, booleans: [true] },
              { index: 1, booleans: [true] },
            ],
            [true, false, false, false, false, false, false],
          ),
        ],
      },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms).toHaveLength(1);
    expect(result.rooms[0].name).toBe('Pantry');
    expect(result.rooms[0].areaIndex).toBe(0);
    expect(result.rooms[0].complete).toBe(true);
    expect(result.rooms[0].bundles).toHaveLength(2);
  });

  it('handles unknown room key gracefully', () => {
    const root = {
      bundleData: makeBundleData([
        {
          key: 'UnknownRoom/99',
          value: 'Mystery/O 24 1/24 1 0/0/1//Mystery',
        },
      ]),
      locations: { GameLocation: [] },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms[0].bundles[0].id).toBe('UnknownRoom/99');
  });

  it('handles quality names including Iridium', () => {
    const root = {
      bundleData: makeBundleData([
        {
          key: 'Pantry/0',
          value: 'Quality Bundle//24 1 1 24 1 2 24 1 4/0///Quality Bundle',
        },
      ]),
      locations: { GameLocation: [] },
    };

    const result = parseBundles(root, new Set());
    const items = result.rooms[0].bundles[0].items;
    expect(items[0].qualityName).toBe('Silver');
    expect(items[1].qualityName).toBe('Gold');
    expect(items[2].qualityName).toBe('Iridium');
  });

  it('handles unknown quality number', () => {
    const root = {
      bundleData: makeBundleData([
        {
          key: 'Pantry/0',
          value: 'Test//24 1 3/0///Test',
        },
      ]),
      locations: { GameLocation: [] },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms[0].bundles[0].items[0].qualityName).toBe('Quality 3');
  });

  it('uses internal name as display name when field 6 is absent', () => {
    const root = {
      bundleData: makeBundleData([
        {
          key: 'Pantry/0',
          value: 'InternalName/O 24 1/24 1 0/0/1',
        },
      ]),
      locations: { GameLocation: [] },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms[0].bundles[0].name).toBe('InternalName');
  });

  it('skips bundleData entries with empty key or value', () => {
    const root = {
      bundleData: {
        item: [
          { key: { string: '' }, value: { string: 'whatever' } },
          { key: { string: 'Pantry/0' }, value: { string: '' } },
        ],
      },
      locations: { GameLocation: [] },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms).toHaveLength(0);
  });

  it('uses items.length when itemsRequired field is missing', () => {
    const root = {
      bundleData: makeBundleData([
        {
          key: 'Pantry/0',
          value: 'Test/O 24 1/24 1 0 188 1 0/0',
        },
      ]),
      locations: { GameLocation: [] },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms[0].bundles[0].itemsRequired).toBe(2);
  });

  it('handles itemsRequired of 0 by falling back to items.length', () => {
    const root = {
      bundleData: makeBundleData([
        {
          key: 'Pantry/0',
          value: 'Test/O 24 1/24 1 0 188 1 0/0/0//Test',
        },
      ]),
      locations: { GameLocation: [] },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms[0].bundles[0].itemsRequired).toBe(2);
  });

  it('returns empty data for empty root', () => {
    const result = parseBundles({}, new Set());
    expect(result).toEqual({
      rooms: [],
      isJojaRoute: false,
      isCCComplete: false,
    });
  });

  it('handles reward with unknown type prefix', () => {
    const root = {
      bundleData: makeBundleData([
        {
          key: 'Pantry/0',
          value: 'Test/Z 999 1/24 1 0/0/1//Test',
        },
      ]),
      locations: { GameLocation: [] },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms[0].bundles[0].reward!.type).toBe('Z');
  });

  it('handles areasComplete with string "true" values', () => {
    const root = {
      bundleData: makeBundleData([
        {
          key: 'Pantry/0',
          value: 'Test/O 24 1/24 1 0/0/1//Test',
        },
      ]),
      locations: {
        GameLocation: [
          {
            name: 'CommunityCenter',
            bundles: {
              item: [
                {
                  key: { int: 0 },
                  value: { ArrayOfBoolean: { boolean: ['true'] } },
                },
              ],
            },
            areasComplete: { boolean: ['true', 'false'] },
          },
        ],
      },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms[0].bundles[0].items[0].completed).toBe(true);
    expect(result.rooms[0].complete).toBe(true);
  });

  it('handles multiple Joja mail flags', () => {
    const mail = new Set([
      'jojaBoilerRoom',
      'jojaCraftsRoom',
      'jojaFishTank',
      'jojaPantry',
      'jojaVault',
    ]);
    const result = parseBundles({ bundleData: makeBundleData([]) }, mail);
    expect(result.isJojaRoute).toBe(true);
  });

  it('handles reward string with fewer than 3 parts', () => {
    const root = {
      bundleData: makeBundleData([
        {
          key: 'Pantry/0',
          value: 'Test/O 465/24 1 0/0/1//Test',
        },
      ]),
      locations: { GameLocation: [] },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms[0].bundles[0].reward).toBeNull();
  });

  it('handles bundle definition with no items field (parts[2] undefined)', () => {
    const root = {
      bundleData: makeBundleData([
        {
          key: 'Pantry/0',
          value: 'Test/O 465 1',
        },
      ]),
      locations: { GameLocation: [] },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms[0].bundles[0].items).toHaveLength(0);
    expect(result.rooms[0].bundles[0].itemsRequired).toBe(0);
  });

  it('handles bundleData with only key populated (value empty)', () => {
    const root = {
      bundleData: {
        item: [{ key: { string: 'Pantry/0' }, value: { string: '' } }],
      },
      locations: { GameLocation: [] },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms).toHaveLength(0);
  });

  it('handles bundleData with only value populated (key empty)', () => {
    const root = {
      bundleData: {
        item: [{ key: { string: '' }, value: { string: 'Test/O 24 1/24 1 0/0/1//Test' } }],
      },
      locations: { GameLocation: [] },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms).toHaveLength(0);
  });

  it('handles bundleData items with missing key.string or value.string', () => {
    const root = {
      bundleData: {
        item: [
          { key: {}, value: { string: 'Test/O 24 1/24 1 0/0/1//Test' } },
          { key: { string: 'Pantry/0' }, value: {} },
        ],
      },
      locations: { GameLocation: [] },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms).toHaveLength(0);
  });

  it('handles rooms sorted by area index', () => {
    const root = {
      bundleData: makeBundleData([
        { key: 'Fish Tank/2', value: 'Fish/O 24 1/128 1 0/0/1//Fish' },
        { key: 'Pantry/0', value: 'Crops/O 24 1/24 1 0/0/1//Crops' },
      ]),
      locations: { GameLocation: [] },
    };

    const result = parseBundles(root, new Set());
    expect(result.rooms[0].name).toBe('Pantry');
    expect(result.rooms[1].name).toBe('Fish Tank');
  });
});
