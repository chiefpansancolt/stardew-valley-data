import { existsSync } from 'fs';
import { join } from 'path';

import { crops } from '../../src/crops';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, label: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}] ${label}: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== CROPS ===');
  console.log(`Total:              ${crops().count()}`);
  console.log(`Spring:             ${crops().bySeason('spring').count()}`);
  console.log(`Summer:             ${crops().bySeason('summer').count()}`);
  console.log(`Fall:               ${crops().bySeason('fall').count()}`);
  console.log(`Multi-season:       ${crops().multiSeason().get().map((c) => c.name).join(', ')}`);
  console.log(`Giant:              ${crops().giant().get().map((c) => c.name).join(', ')}`);
  console.log(`Trellis:            ${crops().trellis().get().map((c) => c.name).join(', ')}`);
  console.log(`Regrowing:          ${crops().regrowing().get().map((c) => c.name).join(', ')}`);
  console.log(`Extra harvest:      ${crops().extraHarvest().get().map((c) => c.name).join(', ')}`);
  console.log(`Eatable:            ${crops().eatable().count()}`);
  console.log(`Vegetables:         ${crops().byCategory('vegetable').count()}`);
  console.log(`Fruits:             ${crops().byCategory('fruit').count()}`);
  console.log(`Flowers:            ${crops().byCategory('flower').count()}`);
  console.log(`Pierre's:           ${crops().byShop("Pierre's").count()}`);
  console.log(`JojaMart:           ${crops().byShop('JojaMart').count()}`);
  console.log(`Most profitable:    ${crops().sortBySellPrice().first()?.name}`);
  console.log(`Fastest growing:    ${crops().sortByGrowDays().first()?.name}`);
  console.log(`find("24"):         ${crops().find('24')?.name}`);
  console.log(`findByName("Corn"): ${crops().findByName('Corn')?.id}`);

  console.log('\n--- Compound queries ---');
  console.log(
    `Spring vegetables:               ${crops().bySeason('spring').byCategory('vegetable').count()}`,
  );
  console.log(
    `Regrowing summer crops by price: ${crops().regrowing().bySeason('summer').sortBySellPrice().get().map((c) => c.name).join(', ')}`,
  );
  console.log(
    `Pierre's fall crops by price:    ${crops().byShop("Pierre's").bySeason('fall').sortBySellPrice().get().map((c) => c.name).join(', ')}`,
  );
  console.log(
    `Eatable giant crops:             ${crops().eatable().giant().get().map((c) => c.name).join(', ')}`,
  );

  console.log('\n--- Image validation ---');
  for (const crop of crops().get()) {
    if (checkImage(crop.name, 'image', crop.image)) passed++;
    else failed++;

    if (checkImage(crop.name, 'seedImage', crop.seedImage)) passed++;
    else failed++;

    if (crop.giant && crop.giantImage === undefined) {
      console.error(`  MISSING [${crop.name}] giantImage: field not set`);
      failed++;
    } else if (crop.giantImage !== undefined) {
      if (checkImage(crop.name, 'giantImage', crop.giantImage)) passed++;
      else failed++;
    }

    for (const stage of crop.stages) {
      if (checkImage(crop.name, `stage:${stage.name}`, stage.image)) passed++;
      else failed++;
    }
  }

  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
