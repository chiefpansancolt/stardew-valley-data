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
                  id: 'barn-uuid',
                  buildingType: 'Barn',
                  currentOccupants: 4,
                },
                {
                  id: 'coop-uuid',
                  buildingType: 'Coop',
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
      id: 'barn-uuid',
      type: 'Barn',
      animalCount: 4,
    });
    expect(result[1]).toEqual({
      id: 'coop-uuid',
      type: 'Coop',
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
                id: 'silo-uuid',
                buildingType: 'Silo',
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
