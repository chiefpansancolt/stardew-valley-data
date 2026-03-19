import { search } from '@/modules/search';

describe('search()', () => {
  it('finds items by name substring', () => {
    const results = search('Parsnip');
    expect(results.length).toBeGreaterThan(0);
    const names = results.map((r) => r.name.toLowerCase());
    expect(names.some((n) => n.includes('parsnip'))).toBe(true);
  });

  it('is case-insensitive', () => {
    const upper = search('PARSNIP');
    const lower = search('parsnip');
    expect(upper.length).toBe(lower.length);
  });

  it('returns empty for non-existent query', () => {
    expect(search('zzzzznonexistent999')).toEqual([]);
  });

  it('filters by kinds when provided', () => {
    const cropOnly = search('Parsnip', ['crop']);
    for (const r of cropOnly) {
      expect(r.kind).toBe('crop');
    }
  });

  it('each result has required fields', () => {
    const results = search('Sword');
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) {
      expect(r.id).toBeDefined();
      expect(r.name).toBeDefined();
      expect(r.kind).toBeDefined();
    }
  });

  it('deduplicates results by kind + id', () => {
    const results = search('Egg');
    const keys = results.map((r) => `${r.kind}:${r.id}`);
    const unique = new Set(keys);
    expect(keys.length).toBe(unique.size);
  });

  it('merges parents when same item comes from multiple sources', () => {
    const results = search('Egg');
    const eggProduce = results.find((r) => r.kind === 'animal-produce' && r.name === 'Egg');
    expect(eggProduce).toBeDefined();
    expect(eggProduce!.parents).toBeDefined();
    expect(eggProduce!.parents!.length).toBeGreaterThanOrEqual(2);
  });

  it('finds fruit trees by name', () => {
    const results = search('Apricot Tree');
    const fruitTree = results.find((r) => r.kind === 'fruit-tree');
    expect(fruitTree).toBeDefined();
    expect(fruitTree!.name).toBe('Apricot Tree');
    expect(fruitTree!.sellPrice).toBeNull();
  });

  it('finds fruit tree produce by name', () => {
    const results = search('Apricot', ['fruit-tree-produce']);
    expect(results.length).toBeGreaterThan(0);
    const produce = results[0];
    expect(produce.kind).toBe('fruit-tree-produce');
    expect(produce.parents).toBeDefined();
    expect(produce.parents!.length).toBe(1);
  });

  it('finds wild trees by name', () => {
    const results = search('Oak Tree', ['wild-tree']);
    expect(results.length).toBe(1);
    expect(results[0].kind).toBe('wild-tree');
    expect(results[0].sellPrice).toBeNull();
  });

  it('finds wild tree seeds by name', () => {
    const results = search('Acorn', ['wild-tree-seed']);
    expect(results.length).toBe(1);
    expect(results[0].kind).toBe('wild-tree-seed');
    expect(results[0].name).toBe('Acorn');
  });

  it('finds wild tree tapper products by name', () => {
    const results = search('Oak Resin', ['wild-tree-tapper']);
    expect(results.length).toBe(1);
    expect(results[0].kind).toBe('wild-tree-tapper');
    expect(results[0].parents).toBeDefined();
  });

  it('finds animals by name', () => {
    const results = search('White Chicken', ['animal']);
    expect(results.length).toBe(1);
    expect(results[0].kind).toBe('animal');
    expect(results[0].sellPrice).toBeNull();
  });

  it('finds monsters by name', () => {
    const results = search('Green Slime', ['monster']);
    expect(results.length).toBe(1);
    expect(results[0].kind).toBe('monster');
    expect(results[0].sellPrice).toBeNull();
  });

  it('finds monster loot by name', () => {
    const results = search('Bug Meat', ['monster-loot']);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].kind).toBe('monster-loot');
  });

  it('finds rings by name', () => {
    const results = search('Small Glow Ring', ['ring']);
    expect(results.length).toBe(1);
    expect(results[0].kind).toBe('ring');
  });

  it('finds fishing rod by level name', () => {
    const results = search('Iridium Rod', ['tool']);
    expect(results.length).toBeGreaterThan(0);
    const rod = results.find((r) => r.name === 'Iridium Rod');
    expect(rod).toBeDefined();
    expect(rod!.kind).toBe('tool');
  });

  it('finds upgradeable tools by name', () => {
    const results = search('Hoe', ['tool']);
    expect(results.length).toBeGreaterThan(0);
    const hoe = results.find((r) => r.name === 'Hoe');
    expect(hoe).toBeDefined();
    expect(hoe!.kind).toBe('tool');
    expect(hoe!.image).toBeDefined();
  });

  it('finds standalone tools by name', () => {
    const results = search('Milk Pail', ['tool']);
    expect(results.length).toBe(1);
    expect(results[0].kind).toBe('tool');
  });

  it('finds artisan goods by name', () => {
    const results = search('Honey', ['artisan-good']);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].kind).toBe('artisan-good');
  });

  it('finds hats by name', () => {
    const results = search("Abigail's Bow", ['hat']);
    expect(results.length).toBe(1);
    expect(results[0].kind).toBe('hat');
    expect(results[0].sellPrice).toBeNull();
  });

  it('finds footwear by name', () => {
    const results = search('Sneakers', ['footwear']);
    expect(results.length).toBe(1);
    expect(results[0].kind).toBe('footwear');
    expect(results[0].sellPrice).toBeNull();
  });

  it('finds forageables by name', () => {
    const results = search('Blackberry', ['forageable']);
    expect(results.length).toBe(1);
    expect(results[0].kind).toBe('forageable');
  });

  it('finds fish by name', () => {
    const results = search('Pufferfish', ['fish']);
    expect(results.length).toBe(1);
    expect(results[0].kind).toBe('fish');
  });

  it('finds bait by name', () => {
    const results = search('Bait', ['bait']);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].kind).toBe('bait');
  });

  it('finds tackle by name', () => {
    const results = search('Barbed Hook', ['tackle']);
    expect(results.length).toBe(1);
    expect(results[0].kind).toBe('tackle');
  });

  it('finds geodes by name', () => {
    const results = search('Geode', ['geode']);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].kind).toBe('geode');
  });

  it('finds mineral resources by name', () => {
    const results = search('Coal', ['mineral-resource']);
    expect(results.length).toBe(1);
    expect(results[0].kind).toBe('mineral-resource');
  });

  it('finds mining nodes by name', () => {
    const results = search('Copper Node', ['mining-node']);
    expect(results.length).toBe(1);
    expect(results[0].kind).toBe('mining-node');
    expect(results[0].sellPrice).toBeNull();
  });
});
