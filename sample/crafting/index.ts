import { existsSync } from 'fs';
import { crafting } from '../../src/modules/crafting';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = crafting();

  console.log('\n=== CRAFTING ===');
  console.log(`  Total recipes: ${q.count()}`);

  const categories = [...new Set(q.get().map((r) => r.category))].sort();
  console.log(`  Categories (${categories.length}): ${categories.join(', ')}`);

  for (const cat of categories) {
    const recipes = q.byCategory(cat).sortByName().get();
    console.log(`\n  ${cat} (${recipes.length}):`);
    for (const r of recipes) {
      const imgOk = existsSync(r.image);
      if (imgOk) passed++;
      else {
        failed++;
        console.error(`    MISSING image for ${r.name}: ${r.image}`);
      }
      console.log(`    ${r.name.padEnd(28)} → ${r.output.name} x${r.output.quantity}`);
    }
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
