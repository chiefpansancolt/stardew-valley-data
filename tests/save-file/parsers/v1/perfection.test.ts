import { parsePerfection } from '../../../../src/save-file/parsers/v1/perfection';

describe('parsePerfection()', () => {
  it('parses perfection data with Gold Clock and obelisks', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            buildings: {
              Building: [
                { buildingType: 'Gold Clock' },
                { buildingType: 'Earth Obelisk' },
                { buildingType: 'Water Obelisk' },
                { buildingType: 'Desert Obelisk' },
                { buildingType: 'Island Obelisk' },
                { buildingType: 'Barn' },
              ],
            },
          },
        ],
      },
      farmPerfect: true,
      perfectionWaivers: 2,
    };

    const result = parsePerfection(root);
    expect(result).toEqual({
      farmPerfect: true,
      waivers: 2,
      hasGoldClock: true,
      obelisks: ['Earth Obelisk', 'Water Obelisk', 'Desert Obelisk', 'Island Obelisk'],
    });
  });

  it('handles farmPerfect as string "true"', () => {
    const root = {
      farmPerfect: 'true',
      perfectionWaivers: 0,
    };

    const result = parsePerfection(root);
    expect(result.farmPerfect).toBe(true);
  });

  it('handles no Farm location', () => {
    const root = {
      locations: {
        GameLocation: [{ name: 'Town' }],
      },
      farmPerfect: false,
      perfectionWaivers: 0,
    };

    const result = parsePerfection(root);
    expect(result.hasGoldClock).toBe(false);
    expect(result.obelisks).toEqual([]);
  });

  it('does not duplicate obelisk types', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            buildings: {
              Building: [{ buildingType: 'Earth Obelisk' }, { buildingType: 'Earth Obelisk' }],
            },
          },
        ],
      },
      farmPerfect: false,
      perfectionWaivers: 0,
    };

    const result = parsePerfection(root);
    expect(result.obelisks).toEqual(['Earth Obelisk']);
  });

  it('returns defaults for empty root', () => {
    const result = parsePerfection({});
    expect(result).toEqual({
      farmPerfect: false,
      waivers: 0,
      hasGoldClock: false,
      obelisks: [],
    });
  });
});
