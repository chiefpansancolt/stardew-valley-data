import { parseJoja } from '../../../../src/save-file/parsers/v1/joja';

describe('parseJoja()', () => {
  it('returns all false when no mail flags or events are present', () => {
    const result = parseJoja(new Set(), new Set());
    expect(result.isMember).toBe(false);
    expect(result.completed).toBe(false);
    expect(result.developments).toHaveLength(5);
    result.developments.forEach((d) => {
      expect(d.purchased).toBe(false);
    });
  });

  it('detects Joja membership from JojaMember mail flag', () => {
    const result = parseJoja(new Set(['JojaMember']), new Set());
    expect(result.isMember).toBe(true);
  });

  it('detects Joja completion from event 502261', () => {
    const result = parseJoja(new Set(), new Set(['502261']));
    expect(result.completed).toBe(true);
  });

  it('parses individual development purchases', () => {
    const mail = new Set(['jojaBoilerRoom', 'jojaVault']);
    const result = parseJoja(mail, new Set());

    const boiler = result.developments.find((d) => d.id === 'jojaBoilerRoom');
    const vault = result.developments.find((d) => d.id === 'jojaVault');
    const pantry = result.developments.find((d) => d.id === 'jojaPantry');

    expect(boiler?.purchased).toBe(true);
    expect(vault?.purchased).toBe(true);
    expect(pantry?.purchased).toBe(false);
  });

  it('parses all development purchases', () => {
    const mail = new Set([
      'jojaPantry',
      'jojaCraftsRoom',
      'jojaFishTank',
      'jojaBoilerRoom',
      'jojaVault',
    ]);
    const result = parseJoja(mail, new Set());
    result.developments.forEach((d) => {
      expect(d.purchased).toBe(true);
    });
  });

  it('returns correct development IDs matching data file', () => {
    const result = parseJoja(new Set(), new Set());
    const ids = result.developments.map((d) => d.id);
    expect(ids).toContain('jojaPantry');
    expect(ids).toContain('jojaCraftsRoom');
    expect(ids).toContain('jojaFishTank');
    expect(ids).toContain('jojaBoilerRoom');
    expect(ids).toContain('jojaVault');
  });

  it('parses a fully completed Joja route', () => {
    const mail = new Set([
      'JojaMember',
      'jojaPantry',
      'jojaCraftsRoom',
      'jojaFishTank',
      'jojaBoilerRoom',
      'jojaVault',
    ]);
    const events = new Set(['502261']);
    const result = parseJoja(mail, events);
    expect(result.isMember).toBe(true);
    expect(result.completed).toBe(true);
    result.developments.forEach((d) => {
      expect(d.purchased).toBe(true);
    });
  });
});
