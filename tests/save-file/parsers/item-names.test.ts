import {
  resolveBigCraftableName,
  resolveItemName,
  resolveRewardName,
} from '../../../src/save-file/parsers/item-names';

describe('resolveItemName()', () => {
  it('resolves a known crop item ID to its name', () => {
    const name = resolveItemName('24');
    expect(name).toBe('Parsnip');
  });

  it('returns fallback string for unknown ID', () => {
    expect(resolveItemName('999999')).toBe('Item 999999');
  });

  it('resolves a fish item ID', () => {
    const name = resolveItemName('128');
    expect(name).toBe('Pufferfish');
  });

  it('resolves a forageable item ID', () => {
    const name = resolveItemName('16');
    expect(name).toBe('Wild Horseradish');
  });

  it('resolves seed IDs from crops', () => {
    const name = resolveItemName('472');
    expect(name).toBe('Parsnip Seeds');
  });

  it('resolves tree produce', () => {
    const name = resolveItemName('613');
    expect(name).toBe('Apple');
  });

  it('resolves animal produce', () => {
    const name = resolveItemName('176');
    expect(name).toBe('Egg');
  });

  it('resolves crafting ingredient IDs', () => {
    const name = resolveItemName('388');
    expect(name).toBe('Wood');
  });

  it('resolves cooking recipe item ID', () => {
    const name = resolveItemName('194');
    expect(name).toBe('Fried Egg');
  });

  it('resolves ring item ID', () => {
    const name = resolveItemName('516');
    expect(name).toBe('Small Glow Ring');
  });

  it('resolves mineral item ID', () => {
    const name = resolveItemName('80');
    expect(name).toBe('Quartz');
  });
});

describe('resolveBigCraftableName()', () => {
  it('resolves a known BigCraftable ID', () => {
    const name = resolveBigCraftableName('10');
    expect(name).toBe('Bee House');
  });

  it('returns fallback for unknown BigCraftable ID', () => {
    expect(resolveBigCraftableName('999999')).toBe('BigCraftable 999999');
  });
});

describe('resolveRewardName()', () => {
  it('delegates to resolveBigCraftableName for BO type', () => {
    const name = resolveRewardName('BO', '10');
    expect(name).toBe('Bee House');
  });

  it('delegates to resolveItemName for O type', () => {
    const name = resolveRewardName('O', '24');
    expect(name).toBe('Parsnip');
  });

  it('delegates to resolveItemName for unknown type', () => {
    const name = resolveRewardName('X', '24');
    expect(name).toBe('Parsnip');
  });
});
