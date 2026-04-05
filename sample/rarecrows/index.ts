import { rarecrows } from '@/modules/rarecrows';
import { existsSync } from 'fs';

function checkImage(name: string, image: string): boolean {
  if (existsSync(image)) return true;
  console.error(`  MISSING image for ${name}: ${image}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== RARECROWS ===');
  console.log(`Total rarecrows: ${rarecrows().count()}`);

  for (const crow of rarecrows().sortByNumber().get()) {
    console.log(`  [${crow.number}] ${crow.name}`);
    console.log(`    ${crow.obtain}`);
    if (checkImage(crow.name, crow.image)) passed++;
    else failed++;
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
