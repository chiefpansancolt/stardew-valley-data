import { readFileSync } from 'fs';
import { join } from 'path';
import { LATEST_API_VERSION, parseSaveFile, resolveApiVersion } from '../../src/save-file';

const fixtureXml = readFileSync(join(__dirname, 'fixtures/minimal-save.xml'), 'utf-8');

describe('parseSaveFile()', () => {
  const data = parseSaveFile(fixtureXml);

  it('resolves API version', () => {
    expect(data.apiVersion).toBe(1);
  });

  it('parses player name and farm', () => {
    expect(data.player.name).toBe('TestPlayer');
    expect(data.player.farmName).toBe('TestFarm');
    expect(data.farm.name).toBe('TestFarm');
  });

  it('parses date', () => {
    expect(data.date.year).toBe(2);
    expect(data.date.season).toBe('summer');
    expect(data.date.day).toBe(15);
  });

  it('parses inventory', () => {
    expect(Array.isArray(data.inventory)).toBe(true);
    expect(data.inventory.length).toBeGreaterThanOrEqual(1);
    const parsnip = data.inventory.find((i) => i.name === 'Parsnip');
    expect(parsnip).toBeDefined();
    expect(parsnip!.id).toBe('24');
    expect(parsnip!.stack).toBe(5);
  });

  it('parses mail', () => {
    expect(Array.isArray(data.mail)).toBe(true);
    expect(data.mail).toContain('CF_Sewer');
  });

  it('parses events seen', () => {
    expect(Array.isArray(data.eventsSeen)).toBe(true);
    expect(data.eventsSeen).toContain('1000');
  });

  it('parses stats', () => {
    expect(data.stats.daysPlayed).toBe(56);
    expect(data.stats.stepsTaken).toBe(5000);
  });

  it('parses player skills', () => {
    expect(data.player.skills.farming.xp).toBe(1000);
    expect(data.player.skills.fishing.xp).toBe(500);
  });

  it('returns all expected top-level keys', () => {
    const expectedKeys = [
      'apiVersion',
      'player',
      'farm',
      'date',
      'inventory',
      'fishCaught',
      'itemsShipped',
      'museum',
      'friendships',
      'achievements',
      'activeQuests',
      'stardrops',
      'stats',
      'animals',
      'buildings',
      'cookingRecipes',
      'craftingRecipes',
      'bundles',
      'monstersKilled',
      'mail',
      'specialOrders',
      'professions',
      'booksRead',
      'eventsSeen',
      'secretNotes',
      'walnuts',
      'islandUpgrades',
      'children',
      'pets',
      'powers',
      'raccoons',
      'perfection',
      'mineProgress',
    ];
    for (const key of expectedKeys) {
      expect(data).toHaveProperty(key);
    }
  });

  it('re-exports resolveApiVersion and LATEST_API_VERSION', () => {
    expect(typeof resolveApiVersion).toBe('function');
    expect(typeof LATEST_API_VERSION).toBe('number');
    expect(resolveApiVersion('1.6.0')).toBe(LATEST_API_VERSION);
  });

  it('handles missing gameVersion by defaulting to empty string', () => {
    const xmlNoVersion = fixtureXml.replace(/<gameVersion>1.6.0<\/gameVersion>/, '');
    const result = parseSaveFile(xmlNoVersion);
    expect(result.apiVersion).toBe(1);
    expect(result.player.gameVersion).toBe('');
  });
});
