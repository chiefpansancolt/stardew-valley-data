import { weather } from '@/modules/weather';
import { existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}]: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== WEATHER ===');
  console.log(`Total: ${weather().count()}`);

  for (const w of weather().get()) {
    const seasons = w.seasons.join(', ');
    const flags = [w.watersCrops ? 'waters crops' : null, w.special ? 'special' : null]
      .filter(Boolean)
      .join(', ');
    console.log(`  [${w.id}] ${w.name} — ${seasons}${flags ? ` (${flags})` : ''}`);
    if (checkImage(w.name, w.image)) passed++;
    else failed++;
  }

  console.log('\n--- Filters ---');
  console.log(
    `  watersCrops: ${weather()
      .watersCrops()
      .get()
      .map((w) => w.name)
      .join(', ')}`,
  );
  console.log(
    `  special:     ${weather()
      .special()
      .get()
      .map((w) => w.name)
      .join(', ')}`,
  );
  console.log(
    `  summer:      ${weather()
      .bySeason('summer')
      .get()
      .map((w) => w.name)
      .join(', ')}`,
  );
  console.log(
    `  winter:      ${weather()
      .bySeason('winter')
      .get()
      .map((w) => w.name)
      .join(', ')}`,
  );

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
