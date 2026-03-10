/**
 * Edge-case test for item-names.ts: crops without seedId/seedName.
 * Uses jest.mock to provide crop data missing seedId fields.
 */

const actualCrops = jest.requireActual('@/data/crops.json') as Array<Record<string, unknown>>;
const cropsWithoutSeed = actualCrops.map((crop, i) => {
  if (i === 0) {
    const { seedId, seedName, ...rest } = crop;
    return rest;
  }
  return crop;
});

jest.mock('@/data/crops.json', () => cropsWithoutSeed);

describe('resolveItemName() with crop missing seedId', () => {
  it('still resolves other items correctly when a crop lacks seedId', () => {
    const { resolveItemName } = require('../../../src/save-file/parsers/item-names');
    const firstCrop = actualCrops[0] as { id: string; name: string; seedId: string };
    expect(resolveItemName(firstCrop.id)).toBe(firstCrop.name);
    expect(resolveItemName(firstCrop.seedId)).toBe(`Item ${firstCrop.seedId}`);
  });
});
