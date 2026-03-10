import { existsSync } from 'fs';
import { guild } from '../../src/modules/guild-shop';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = guild();

  console.log("\n=== ADVENTURER'S GUILD ===");
  console.log(`  Total items: ${q.count()}`);
  console.log(`  Weapons: ${q.weapons().count()}`);
  console.log(`  Boots: ${q.boots().count()}`);
  console.log(`  Rings: ${q.rings().count()}`);

  function checkAndPrint(label: string, items: ReturnType<typeof q.get>) {
    console.log(`\n  ${label}:`);
    for (const item of items) {
      const imgOk = existsSync(item.image);
      if (imgOk) passed++;
      else {
        failed++;
        console.error(`    MISSING image for ${item.name}: ${item.image}`);
      }
      const level = item.mineLevel !== undefined ? ` (mine ${item.mineLevel}+)` : '';
      const note = item.availability ? ` [${item.availability}]` : '';
      const type = item.weaponType ? ` (${item.weaponType})` : '';
      console.log(
        `    ${item.name.padEnd(26)} ${String(item.price + 'g').padStart(10)}  ${item.category}${type}${level}${note}`,
      );
    }
  }

  checkAndPrint('All items (sorted by price)', q.sortByPrice().get());

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
