import { existsSync } from 'fs';
import { join } from 'path';
import { findFestival, seasons } from '../../src/seasons';

const ROOT = join(__dirname, '../..');

function checkImage(label: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${label}]: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== SEASONS ===');
  console.log(`Total: ${seasons().count()}`);

  for (const season of seasons().get()) {
    console.log(`\n${season.name} (${season.totalDays} days)`);
    if (checkImage(season.name, season.image)) passed++;
    else failed++;

    for (const f of season.festivals) {
      const days = f.startDay === f.endDay ? `Day ${f.startDay}` : `Days ${f.startDay}–${f.endDay}`;
      console.log(`  ${f.name} (${days})`);
      if (checkImage(f.name, f.image)) passed++;
      else failed++;
      if (checkImage(`${f.name} calendar icon`, f.calendarIcon)) passed++;
      else failed++;
    }
  }

  console.log('\n--- findFestival examples ---');
  const egg = findFestival('egg');
  console.log(
    `  findFestival("egg"): ${egg.map((r) => `${r.festival.name} (${r.season.name})`).join(', ')}`,
  );
  const market = findFestival('market');
  console.log(
    `  findFestival("market"): ${market.map((r) => `${r.festival.name} (${r.season.name})`).join(', ')}`,
  );

  console.log(`\nImages: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
