import { existsSync } from 'fs';
import { join } from 'path';
import { concessions } from '../../src/modules/concessions';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}]: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const all = concessions();

  console.log('\n=== CONCESSIONS ===');
  console.log(`  Items: ${all.count()}`);

  console.log('\n--- By price (asc) ---');
  for (const item of all.sortByPrice().get()) {
    const tags = item.tags.length ? `  [${item.tags.join(', ')}]` : '';
    console.log(`  ${item.name.padEnd(30)} ${item.price}g${tags}`);
    if (checkImage(item.name, item.image)) passed++;
    else failed++;
  }

  console.log('\n--- Healthy options ---');
  for (const item of all.byTag('healthy').sortByName().get()) {
    console.log(`  ${item.name}`);
  }

  console.log('\n--- Gourmet options ---');
  for (const item of all.byTag('gourmet').sortByPrice('desc').get()) {
    console.log(`  ${item.name.padEnd(30)} ${item.price}g`);
  }

  console.log(`\nImages: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
