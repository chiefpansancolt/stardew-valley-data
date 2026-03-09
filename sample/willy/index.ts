import { existsSync } from 'fs';
import { willy } from '../../src/modules/willy';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = willy();

  console.log("\n=== WILLY'S FISH SHOP ===");
  console.log(`  Total items: ${q.count()}`);
  console.log(`  Rods: ${q.rods().count()}`);
  console.log(`  Bait: ${q.bait().count()}`);
  console.log(`  Tackle: ${q.tackle().count()}`);

  function checkAndPrint(label: string, items: ReturnType<typeof q.get>) {
    console.log(`\n  ${label}:`);
    for (const item of items) {
      const imgOk = existsSync(item.image);
      if (imgOk) passed++;
      else {
        failed++;
        console.error(`    MISSING image for ${item.name}: ${item.image}`);
      }
      const level =
        item.fishingLevelRequired !== undefined ? ` (level ${item.fishingLevelRequired}+)` : '';
      const note = item.availability ? ` [${item.availability}]` : '';
      console.log(
        `    ${item.name.padEnd(28)} ${String(item.price + 'g').padStart(9)}  ${item.category}${level}${note}`,
      );
    }
  }

  checkAndPrint('All items (sorted by price)', q.sortByPrice().get());

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
