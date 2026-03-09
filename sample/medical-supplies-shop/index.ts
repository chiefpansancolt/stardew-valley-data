import { existsSync } from 'fs';
import { medicalSupplies } from '../../src/modules/medical-supplies-shop';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = medicalSupplies();

  console.log('\n=== MEDICAL SUPPLIES ===');
  console.log(`  Total items: ${q.count()}`);

  for (const item of q.get()) {
    const imgOk = existsSync(item.image);
    if (imgOk) passed++;
    else {
      failed++;
      console.error(`    MISSING image for ${item.name}: ${item.image}`);
    }
    console.log(
      `  ${item.name.padEnd(20)} ${String(item.price).padStart(5)}g  ⚡${item.energy} ♥${item.health}`,
    );
  }

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
