import { search } from '@/modules/search';

/**
 * Edge-case tests for search() defensive branches that can't be hit with real data.
 * Uses jest.mock to simulate missing monster references and tool images.
 */

jest.mock('@/modules/monsters', () => {
  const actual = jest.requireActual('@/modules/monsters');
  return {
    ...actual,
    monsters: () => ({
      ...actual.monsters(),
      // Override find to return a fake monster for a specific ID
      find: (id: string) => {
        if (id === '__MOCK_FOUND__') return { id: 'M1', name: 'MockMonster' };
        if (id === '__MOCK_MISSING__') return undefined;
        return actual.monsters().find(id);
      },
      get: () => actual.monsters().get(),
    }),
    monsterLoot: () => {
      const realLoot = actual.monsterLoot().get();
      return {
        ...actual.monsterLoot(),
        get: () => [
          ...realLoot,
          {
            id: 'mock-loot-found',
            name: 'MockLootFound',
            image: 'images/mock.png',
            sellPrice: 10,
            droppedBy: ['__MOCK_FOUND__'],
          },
          {
            id: 'mock-loot-missing',
            name: 'MockLootMissing',
            image: 'images/mock.png',
            sellPrice: 10,
            droppedBy: ['__MOCK_MISSING__'],
          },
        ],
      };
    },
  };
});

jest.mock('@/modules/tools', () => {
  const actual = jest.requireActual('@/modules/tools');
  return {
    ...actual,
    tools: () => ({
      ...actual.tools(),
      get: () => [
        ...actual.tools().get(),
        {
          id: 'mock-no-image-tool',
          name: 'MockNoImageTool',
          type: 'upgradeable' as const,
          levels: [{ level: 1, image: null }],
        },
      ],
    }),
  };
});

describe('search() defensive branch coverage', () => {
  it('includes parent when monster IS found by droppedBy ID', () => {
    const results = search('MockLootFound', ['monster-loot']);
    expect(results.length).toBeGreaterThan(0);
    const mockResult = results.find((r) => r.name === 'MockLootFound');
    expect(mockResult).toBeDefined();
    expect(mockResult!.parents).toBeDefined();
    expect(mockResult!.parents![0].name).toBe('MockMonster');
  });

  it('returns undefined parent when monster ID not found in monsters()', () => {
    const results = search('MockLootMissing', ['monster-loot']);
    expect(results.length).toBeGreaterThan(0);
    const mockResult = results.find((r) => r.name === 'MockLootMissing');
    expect(mockResult).toBeDefined();
    expect(mockResult!.parents).toBeUndefined();
  });

  it('skips upgradeable tools where no level has an image', () => {
    const results = search('MockNoImageTool', ['tool']);
    expect(results.length).toBe(0);
  });
});
