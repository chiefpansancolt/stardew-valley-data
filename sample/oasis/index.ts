import { existsSync } from 'fs';
import { oasis } from '../../src/modules/oasis';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = oasis();

  console.log('\n=== OASIS (SANDY) ===');
  console.log(`  Total items: ${q.count()}`);
  console.log(`  Seeds: ${q.seeds().count()}`);
  console.log(`  Always available: ${q.permanent().count()}`);
  console.log(`  Daily rotating: ${q.daily().count()}`);

  function checkAndPrint(label: string, items: ReturnType<typeof q.get>) {
    console.log(`\n  ${label}:`);
    for (const item of items) {
      const imgOk = existsSync(item.image);
      if (imgOk) passed++;
      else {
        failed++;
        console.error(`    MISSING image for ${item.name}: ${item.image}`);
      }
      const day = item.day ? `[${item.day}] ` : '';
      const note = item.availability ? ` [${item.availability}]` : '';
      console.log(
        `    ${day}${item.name.padEnd(26)} ${String(item.price + 'g').padStart(8)}  ${item.category}${note}`,
      );
    }
  }

  checkAndPrint('Always available', q.permanent().sortByPrice().get());
  checkAndPrint('Daily rotating', q.daily().get());

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
