import { parseBuildings } from '../../../../src/save-file/parsers/v1/buildings';

describe('parseBuildings()', () => {
  it('parses buildings from Farm location', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            buildings: {
              Building: [
                {
                  buildingType: 'Barn',
                  tileX: 40,
                  tileY: 20,
                  currentOccupants: 4,
                },
                {
                  buildingType: 'Coop',
                  tileX: 50,
                  tileY: 25,
                  currentOccupants: 8,
                },
              ],
            },
          },
        ],
      },
    };

    const result = parseBuildings(root);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      type: 'Barn',
      tileX: 40,
      tileY: 20,
      animalCount: 4,
    });
    expect(result[1]).toEqual({
      type: 'Coop',
      tileX: 50,
      tileY: 25,
      animalCount: 8,
    });
  });

  it('returns empty array when no Farm location', () => {
    const root = {
      locations: {
        GameLocation: [{ name: 'Town' }],
      },
    };

    expect(parseBuildings(root)).toEqual([]);
  });

  it('returns empty array for empty root', () => {
    expect(parseBuildings({})).toEqual([]);
  });

  it('handles single building (not array)', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            buildings: {
              Building: {
                buildingType: 'Silo',
                tileX: 30,
                tileY: 10,
                currentOccupants: 0,
              },
            },
          },
        ],
      },
    };

    const result = parseBuildings(root);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('Silo');
  });
});
