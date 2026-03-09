import { existsSync } from 'fs';
import { qiStock } from '../../src/modules/qi-stock';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = qiStock();

  console.log('\n=== QI STOCK ===');
  console.log(`  Total items: ${q.count()}`);
  console.log(`  Qi Gem items: ${q.byCurrency('qi-gem').count()}`);
  console.log(`  Golden Walnut items: ${q.byCurrency('golden-walnut').count()}`);
  console.log(`  Recipes: ${q.recipes().count()}`);
  console.log(`  Conditional: ${q.count() - q.alwaysAvailable().count()}`);

  console.log('\n  Qi Gem items (sorted by cost):');
  for (const item of q.byCurrency('qi-gem').sortByCost().get()) {
    const imgOk = existsSync(item.image);
    if (imgOk) passed++;
    else {
      failed++;
      console.error(`    MISSING image for ${item.name}: ${item.image}`);
    }
    const tag = item.isRecipe ? '[recipe]' : '       ';
    const qty = item.quantity > 1 ? ` ×${item.quantity}` : '';
    console.log(`    ${tag} ${item.name.padEnd(30)} ${item.cost} Qi Gems${qty}`);
  }

  console.log('\n  Golden Walnut items:');
  for (const item of q.byCurrency('golden-walnut').get()) {
    const imgOk = existsSync(item.image);
    if (imgOk) passed++;
    else {
      failed++;
      console.error(`    MISSING image for ${item.name}: ${item.image}`);
    }
    console.log(`    ${item.name.padEnd(30)} ${item.cost} Golden Walnut → ×${item.quantity}`);
  }

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
