import { parseMineProgress } from '../../../../src/save-file/parsers/v1/mine-progress';

describe('parseMineProgress()', () => {
  it('parses mine progress with deepest level below 120', () => {
    const player = { deepestMineLevel: 80 };
    const root = { mine_lowestLevelReached: 80 };
    const mail = new Set<string>();

    const result = parseMineProgress(player, root, mail);
    expect(result.deepestMineLevel).toBe(80);
    expect(result.deepestSkullCavernLevel).toBe(0);
    expect(result.hasRustyKey).toBe(false);
    expect(result.hasSkullKey).toBe(false);
  });

  it('parses mine progress with deepest level above 120 (Skull Cavern)', () => {
    const player = { deepestMineLevel: 150 };
    const root = { mine_lowestLevelReached: 150 };
    const mail = new Set(['HasRustyKey', 'HasSkullKey']);

    const result = parseMineProgress(player, root, mail);
    expect(result.deepestMineLevel).toBe(120);
    expect(result.deepestSkullCavernLevel).toBe(30);
    expect(result.hasRustyKey).toBe(true);
    expect(result.hasSkullKey).toBe(true);
  });

  it('caps deepestMineLevel at 120', () => {
    const player = { deepestMineLevel: 200 };
    const result = parseMineProgress(player, {}, new Set());
    expect(result.deepestMineLevel).toBe(120);
  });

  it('detects hasRustyKey from HasRustyKey mail flag', () => {
    const result = parseMineProgress({ deepestMineLevel: 50 }, {}, new Set(['HasRustyKey']));
    expect(result.hasRustyKey).toBe(true);
  });

  it('detects hasRustyKey from ccBoilerRoom mail flag', () => {
    const result = parseMineProgress({ deepestMineLevel: 50 }, {}, new Set(['ccBoilerRoom']));
    expect(result.hasRustyKey).toBe(true);
  });

  it('detects hasRustyKey from mine_lowestLevelReached >= 120', () => {
    const result = parseMineProgress(
      { deepestMineLevel: 50 },
      { mine_lowestLevelReached: 120 },
      new Set(),
    );
    expect(result.hasRustyKey).toBe(true);
  });

  it('hasRustyKey is false when no condition met', () => {
    const result = parseMineProgress(
      { deepestMineLevel: 50 },
      { mine_lowestLevelReached: 100 },
      new Set(),
    );
    expect(result.hasRustyKey).toBe(false);
  });

  it('detects hasSkullKey from HasSkullKey mail flag', () => {
    const result = parseMineProgress({ deepestMineLevel: 50 }, {}, new Set(['HasSkullKey']));
    expect(result.hasSkullKey).toBe(true);
  });

  it('detects hasSkullKey from deepestMineLevel >= 120', () => {
    const result = parseMineProgress({ deepestMineLevel: 120 }, {}, new Set());
    expect(result.hasSkullKey).toBe(true);
  });

  it('hasSkullKey is false when deepest < 120 and no mail flag', () => {
    const result = parseMineProgress({ deepestMineLevel: 119 }, {}, new Set());
    expect(result.hasSkullKey).toBe(false);
  });

  it('handles deepestMineLevel exactly at 120', () => {
    const result = parseMineProgress({ deepestMineLevel: 120 }, {}, new Set());
    expect(result.deepestMineLevel).toBe(120);
    expect(result.deepestSkullCavernLevel).toBe(0);
    expect(result.hasSkullKey).toBe(true);
  });

  it('handles missing deepestMineLevel (defaults to 0)', () => {
    const result = parseMineProgress({}, {}, new Set());
    expect(result.deepestMineLevel).toBe(0);
    expect(result.deepestSkullCavernLevel).toBe(0);
  });
});
