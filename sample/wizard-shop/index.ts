import { existsSync } from 'fs';
import { wizard } from '../../src/modules/wizard-shop';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = wizard();

  console.log("\n=== WIZARD'S TOWER ===");
  console.log(`  Total buildings: ${q.count()}`);

  console.log('\n  Magical constructions (sorted by cost):');
  for (const building of q.sortByCost().get()) {
    const imgOk = existsSync(building.image);
    if (imgOk) passed++;
    else {
      failed++;
      console.error(`    MISSING image for ${building.name}: ${building.image}`);
    }

    const note = building.availability ? ` [${building.availability}]` : '';
    const materialCount = building.materials.length;
    console.log(
      `    ${building.name.padEnd(22)} ${String(building.buildCost.toLocaleString() + 'g').padStart(14)}  ${materialCount} material(s)${note}`,
    );

    for (const mat of building.materials) {
      const matImgOk = existsSync(mat.image);
      if (matImgOk) passed++;
      else {
        failed++;
        console.error(`      MISSING material image for ${mat.itemName}: ${mat.image}`);
      }
      console.log(`      - ${mat.amount}x ${mat.itemName}`);
    }
  }

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
