import { existsSync } from 'fs';
import { desertTrader } from '../../src/modules/desert-trader';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = desertTrader();

  console.log('\n=== DESERT TRADER ===');
  console.log(`  Total trades: ${q.count()}`);
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
      const tradeImgOk = existsSync(item.tradeItemImage);
      if (tradeImgOk) passed++;
      else {
        failed++;
        console.error(
          `    MISSING trade item image for ${item.tradeItemName}: ${item.tradeItemImage}`,
        );
      }
      const day = item.day ? `[${item.day}] ` : '';
      const recipe = item.isRecipe ? ' (recipe)' : '';
      const note = item.availability ? ` [${item.availability}]` : '';
      console.log(
        `    ${day}${item.name.padEnd(28)} ← ${item.tradeAmount}x ${item.tradeItemName}${recipe}${note}`,
      );
    }
  }

  checkAndPrint('Always available', q.permanent().sortByName().get());
  checkAndPrint('Daily rotating', q.daily().get());

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
