import { parseFriendships } from '../../../../src/save-file/parsers/v1/friendships';

describe('parseFriendships()', () => {
  it('parses friendship entries with hearts calculated', () => {
    const friendshipData = {
      item: [
        {
          key: { string: 'Abigail' },
          value: {
            Friendship: {
              Points: 1500,
              Status: 'Friendly',
              GiftsThisWeek: 1,
            },
          },
        },
        {
          key: { string: 'Shane' },
          value: {
            Friendship: {
              Points: 750,
              Status: 'Dating',
              GiftsThisWeek: 2,
            },
          },
        },
      ],
    };

    const result = parseFriendships(friendshipData);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      name: 'Abigail',
      points: 1500,
      hearts: 6,
      status: 'Friendly',
      giftsThisWeek: 1,
    });
    expect(result[1]).toEqual({
      name: 'Shane',
      points: 750,
      hearts: 3,
      status: 'Dating',
      giftsThisWeek: 2,
    });
  });

  it('skips entries with empty name', () => {
    const friendshipData = {
      item: [
        {
          key: { string: '' },
          value: { Friendship: { Points: 100, Status: 'Friendly', GiftsThisWeek: 0 } },
        },
      ],
    };

    expect(parseFriendships(friendshipData)).toEqual([]);
  });

  it('uses default status "Friendly" when missing', () => {
    const friendshipData = {
      item: [
        {
          key: { string: 'Alex' },
          value: { Friendship: { Points: 500 } },
        },
      ],
    };

    const result = parseFriendships(friendshipData);
    expect(result[0].status).toBe('Friendly');
  });

  it('returns empty array for undefined input', () => {
    expect(parseFriendships(undefined)).toEqual([]);
  });

  it('returns empty array for null input', () => {
    expect(parseFriendships(null)).toEqual([]);
  });

  it('sorts results by points descending', () => {
    const friendshipData = {
      item: [
        {
          key: { string: 'Low' },
          value: { Friendship: { Points: 100, Status: 'Friendly', GiftsThisWeek: 0 } },
        },
        {
          key: { string: 'High' },
          value: { Friendship: { Points: 2000, Status: 'Friendly', GiftsThisWeek: 0 } },
        },
      ],
    };

    const result = parseFriendships(friendshipData);
    expect(result[0].name).toBe('High');
    expect(result[1].name).toBe('Low');
  });
});
