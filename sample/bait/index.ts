import * as fs from 'fs';
import * as path from 'path';
import { bait } from '../../src/bait';

const root = path.resolve(__dirname, '../../');

function checkImage(imagePath: string): boolean {
  return fs.existsSync(path.join(root, imagePath));
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== BAIT ===\n');

  const allBait = bait().sortByName().get();

  console.log(`Total: ${allBait.length} bait items\n`);

  for (const b of allBait) {
    console.log(`  ${b.name} — ${b.sellPrice}g | ${b.description}`);
  }

  console.log('\n--- Image validation ---');

  for (const b of allBait) {
    if (checkImage(b.image)) {
      passed++;
    } else {
      failed++;
      console.log(`  MISSING: ${b.image}`);
    }
  }

  console.log('─'.repeat(60));
  return { passed, failed };
}
