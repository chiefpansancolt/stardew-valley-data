import { existsSync } from 'fs';
import { krobus } from '../../src/modules/krobus-shop';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = krobus();

  console.log('\n=== KROBUS ===');
  console.log(`  Total items: ${q.count()}`);
  console.log(`  Permanent: ${q.permanent().count()}`);
  console.log(`  Daily: ${q.daily().count()}`);

  function checkAndPrint(label: string, items: ReturnType<typeof q.get>) {
    console.log(`\n  ${label}:`);
    for (const item of items) {
      const imgOk = existsSync(item.image);
      if (imgOk) passed++;
      else {
        failed++;
        console.error(`    MISSING image for ${item.name}: ${item.image}`);
      }
      const stock = item.stockLimit === -1 ? 'unlimited' : `${item.stockLimit}x`;
      const note = item.availability ? ` [${item.availability}]` : '';
      const recipe = item.isRecipe ? ' (recipe)' : '';
      console.log(
        `    ${item.name.padEnd(28)} ${String(item.price + 'g').padStart(10)}  ${stock.padEnd(10)}${recipe}${note}`,
      );
    }
  }

  checkAndPrint('Permanent stock', q.permanent().sortByPrice().get());

  console.log('\n  Daily rotating stock:');
  for (const item of q.daily().get()) {
    const imgOk = existsSync(item.image);
    if (imgOk) passed++;
    else {
      failed++;
      console.error(`    MISSING image for ${item.name}: ${item.image}`);
    }
    const stock = item.stockLimit === -1 ? 'unlimited' : `${item.stockLimit}x`;
    console.log(
      `    ${String(item.day).padEnd(12)} ${item.name.padEnd(24)} ${String(item.price + 'g').padStart(8)}  ${stock}`,
    );
  }

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
