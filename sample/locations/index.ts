import { existsSync } from 'fs';
import { join } from 'path';
import { locations } from '../../src/modules/locations';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}]: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const query = locations();

  console.log('\n=== LOCATIONS ===');
  console.log(`  Total: ${query.count()}`);

  console.log('\n--- All locations (sorted by name) ---');
  for (const loc of query.sortByName().get()) {
    const hours = loc.openHours ? `${loc.openHours.open}–${loc.openHours.close}` : 'always open';
    const closed = loc.closed.length ? `  closed: ${loc.closed.join(', ')}` : '';
    console.log(`  ${loc.name.padEnd(26)} [${loc.category}]  ${hours}${closed}`);
    if (checkImage(loc.name, loc.image)) passed++;
    else failed++;
  }

  console.log('\n--- Pelican Town ---');
  for (const loc of query.byCategory('Pelican Town').get()) {
    console.log(`  ${loc.name}${loc.shop ? ` → ${loc.shop}` : ''}`);
  }

  console.log('\n--- Locations with shops ---');
  for (const loc of query.withShop().sortByName().get()) {
    console.log(`  ${loc.name.padEnd(26)} → ${loc.shop}`);
  }

  console.log('\n--- Buildings ---');
  for (const loc of query.byType('building').sortByName().get()) {
    console.log(`  ${loc.name}`);
  }

  console.log('\n--- Geographic locations ---');
  for (const loc of query.byType('location').sortByName().get()) {
    console.log(`  ${loc.name}`);
  }

  console.log('\n--- Always open ---');
  for (const loc of query.alwaysOpen().sortByName().get()) {
    console.log(`  ${loc.name}`);
  }

  console.log(`\nImages: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
