import { existsSync } from 'fs';
import { casino } from '../../src/modules/casino-shop';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = casino();

  console.log('\n=== CASINO (QI COINS) ===');
  console.log(`  Total items: ${q.count()}`);

  function checkAndPrint(label: string, items: ReturnType<typeof q.get>) {
    console.log(`\n  ${label}:`);
    for (const item of items) {
      const imgOk = existsSync(item.image);
      if (imgOk) passed++;
      else {
        failed++;
        console.error(`    MISSING image for ${item.name}: ${item.image}`);
      }
      console.log(
        `    ${item.name.padEnd(28)} ${String(item.price + ' QC').padStart(10)}  ${item.category}`,
      );
    }
  }

  checkAndPrint('All items (sorted by price)', q.sortByPrice().get());

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
