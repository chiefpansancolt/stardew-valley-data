import { existsSync } from 'fs';
import { pierre } from '../../src/modules/pierre-shop';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = pierre();

  console.log('\n=== PIERRE ===');
  console.log(`  Total items: ${q.count()}`);
  console.log(`  Seeds: ${q.seeds().count()}`);
  console.log(`  Saplings: ${q.saplings().count()}`);
  console.log(`  Ingredients: ${q.ingredients().count()}`);
  console.log(`  Fertilizers: ${q.fertilizers().count()}`);
  console.log(`  Recipes: ${q.recipes().count()}`);

  function checkItems(label: string, items: ReturnType<typeof q.get>) {
    console.log(`\n  ${label}:`);
    for (const item of items) {
      const imgOk = existsSync(item.image);
      if (imgOk) passed++;
      else {
        failed++;
        console.error(`    MISSING image for ${item.name}: ${item.image}`);
      }
      const note = item.availability ? ` [${item.availability}]` : '';
      console.log(`    ${item.name.padEnd(28)} ${String(item.price + 'g').padStart(8)}${note}`);
    }
  }

  checkItems('Cooking ingredients', q.ingredients().sortByPrice().get());
  checkItems('Farming supplies', q.fertilizers().sortByPrice().get());

  for (const season of ['spring', 'summer', 'fall'] as const) {
    const seasonSeeds = q.seeds().bySeason(season).sortByPrice().get();
    console.log(
      `\n  ${season.charAt(0).toUpperCase() + season.slice(1)} seeds (${seasonSeeds.length}):`,
    );
    for (const item of seasonSeeds) {
      const imgOk = existsSync(item.image);
      if (imgOk) passed++;
      else {
        failed++;
        console.error(`    MISSING image for ${item.name}: ${item.image}`);
      }
      const multiSeason = item.seasons.length > 1 ? ` (${item.seasons.join('+')})` : '';
      const note = item.availability ? ` [${item.availability}]` : '';
      console.log(
        `    ${item.name.padEnd(24)} ${String(item.price + 'g').padStart(6)}${multiSeason}${note}`,
      );
    }
  }

  checkItems('Saplings', q.saplings().sortByPrice().get());
  checkItems('Recipes', q.recipes().get());
  checkItems('Special items', q.byCategory('special').sortByPrice().get());

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
