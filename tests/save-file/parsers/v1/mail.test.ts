import {
  parseBooksRead,
  parseMail,
  parseSpecialOrders,
} from '../../../../src/save-file/parsers/v1/mail';

describe('parseMail()', () => {
  it('parses mail strings', () => {
    const mailReceived = { string: ['CF_Sewer', 'ccIsComplete', 'HasMagnifyingGlass'] };
    const result = parseMail(mailReceived);
    expect(result).toEqual(['CF_Sewer', 'ccIsComplete', 'HasMagnifyingGlass']);
  });

  it('handles single string', () => {
    const mailReceived = { string: 'CF_Sewer' };
    const result = parseMail(mailReceived);
    expect(result).toEqual(['CF_Sewer']);
  });

  it('filters out empty strings', () => {
    const mailReceived = { string: ['CF_Sewer', ''] };
    const result = parseMail(mailReceived);
    expect(result).toEqual(['CF_Sewer']);
  });

  it('returns empty array for undefined', () => {
    expect(parseMail(undefined)).toEqual([]);
  });
});

describe('parseSpecialOrders()', () => {
  it('splits completed orders into town and Qi categories', () => {
    const root = {
      completedSpecialOrders: {
        string: ['Robin', 'QiChallenge2'],
      },
    };

    const result = parseSpecialOrders(root);
    expect(result.completed).toEqual(['Robin', 'QiChallenge2']);
    expect(result.qiCompleted).toEqual(['QiChallenge2']);
  });

  it('returns empty arrays for empty root', () => {
    const result = parseSpecialOrders({});
    expect(result).toEqual({ completed: [], qiCompleted: [] });
  });

  it('filters out empty strings', () => {
    const root = {
      completedSpecialOrders: { string: ['Robin', ''] },
    };

    const result = parseSpecialOrders(root);
    expect(result.completed).toEqual(['Robin']);
  });
});

describe('parseBooksRead()', () => {
  it('extracts book IDs from player stats', () => {
    const player = {
      stats: {
        Values: {
          item: [
            { key: { string: 'Book_Trash' }, value: { unsignedInt: 1 } },
            { key: { string: 'Book_Diamonds' }, value: { unsignedInt: 1 } },
            { key: { string: 'daysPlayed' }, value: { unsignedInt: 56 } },
          ],
        },
      },
    };

    const result = parseBooksRead(player);
    expect(result).toEqual(['Trash', 'Diamonds']);
  });

  it('returns empty array when no stats', () => {
    expect(parseBooksRead({})).toEqual([]);
  });

  it('returns empty array when no book entries', () => {
    const player = {
      stats: {
        Values: {
          item: [{ key: { string: 'daysPlayed' }, value: { unsignedInt: 56 } }],
        },
      },
    };

    expect(parseBooksRead(player)).toEqual([]);
  });

  it('handles single item (not array)', () => {
    const player = {
      stats: {
        Values: {
          item: { key: { string: 'Book_Speed' }, value: { unsignedInt: 1 } },
        },
      },
    };

    const result = parseBooksRead(player);
    expect(result).toEqual(['Speed']);
  });

  it('handles items with missing key.string (falls back to empty string)', () => {
    const player = {
      stats: {
        Values: {
          item: [
            { key: {}, value: { unsignedInt: 1 } },
            { key: { string: 'Book_Trash' }, value: { unsignedInt: 1 } },
          ],
        },
      },
    };

    const result = parseBooksRead(player);
    expect(result).toEqual(['Trash']);
  });

  it('handles items with undefined key', () => {
    const player = {
      stats: {
        Values: {
          item: [
            { value: { unsignedInt: 1 } },
            { key: { string: 'Book_Diamonds' }, value: { unsignedInt: 1 } },
          ],
        },
      },
    };

    const result = parseBooksRead(player);
    expect(result).toEqual(['Diamonds']);
  });
});
