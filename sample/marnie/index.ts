import { existsSync } from 'fs';
import { marnie } from '../../src/modules/marnie';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = marnie();

  console.log("\n=== MARNIE'S RANCH ===");
  console.log(`  Total items: ${q.count()}`);
  console.log(`  Animal supplies: ${q.animalSupplies().count()}`);
  console.log(`  Tools: ${q.tools().count()}`);
  console.log(`  Furniture: ${q.furniture().count()}`);

  function checkAndPrint(label: string, items: ReturnType<typeof q.get>) {
    console.log(`\n  ${label}:`);
    for (const item of items) {
      const imgOk = existsSync(item.image);
      if (imgOk) passed++;
      else {
        failed++;
        console.error(`    MISSING image for ${item.name}: ${item.image}`);
      }
      const note = item.availability ? ` [${item.availability}]` : '';
      console.log(
        `    ${item.name.padEnd(28)} ${String(item.price + 'g').padStart(10)}  ${item.category}${note}`,
      );
    }
  }

  checkAndPrint('All items (sorted by price)', q.sortByPrice().get());

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
