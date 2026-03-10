import { collections } from '@/modules/collections';

describe('CollectionsQuery', () => {
  it('itemsShipped() returns non-empty results', () => {
    expect(collections().itemsShipped().count()).toBeGreaterThan(0);
  });

  it('fish() returns non-empty results', () => {
    expect(collections().fish().count()).toBeGreaterThan(0);
  });

  it('artifacts() returns non-empty results', () => {
    expect(collections().artifacts().count()).toBeGreaterThan(0);
  });

  it('minerals() returns non-empty results', () => {
    expect(collections().minerals().count()).toBeGreaterThan(0);
  });

  it('cooking() returns non-empty results', () => {
    expect(collections().cooking().count()).toBeGreaterThan(0);
  });

  it('crafting() returns non-empty results', () => {
    expect(collections().crafting().count()).toBeGreaterThan(0);
  });

  it('each collection item has id, name, image', () => {
    const item = collections().fish().first()!;
    expect(item.id).toBeDefined();
    expect(item.name).toBeDefined();
    expect(item.image).toBeDefined();
  });
});
