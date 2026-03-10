import { hats } from '@/modules/hats';
import { existsSync } from 'fs';

function checkImage(name: string, image: string): boolean {
  if (existsSync(image)) return true;
  console.error(`  MISSING image for ${name}: ${image}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== HATS ===');
  console.log(`Total hats: ${hats().count()}`);

  for (const hat of hats().sortByName().get()) {
    console.log(`  [${hat.id}] ${hat.name}`);
    console.log(`    ${hat.obtain}`);
    if (checkImage(hat.name, hat.image)) passed++;
    else failed++;
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
