import { footwear } from '@/modules/footwear';
import { existsSync } from 'fs';

function checkImage(name: string, image: string): boolean {
  if (existsSync(image)) return true;
  console.error(`  MISSING image for ${name}: ${image}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== FOOTWEAR ===');
  console.log(`Total footwear: ${footwear().count()}`);

  for (const item of footwear().sortByDefense().get()) {
    console.log(`  [${item.id}] ${item.name}  DEF ${item.defense}  IMM ${item.immunity}`);
    if (checkImage(item.name, item.image)) passed++;
    else failed++;
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
