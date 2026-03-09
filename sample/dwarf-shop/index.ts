import { existsSync } from 'fs';
import { join } from 'path';
import { dwarfShop } from '../../src/modules/dwarf-shop';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}]: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const shop = dwarfShop();

  console.log('\n=== DWARF SHOP ===');
  console.log(`  Items: ${shop.count()}`);

  console.log('\n--- All items (sorted by price) ---');
  for (const item of shop.sortByPrice().get()) {
    console.log(
      `  ${item.name.padEnd(26)} ${String(item.price + 'g').padStart(7)}  [${item.category}]`,
    );
    if (checkImage(item.name, item.image)) passed++;
    else failed++;
  }

  console.log('\n--- Explosives ---');
  for (const item of shop.explosives().get()) {
    console.log(`  ${item.name}`);
  }

  console.log('\n--- Consumables ---');
  for (const item of shop.consumables().get()) {
    console.log(`  ${item.name}`);
  }

  console.log('\n--- Recipes ---');
  for (const item of shop.recipes().get()) {
    console.log(`  ${item.name}`);
  }

  console.log(`\nImages: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
