import { existsSync } from 'fs';
import { saloon } from '../../src/modules/saloon-shop';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = saloon();

  console.log('\n=== SALOON ===');
  console.log(`  Total items: ${q.count()}`);
  console.log(`  Food & drink: ${q.food().count()}`);
  console.log(`  Recipes: ${q.recipes().count()}`);

  for (const category of ['food', 'recipe'] as const) {
    const label = category === 'food' ? 'Food & drink' : 'Recipes';
    const items = q.byCategory(category).sortByPrice().get();
    console.log(`\n  ${label}:`);
    for (const item of items) {
      const imgOk = existsSync(item.image);
      if (imgOk) passed++;
      else {
        failed++;
        console.error(`    MISSING image for ${item.name}: ${item.image}`);
      }
      const note = item.availability ? ` [${item.availability}]` : '';
      console.log(`    ${item.name.padEnd(32)} ${String(item.price + 'g').padStart(6)}${note}`);
    }
  }

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
