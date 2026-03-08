import * as fs from 'fs';
import * as path from 'path';
import { fish } from '../../src/fish';

const root = path.resolve(__dirname, '../../');

function checkImage(imagePath: string): boolean {
  return fs.existsSync(path.join(root, imagePath));
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== FISH ===\n');

  const allFish = fish().sortByName().get();

  console.log(`Total: ${allFish.length} fish\n`);

  // Show a few notable examples
  const legend = fish().find('163');
  if (legend) {
    console.log(
      `Hardest rod fish: ${legend.name} — difficulty ${legend.difficulty}, ${legend.sellPrice}g`,
    );
  }

  const mostValuable = fish().byCatchType('rod').sortBySellPrice().first();
  if (mostValuable) {
    console.log(`Most valuable rod fish: ${mostValuable.name} — ${mostValuable.sellPrice}g`);
  }

  const springFish = fish().bySeason('spring').byCatchType('rod').sortByName();
  console.log(`\nSpring rod fish (${springFish.count()}):`);
  for (const f of springFish.get()) {
    console.log(`  ${f.name} | ${f.location} | diff ${f.difficulty}`);
  }

  const crabPot = fish().byCatchType('crab-pot').sortByName();
  console.log(`\nCrab pot fish (${crabPot.count()}):`);
  for (const f of crabPot.get()) {
    console.log(`  ${f.name} | ${f.location} | ${f.sellPrice}g`);
  }

  console.log('\n--- Image validation ---');

  for (const f of allFish) {
    if (checkImage(f.image)) {
      passed++;
    } else {
      failed++;
      console.log(`  MISSING: ${f.image}`);
    }
  }

  console.log('─'.repeat(60));
  return { passed, failed };
}
