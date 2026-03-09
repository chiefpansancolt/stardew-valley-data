import { existsSync } from 'fs';
import { join } from 'path';
import { starDrops } from '../../src/modules/stardrops';

const ROOT = join(__dirname, '../..');

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const all = starDrops();

  console.log('\n=== STARDROPS ===');
  console.log(`  Total: ${all.count()}`);

  // Image is shared across all stardrops — check once
  const first = all.first();
  if (first) {
    if (existsSync(join(ROOT, first.image))) passed++;
    else {
      console.error(`  MISSING: ${first.image}`);
      failed++;
    }
  }

  for (const drop of all.get()) {
    console.log(`  [${drop.source.padEnd(11)}] ${drop.id.padEnd(15)} ${drop.name}`);
  }

  console.log(`\nImages: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
