import { parseProfessions } from '../../../../src/save-file/parsers/v1/professions';

describe('parseProfessions()', () => {
  it('parses profession IDs into named entries', () => {
    const professions = { int: [0, 1] };
    const result = parseProfessions(professions);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(0);
    expect(result[0].name).toBeTruthy();
    expect(result[1].id).toBe(1);
    expect(result[1].name).toBeTruthy();
  });

  it('handles unknown profession IDs', () => {
    const professions = { int: [9999] };
    const result = parseProfessions(professions);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ id: 9999, name: 'Unknown(9999)' });
  });

  it('handles single int (not array)', () => {
    const professions = { int: 0 };
    const result = parseProfessions(professions);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(0);
  });

  it('returns empty array for undefined input', () => {
    expect(parseProfessions(undefined)).toEqual([]);
  });

  it('returns empty array for null input', () => {
    expect(parseProfessions(null)).toEqual([]);
  });
});
