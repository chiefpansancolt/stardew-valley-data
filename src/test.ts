import { existsSync } from 'fs';
import { join } from 'path';

import { crops, getCropById, getCropsBySeason, getGiantCrops, getRegrowingCrops } from './crops';

const ROOT = join(__dirname, '..');

console.log('Total crops:', crops.length);

const parsnip = getCropById('parsnip');
console.log('\ngetCropById("parsnip"):', parsnip?.name, '| season:', parsnip?.seasons);

const springCrops = getCropsBySeason('spring');
console.log(
  '\ngetCropsBySeason("spring"):',
  springCrops.map((c) => c.name),
);

const giants = getGiantCrops();
console.log(
  '\ngetGiantCrops():',
  giants.map((c) => c.name),
);

const regrowing = getRegrowingCrops();
console.log(
  '\ngetRegrowingCrops():',
  regrowing.map((c) => c.name),
);

// Image validation
console.log('\n--- Image validation ---');
let passed = 0;
let failed = 0;

for (const crop of crops) {
  for (const [label, imgPath] of [
    ['image', crop.image],
    ['seedImage', crop.seedImage],
  ] as const) {
    const fullPath = join(ROOT, imgPath);
    if (existsSync(fullPath)) {
      passed++;
    } else {
      console.error(`  MISSING [${crop.name}] ${label}: ${imgPath}`);
      failed++;
    }
  }
}

console.log(`\n${passed} images OK, ${failed} missing`);
if (failed > 0) process.exit(1);
