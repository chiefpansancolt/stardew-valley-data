import { mixedSeeds } from '@/modules/mixed-seeds';
import { existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, label: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}] ${label}: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== MIXED SEEDS ===');
  console.log(`Total:           ${mixedSeeds().count()}`);
  console.log(`With buy prices: ${mixedSeeds().withBuyPrices().count()}`);

  for (const seed of mixedSeeds().get()) {
    console.log(`\n${seed.name} (id: ${seed.id})`);
    console.log(`  Sell price:  ${seed.sellPrice}g`);
    console.log(
      `  Buy prices:  ${seed.buyPrices.length > 0 ? seed.buyPrices.map((p: { place: string; price: number }) => `${p.place} ${p.price}g`).join(', ') : 'none'}`,
    );

    for (const [season, ids] of Object.entries(seed.produces) as [string, string[]][]) {
      console.log(`  ${season}: [${ids?.join(', ')}]`);
    }
  }

  console.log('\n--- Produce queries ---');
  console.log(
    `Spring producers: ${mixedSeeds()
      .byProduces('spring')
      .get()
      .map((s) => s.name)
      .join(', ')}`,
  );
  console.log(
    `Island producers: ${mixedSeeds()
      .byProduces('ginger island')
      .get()
      .map((s) => s.name)
      .join(', ')}`,
  );
  console.log(`find("770"):      ${mixedSeeds().find('770')?.name}`);

  console.log('\n--- Image validation ---');
  for (const seed of mixedSeeds().get()) {
    if (checkImage(seed.name, 'image', seed.image)) passed++;
    else failed++;
  }

  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
