import { parsePlayer } from '../../../../src/save-file/parsers/v1/player';

describe('parsePlayer()', () => {
  const makePlayer = (overrides: Record<string, unknown> = {}) => ({
    name: 'TestPlayer',
    farmName: 'TestFarm',
    favoriteThing: 'Fishing',
    Gender: 'Male',
    money: 5000,
    totalMoneyEarned: 50000,
    spouse: 'Abigail',
    houseUpgradeLevel: 2,
    luckLevel: 0,
    maxItems: 36,
    trashCanLevel: 3,
    maxHealth: 100,
    maxStamina: 270,
    items: {
      Item: [
        { '@_xsi:type': 'Pickaxe', upgradeLevel: 4 },
        { '@_xsi:type': 'Axe', upgradeLevel: 3 },
        { '@_xsi:type': 'Hoe', upgradeLevel: 2 },
        { '@_xsi:type': 'WateringCan', upgradeLevel: 1 },
        { '@_xsi:type': 'MeleeWeapon', name: 'Galaxy Sword' },
      ],
    },
    experiencePoints: {
      int: [1000, 500, 300, 200, 100],
    },
    stats: {
      Values: {
        item: [
          { key: { string: 'MasteryExp' }, value: { unsignedInt: 5000 } },
          { key: { string: 'masteryLevelsSpent' }, value: { unsignedInt: 2 } },
          { key: { string: 'mastery_0' }, value: { unsignedInt: 1 } },
          { key: { string: 'mastery_1' }, value: { unsignedInt: 0 } },
          { key: { string: 'mastery_2' }, value: { unsignedInt: 1 } },
          { key: { string: 'mastery_3' }, value: { unsignedInt: 0 } },
          { key: { string: 'mastery_4' }, value: { unsignedInt: 0 } },
        ],
      },
    },
    ...overrides,
  });

  const makeRoot = (overrides: Record<string, unknown> = {}) => ({
    gameVersion: '1.6.14',
    ...overrides,
  });

  it('parses all player fields', () => {
    const result = parsePlayer(makePlayer(), makeRoot(), new Set());
    expect(result.name).toBe('TestPlayer');
    expect(result.farmName).toBe('TestFarm');
    expect(result.favoriteThing).toBe('Fishing');
    expect(result.gender).toBe('Male');
    expect(result.money).toBe(5000);
    expect(result.totalMoneyEarned).toBe(50000);
    expect(result.spouse).toBe('Abigail');
    expect(result.houseUpgradeLevel).toBe(2);
    expect(result.luckLevel).toBe(0);
    expect(result.maxItems).toBe(36);
    expect(result.maxHealth).toBe(100);
    expect(result.maxStamina).toBe(270);
    expect(result.gameVersion).toBe('1.6.14');
  });

  it('returns null for spouse when player has no spouse', () => {
    const player = makePlayer({ spouse: undefined });
    const result = parsePlayer(player, makeRoot(), new Set());
    expect(result.spouse).toBeNull();
  });

  it('returns null for spouse when spouse is empty string (falsy)', () => {
    const player = makePlayer({ spouse: '' });
    const result = parsePlayer(player, makeRoot(), new Set());
    expect(result.spouse).toBeNull();
  });

  it('returns null for spouse when spouse is null', () => {
    const player = makePlayer({ spouse: null });
    const result = parsePlayer(player, makeRoot(), new Set());
    expect(result.spouse).toBeNull();
  });

  it('parses skills from experience points', () => {
    const result = parsePlayer(makePlayer(), makeRoot(), new Set());
    expect(result.skills.farming).toEqual({ level: 3, xp: 1000 });
    expect(result.skills.fishing).toEqual({ level: 2, xp: 500 });
    expect(result.skills.foraging).toEqual({ level: 1, xp: 300 });
    expect(result.skills.mining).toEqual({ level: 1, xp: 200 });
    expect(result.skills.combat).toEqual({ level: 1, xp: 100 });
  });

  it('handles missing experience points', () => {
    const player = makePlayer({ experiencePoints: undefined });
    const result = parsePlayer(player, makeRoot(), new Set());
    expect(result.skills.farming).toEqual({ level: 0, xp: 0 });
    expect(result.skills.fishing).toEqual({ level: 0, xp: 0 });
  });

  it('parses mastery data', () => {
    const result = parsePlayer(makePlayer(), makeRoot(), new Set());
    expect(result.mastery.xp).toBe(5000);
    expect(result.mastery.levelsSpent).toBe(2);
    expect(result.mastery.perks).toHaveLength(5);
    expect(result.mastery.perks[0]).toEqual({
      id: 'farming',
      name: 'Farming Mastery',
      unlocked: true,
    });
    expect(result.mastery.perks[1].unlocked).toBe(false);
    expect(result.mastery.perks[2].unlocked).toBe(true);
  });

  it('handles missing mastery stats (all perks default to not unlocked)', () => {
    const player = makePlayer({ stats: {} });
    const result = parsePlayer(player, makeRoot(), new Set());
    expect(result.mastery.xp).toBe(0);
    expect(result.mastery.levelsSpent).toBe(0);
    for (const perk of result.mastery.perks) {
      expect(perk.unlocked).toBe(false);
    }
  });

  it('handles xp values at exact thresholds', () => {
    const player = makePlayer({
      experiencePoints: { int: [15000, 10000, 6900, 4800, 3300] },
    });
    const result = parsePlayer(player, makeRoot(), new Set());
    expect(result.skills.farming.level).toBe(10);
    expect(result.skills.fishing.level).toBe(9);
    expect(result.skills.foraging.level).toBe(8);
    expect(result.skills.mining.level).toBe(7);
    expect(result.skills.combat.level).toBe(6);
  });

  it('handles xp value of 0', () => {
    const player = makePlayer({
      experiencePoints: { int: [0, 0, 0, 0, 0] },
    });
    const result = parsePlayer(player, makeRoot(), new Set());
    expect(result.skills.farming.level).toBe(0);
  });

  it('parses tool levels from player inventory', () => {
    const result = parsePlayer(makePlayer(), makeRoot(), new Set());
    expect(result.toolLevels).toEqual({
      wateringCan: 1,
      pan: 0,
      pickaxe: 4,
      axe: 3,
      hoe: 2,
      trashCan: 3,
      fishingRod: -1,
    });
  });

  it('finds tools in location building chests', () => {
    const player = makePlayer({ items: { Item: [] } });
    const root = makeRoot({
      locations: {
        GameLocation: [
          {
            buildings: {
              Building: [
                {
                  indoors: {
                    objects: {
                      item: [
                        {
                          value: {
                            Object: {
                              items: {
                                Item: [
                                  { '@_xsi:type': 'Pan', upgradeLevel: 3 },
                                  { '@_xsi:type': 'WateringCan', upgradeLevel: 4 },
                                ],
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    });

    const result = parsePlayer(player, root, new Set());
    expect(result.toolLevels.pan).toBe(3);
    expect(result.toolLevels.wateringCan).toBe(4);
  });

  it('takes highest tool level when duplicates exist', () => {
    const player = makePlayer({
      items: {
        Item: [
          { '@_xsi:type': 'Pickaxe', upgradeLevel: 2 },
          { '@_xsi:type': 'Pickaxe', upgradeLevel: 4 },
        ],
      },
    });
    const result = parsePlayer(player, makeRoot(), new Set());
    expect(result.toolLevels.pickaxe).toBe(4);
  });

  it('defaults tool levels to 0 when no tools found', () => {
    const player = makePlayer({ items: { Item: [] }, trashCanLevel: 0 });
    const result = parsePlayer(player, makeRoot(), new Set());
    expect(result.toolLevels).toEqual({
      wateringCan: 0,
      pan: 0,
      pickaxe: 0,
      axe: 0,
      hoe: 0,
      trashCan: 0,
      fishingRod: -1,
    });
  });

  it('reads tool type from @_type fallback when @_xsi:type is absent', () => {
    const player = makePlayer({
      items: {
        Item: [{ '@_type': 'Hoe', upgradeLevel: 3 }],
      },
    });
    const result = parsePlayer(player, makeRoot(), new Set());
    expect(result.toolLevels.hoe).toBe(3);
  });

  it('does not downgrade tool level when lower duplicate exists', () => {
    const player = makePlayer({
      items: {
        Item: [
          { '@_xsi:type': 'Axe', upgradeLevel: 4 },
          { '@_xsi:type': 'Axe', upgradeLevel: 1 },
        ],
      },
    });
    const result = parsePlayer(player, makeRoot(), new Set());
    expect(result.toolLevels.axe).toBe(4);
  });

  it('handles missing items and locations gracefully', () => {
    const player = makePlayer({ items: undefined });
    const result = parsePlayer(player, makeRoot(), new Set());
    expect(result.toolLevels.pickaxe).toBe(0);
  });

  it('parses FishingRod level from rod name', () => {
    const player = makePlayer({
      items: {
        Item: [{ '@_xsi:type': 'FishingRod', name: 'Iridium Rod' }],
      },
    });
    const result = parsePlayer(player, makeRoot(), new Set());
    expect(result.toolLevels.fishingRod).toBe(3);
  });

  it('returns fishingRod -1 when rod name is unknown', () => {
    const player = makePlayer({
      items: {
        Item: [{ '@_xsi:type': 'FishingRod', name: 'Unknown Rod' }],
      },
    });
    const result = parsePlayer(player, makeRoot(), new Set());
    expect(result.toolLevels.fishingRod).toBe(-1);
  });

  it('takes highest fishing rod level when multiple rods present', () => {
    const player = makePlayer({
      items: {
        Item: [
          { '@_xsi:type': 'FishingRod', name: 'Bamboo Pole' },
          { '@_xsi:type': 'FishingRod', name: 'Iridium Rod' },
        ],
      },
    });
    const result = parsePlayer(player, makeRoot(), new Set());
    expect(result.toolLevels.fishingRod).toBe(3);
  });
});
