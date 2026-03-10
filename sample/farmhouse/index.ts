import { existsSync } from 'fs';
import { join } from 'path';
import { houseRenovations, houseUpgrades } from '../../src/modules/farmhouse';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}]: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const upgrades = houseUpgrades();
  const renovations = houseRenovations();

  console.log('\n=== FARMHOUSE ===');
  console.log(`  Upgrades: ${upgrades.count()}  Renovations: ${renovations.count()}`);

  console.log('\n--- House Upgrades ---');
  for (const u of upgrades.sortByTier().get()) {
    const cost = u.cost === 0 ? 'Free' : `${u.cost.toLocaleString()}g`;
    const mats = u.materials.map((m) => `${m.quantity} ${m.item}`).join(', ');
    const matsStr = mats ? `  [${mats}]` : '';
    console.log(`  Tier ${u.tier}  ${u.name.padEnd(25)} ${cost}${matsStr}`);
    if (checkImage(u.name, u.image)) passed++;
    else failed++;
  }

  console.log('\n--- House Renovations ---');
  for (const r of renovations.sortByPrice().get()) {
    const cost = r.cost === 0 ? 'Free' : `${r.cost.toLocaleString()}g`;
    const prereq = r.prerequisite ? `  (requires: ${r.prerequisite})` : '';
    console.log(`  ${r.name.padEnd(25)} ${cost}${prereq}`);
    if (checkImage(r.name, r.image)) passed++;
    else failed++;
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
