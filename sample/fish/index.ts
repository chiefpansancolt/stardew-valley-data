import * as fs from 'fs';
import * as path from 'path';
import { fish } from '@/modules/fish';

const root = path.resolve(__dirname, '../../');

function checkImage(imagePath: string): boolean {
  return fs.existsSync(path.join(root, imagePath));
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== FISH ===\n');

  const allFish = fish().sortByName().get();

  console.log(`Total: ${allFish.length} fish`);
  console.log(`Rod fish:       ${fish().byCatchType('rod').count()}`);
  console.log(`Crab pot fish:  ${fish().byCatchType('crab-pot').count()}`);
  console.log(`Pond eligible:  ${fish().pondEligible().count()}`);
  console.log(`Smokeable:      ${fish().smokeable().count()}`);

  console.log('\n--- By category ---');
  for (const cat of [
    'regular',
    'crab-pot',
    'night-market',
    'legendary',
    'legendary-2',
    'other',
  ] as const) {
    const count = fish().byCategory(cat).count();
    console.log(`  ${cat.padEnd(14)} ${count}`);
  }

  // Notable examples
  const legend = fish().find('163');
  if (legend) {
    console.log(
      `\nHardest rod fish: ${legend.name} — difficulty ${legend.difficulty}, ${legend.sellPrice}g`,
    );
  }
  const mostValuable = fish().byCatchType('rod').sortBySellPrice().first();
  if (mostValuable) {
    console.log(`Most valuable rod fish: ${mostValuable.name} — ${mostValuable.sellPrice}g`);
  }

  // canSmoke list
  console.log(`\n--- Smokeable fish (${fish().smokeable().count()}) ---`);
  const smokeableNames = fish()
    .smokeable()
    .sortByName()
    .get()
    .map((f) => f.name);
  console.log(`  ${smokeableNames.join(', ')}`);

  // Roe list
  console.log(`\n--- Roe producers (${fish().byRoe('roe').count()}) ---`);
  const roeNames = fish()
    .byRoe('roe')
    .sortByName()
    .get()
    .map((f) => f.name);
  console.log(`  ${roeNames.join(', ')}`);

  // Caviar (Sturgeon only)
  console.log(`\n--- Caviar producers (${fish().byRoe('caviar').count()}) ---`);
  const caviarNames = fish()
    .byRoe('caviar')
    .sortByName()
    .get()
    .map((f) => f.name);
  console.log(`  ${caviarNames.join(', ')}`);

  // Fish pond produce — show notable fish with more than just Roe
  console.log('\n--- Fish Pond produce (fish with bonus items beyond Roe) ---');
  const bonusPond = fish()
    .pondEligible()
    .sortByName()
    .get()
    .filter((f) =>
      f.fishPond!.produce.some((p) => p.product !== 'Roe' && p.product !== 'Squid Ink'),
    );
  for (const f of bonusPond) {
    const items = f
      .fishPond!.produce.filter((p) => p.product !== 'Roe')
      .map((p) => `${p.product} (pop.${p.minPopulation})`)
      .join(', ');
    console.log(`  ${f.name.padEnd(20)} ${items}`);
  }

  console.log('\n--- Spring rod fish ---');
  const springFish = fish().bySeason('spring').byCatchType('rod').sortByName();
  console.log(
    `  (${springFish.count()}): ${springFish
      .get()
      .map((f) => f.name)
      .join(', ')}`,
  );

  console.log('\n--- Crab pot fish ---');
  const crabPot = fish().byCatchType('crab-pot').sortByName();
  console.log(
    `  (${crabPot.count()}): ${crabPot
      .get()
      .map((f) => f.name)
      .join(', ')}`,
  );

  console.log('\n--- Image validation ---');

  for (const f of allFish) {
    if (checkImage(f.image)) {
      passed++;
    } else {
      failed++;
      console.log(`  MISSING: ${f.image}`);
    }
  }

  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
