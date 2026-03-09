import { existsSync } from 'fs';
import { volcanoShop } from '../../src/modules/volcano-shop';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = volcanoShop();

  console.log('\n=== VOLCANO SHOP (DWARF) ===');
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
      const priceStr = `${item.price} ${item.currency}`;
      console.log(`    ${item.name.padEnd(30)} ${priceStr.padStart(20)}  ${item.category}`);
    }
  }

  checkAndPrint('Gold items', q.goldItems().sortByPrice().get());
  checkAndPrint('Cinder Shard items', q.cinderShardItems().get());
  checkAndPrint('Diamond items', q.diamondItems().get());

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
