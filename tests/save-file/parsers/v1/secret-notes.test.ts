import { parseSecretNotes } from '../../../../src/save-file/parsers/v1/secret-notes';

describe('parseSecretNotes()', () => {
  it('separates secret notes from journal scraps', () => {
    const player = {
      secretNotesSeen: { int: [1, 5, 10, 1000, 1005] },
      hasMagnifyingGlass: true,
    };

    const result = parseSecretNotes(player, new Set(), new Set());
    expect(result.notesFound).toEqual([1, 5, 10]);
    expect(result.journalScrapsFound).toEqual([0, 5]);
    expect(result.hasMagnifyingGlass).toBe(true);
  });

  it('detects magnifying glass from mail flag', () => {
    const player = {
      secretNotesSeen: { int: [] },
    };

    const mail = new Set(['HasMagnifyingGlass']);
    const result = parseSecretNotes(player, mail, new Set());
    expect(result.hasMagnifyingGlass).toBe(true);
  });

  it('detects magnifying glass from player field as string "true"', () => {
    const player = {
      secretNotesSeen: { int: [] },
      hasMagnifyingGlass: 'true',
    };

    const result = parseSecretNotes(player, new Set(), new Set());
    expect(result.hasMagnifyingGlass).toBe(true);
  });

  it('returns false for magnifying glass when not present', () => {
    const player = {
      secretNotesSeen: { int: [] },
      hasMagnifyingGlass: false,
    };

    const result = parseSecretNotes(player, new Set(), new Set());
    expect(result.hasMagnifyingGlass).toBe(false);
  });

  it('handles empty secretNotesSeen', () => {
    const player = { secretNotesSeen: undefined };
    const result = parseSecretNotes(player, new Set(), new Set());
    expect(result.notesFound).toEqual([]);
    expect(result.journalScrapsFound).toEqual([]);
  });
});
