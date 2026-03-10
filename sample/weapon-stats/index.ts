import { weaponStats } from '@/modules/weapon-stats';
import { existsSync } from 'fs';

function checkImage(name: string, image: string): boolean {
  if (existsSync(image)) return true;
  console.error(`  MISSING image for ${name}: ${image}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== WEAPON STATS ===');
  console.log(`Total stats: ${weaponStats().count()}`);

  for (const stat of weaponStats().get()) {
    console.log(`  [${stat.id}] ${stat.name}`);
    console.log(`    ${stat.description}`);
    if (checkImage(stat.name, stat.image)) passed++;
    else failed++;
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
