import { existsSync } from 'fs';
import { joja } from '../../src/modules/joja-shop';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const q = joja();

  console.log('\n=== JOJA ===');
  console.log(`  Total items: ${q.count()}`);
  console.log(`  Permanent: ${q.permanent().count()}`);
  console.log(`  Seeds: ${q.seeds().count()}`);

  console.log('\n  Permanent stock:');
  for (const item of q.permanent().sortByPrice().get()) {
    const imgOk = existsSync(item.image);
    if (imgOk) passed++;
    else {
      failed++;
      console.error(`    MISSING image for ${item.name}: ${item.image}`);
    }
    const note = item.availability ? ` [${item.availability}]` : '';
    console.log(`    ${item.name.padEnd(28)} ${String(item.price + 'g').padStart(8)}${note}`);
  }

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
      console.log(
        `    ${item.name.padEnd(24)} ${String(item.price + 'g').padStart(6)}${multiSeason}`,
      );
    }
  }

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
