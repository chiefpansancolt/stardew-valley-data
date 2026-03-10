import { parseMuseum } from '../../../../src/save-file/parsers/v1/museum';

describe('parseMuseum()', () => {
  it('parses museum donations from ArchaeologyHouse', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'ArchaeologyHouse',
            museumPieces: {
              item: [{ value: { string: '96' } }, { value: { string: '97' } }],
            },
          },
        ],
      },
    };

    const result = parseMuseum(root, {});
    expect(result.donations).toEqual(['96', '97']);
  });

  it('parses artifacts found with ArrayOfInt', () => {
    const player = {
      archaeologyFound: {
        item: [
          {
            key: { string: '96' },
            value: { ArrayOfInt: { int: [3, 1] } },
          },
        ],
      },
      mineralsFound: undefined,
    };

    const result = parseMuseum({}, player);
    expect(result.artifactsFound).toEqual([{ id: '96', count: 3 }]);
  });

  it('parses minerals found with simple int count', () => {
    const player = {
      archaeologyFound: undefined,
      mineralsFound: {
        item: [
          {
            key: { string: '80' },
            value: { int: 5 },
          },
        ],
      },
    };

    const result = parseMuseum({}, player);
    expect(result.mineralsFound).toEqual([{ id: '80', count: 5 }]);
  });

  it('skips entries with empty id', () => {
    const player = {
      archaeologyFound: {
        item: [
          {
            key: { string: '' },
            value: { int: 1 },
          },
        ],
      },
      mineralsFound: undefined,
    };

    const result = parseMuseum({}, player);
    expect(result.artifactsFound).toEqual([]);
  });

  it('returns empty donations when no ArchaeologyHouse', () => {
    const root = {
      locations: {
        GameLocation: [{ name: 'Town' }],
      },
    };

    const result = parseMuseum(root, {});
    expect(result.donations).toEqual([]);
  });

  it('returns empty arrays for empty inputs', () => {
    const result = parseMuseum({}, {});
    expect(result).toEqual({
      donations: [],
      artifactsFound: [],
      mineralsFound: [],
    });
  });

  it('handles ArrayOfInt with empty int array', () => {
    const player = {
      archaeologyFound: {
        item: [
          {
            key: { string: '96' },
            value: { ArrayOfInt: { int: [] } },
          },
        ],
      },
      mineralsFound: undefined,
    };

    const result = parseMuseum({}, player);
    expect(result.artifactsFound).toEqual([{ id: '96', count: 0 }]);
  });

  it('filters out empty donation strings', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'ArchaeologyHouse',
            museumPieces: {
              item: [{ value: { string: '96' } }, { value: {} }],
            },
          },
        ],
      },
    };

    const result = parseMuseum(root, {});
    expect(result.donations).toEqual(['96']);
  });
});
