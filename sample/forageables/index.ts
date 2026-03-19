import { forageables } from '@/modules/forageables';
import { existsSync } from 'fs';

function checkImage(name: string, image: string): boolean {
  if (existsSync(image)) return true;
  console.error(`  MISSING image for ${name}: ${image}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== FORAGEABLES ===');
  console.log(`Total forageables: ${forageables().count()}`);

  const seasons = ['spring', 'summer', 'fall', 'winter'] as const;
  for (const season of seasons) {
    const items = forageables().bySeason(season).sortBySellPrice().get();
    console.log(`\n  ${season.toUpperCase()} (${items.length}):`);
    for (const item of items) {
      console.log(`    [${item.id}] ${item.name}  ${item.sellPrice}g`);
    }
  }

  console.log('\n--- Artisan uses ---');
  const artisanUses = [
    'wine',
    'juice',
    'pickles',
    'jelly',
    'driedMushrooms',
    'driedFruit',
  ] as const;
  for (const use of artisanUses) {
    const names = forageables()
      .byArtisanUse(use)
      .sortByName()
      .get()
      .map((f) => f.name)
      .join(', ');
    console.log(`  ${use.padEnd(15)} (${forageables().byArtisanUse(use).count()}): ${names}`);
  }

  // Validate each image exactly once
  for (const item of forageables().sortByName().get()) {
    if (checkImage(item.name, item.image)) passed++;
    else failed++;
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
