import { LostBookQuery, lostBooks } from '@/modules/lost-books';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('lostBooks', () => lostBooks());

describe('LostBookQuery', () => {
  it('returns non-empty data', () => {
    expect(lostBooks().count()).toBeGreaterThan(0);
  });

  it('each book has an id and name', () => {
    const first = lostBooks().first()!;
    expect(first.id).toBeDefined();
    expect(first.name).toBeDefined();
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new LostBookQuery().count()).toBeGreaterThan(0);
  });
});
