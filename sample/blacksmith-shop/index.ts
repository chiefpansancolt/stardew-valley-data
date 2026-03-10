import { existsSync } from 'fs';
import { blacksmith } from '../../src/modules/blacksmith-shop';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = blacksmith();

  console.log('\n=== BLACKSMITH ===');
  console.log(`  Total items: ${q.count()}`);
  console.log(`\n  ${'Item'.padEnd(14)} ${'Year 1'.padStart(8)} ${'Year 2+'.padStart(8)}`);

  for (const item of q.get()) {
    const imgOk = existsSync(item.image);
    if (imgOk) passed++;
    else {
      failed++;
      console.error(`    MISSING image for ${item.name}: ${item.image}`);
    }
    console.log(
      `  ${item.name.padEnd(14)} ${String(item.priceYear1 + 'g').padStart(8)} ${String(item.priceYear2 + 'g').padStart(8)}`,
    );
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
