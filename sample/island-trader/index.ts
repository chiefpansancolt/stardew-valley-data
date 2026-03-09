import { existsSync } from 'fs';
import { islandTrader } from '../../src/modules/island-trader';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = islandTrader();

  console.log('\n=== ISLAND TRADER ===');
  console.log(`  Total trades: ${q.count()}`);

  function checkImages(items: ReturnType<typeof q.get>) {
    for (const item of items) {
      const imgOk = existsSync(item.image);
      if (imgOk) passed++;
      else {
        failed++;
        console.error(`    MISSING image for ${item.name}: ${item.image}`);
      }
      const tradeImgOk = existsSync(item.tradeItemImage);
      if (tradeImgOk) passed++;
      else {
        failed++;
        console.error(`    MISSING trade image for ${item.tradeItemName}: ${item.tradeItemImage}`);
      }
      console.log(
        `    ${item.name.padEnd(28)} ← ${String(item.tradeAmount).padStart(3)} ${item.tradeItemName}${item.day ? ` [${item.day}]` : ''}${item.availability ? ` [${item.availability}]` : ''}`,
      );
    }
  }

  console.log('\n  Permanent trades:');
  checkImages(q.permanent().get());

  console.log('\n  Daily rotating trades:');
  checkImages(q.daily().get());

  console.log('\n  Special availability trades:');
  checkImages(
    q
      .alwaysAvailable()
      .get()
      .filter((i) => !q.permanent().get().includes(i)),
  );

  console.log(`\n  Recipes: ${q.recipes().count()}`);

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
