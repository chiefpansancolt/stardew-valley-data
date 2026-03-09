import { existsSync } from 'fs';
import { carpenter } from '../../src/modules/carpenter-shop';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = carpenter();

  console.log("\n=== CARPENTER'S SHOP ===");
  console.log(`  Total items: ${q.count()}`);
  console.log(`  Materials: ${q.materials().count()}`);
  console.log(`  Recipes: ${q.recipes().count()}`);

  function checkAndPrint(label: string, items: ReturnType<typeof q.get>) {
    console.log(`\n  ${label}:`);
    for (const item of items) {
      const imgOk = existsSync(item.image);
      if (imgOk) passed++;
      else {
        failed++;
        console.error(`    MISSING image for ${item.name}: ${item.image}`);
      }
      const recipe = item.isRecipe ? ' (recipe)' : '';
      const day = item.day ? ` [${item.day}]` : '';
      const note = item.availability ? ` [${item.availability}]` : '';
      console.log(
        `    ${item.name.padEnd(28)} ${String(item.price + 'g').padStart(9)}  ${item.category}${recipe}${day}${note}`,
      );
    }
  }

  checkAndPrint('Materials', q.materials().get());
  checkAndPrint('Recipes', q.recipes().sortByPrice().get());

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
