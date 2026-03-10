import { ToolQuery, tools } from '@/modules/tools';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('tools', () => tools());

describe('ToolQuery filters', () => {
  it('upgradeable() returns only upgradeable tools', () => {
    const result = tools().upgradeable().get();
    expect(result.length).toBeGreaterThan(0);
    for (const t of result) {
      expect(t.type).toBe('upgradeable');
    }
  });

  it('fishingRods() returns only fishing rods', () => {
    const result = tools().fishingRods().get();
    expect(result.length).toBeGreaterThan(0);
    for (const t of result) {
      expect(t.type).toBe('fishing-rod');
    }
  });

  it('canEnchant() returns only enchantable tools', () => {
    const result = tools().canEnchant().get();
    expect(result.length).toBeGreaterThan(0);
    for (const t of result) {
      expect(t.type === 'upgradeable' || t.type === 'fishing-rod').toBe(true);
    }
  });

  it('byType() filters by type string', () => {
    const backpacks = tools().byType('backpack').get();
    for (const t of backpacks) {
      expect(t.type).toBe('backpack');
    }
  });

  it('simple() returns only simple tools', () => {
    const result = tools().simple().get();
    expect(result.length).toBeGreaterThan(0);
    for (const t of result) {
      expect(t.type).toBe('simple');
    }
  });

  it('backpacks() returns only backpacks', () => {
    const result = tools().backpacks().get();
    expect(result.length).toBeGreaterThan(0);
    for (const t of result) {
      expect(t.type).toBe('backpack');
    }
  });
});

describe('ToolQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = tools().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testFilterImmutability(
  'upgradeable',
  () => tools(),
  (q) => (q as ToolQuery).upgradeable(),
);
testFilterImmutability(
  'fishingRods',
  () => tools(),
  (q) => (q as ToolQuery).fishingRods(),
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new ToolQuery().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(tools().sortByName().count()).toBeGreaterThan(0);
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = tools().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});
