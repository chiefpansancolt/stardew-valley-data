import { buildings } from '@/modules/buildings';
import { existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, label: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}] ${label}: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const all = buildings();

  console.log('\n=== BUILDINGS ===');
  console.log(`  Total: ${all.count()}`);
  console.log(`  Robin builds: ${all.byBuilder('Robin').count()}`);
  console.log(`  Wizard builds: ${all.byBuilder('Wizard').count()}`);
  console.log(`  Base buildings: ${all.base().count()}`);
  console.log(`  Upgrades: ${all.upgrades().count()}`);
  console.log(`  Magical: ${all.magical().count()}`);

  console.log('\n  All buildings (sorted by cost):');
  for (const b of all.sortByCost().get()) {
    const materials = b.materials.map((m) => `${m.quantity} ${m.item}`).join(', ') || 'none';
    const upgrade = b.upgradeFrom ? ` (upgrades ${b.upgradeFrom})` : '';
    const magic = b.magical ? ' [magical]' : '';
    console.log(
      `    ${b.name.padEnd(20)} ${b.buildCost.toLocaleString().padStart(12)}g  ${b.buildDays}d  ${b.builder.padEnd(6)}${magic}${upgrade}`,
    );
    console.log(`      Materials: ${materials}`);
  }

  console.log('\n--- Image validation ---');
  for (const b of all.get()) {
    if (checkImage(b.name, 'image', b.image)) passed++;
    else failed++;
  }

  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
