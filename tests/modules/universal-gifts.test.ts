import { universalGifts } from '@/modules/universal-gifts';

describe('universalGifts()', () => {
  const gifts = universalGifts();

  it('returns an object with all gift preference keys', () => {
    expect(gifts).toHaveProperty('loves');
    expect(gifts).toHaveProperty('likes');
    expect(gifts).toHaveProperty('neutrals');
    expect(gifts).toHaveProperty('dislikes');
    expect(gifts).toHaveProperty('hates');
  });

  it('each category is a non-empty array', () => {
    for (const key of ['loves', 'likes', 'neutrals', 'dislikes', 'hates'] as const) {
      expect(Array.isArray(gifts[key])).toBe(true);
      expect(gifts[key].length).toBeGreaterThan(0);
    }
  });

  it('items are strings', () => {
    for (const item of gifts.loves) {
      expect(typeof item).toBe('string');
    }
  });
});
