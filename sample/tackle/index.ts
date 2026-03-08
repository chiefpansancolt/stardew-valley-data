import * as fs from 'fs';
import * as path from 'path';
import { tackle } from '@/modules/tackle';

const root = path.resolve(__dirname, '../../');

function checkImage(imagePath: string): boolean {
  return fs.existsSync(path.join(root, imagePath));
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== TACKLE ===\n');

  const allTackle = tackle().sortByName().get();

  console.log(`Total: ${allTackle.length} tackle items\n`);

  for (const t of allTackle) {
    console.log(`  ${t.name} — ${t.sellPrice}g | ${t.description}`);
  }

  console.log('\n--- Image validation ---');

  for (const t of allTackle) {
    if (checkImage(t.image)) {
      passed++;
    } else {
      failed++;
      console.log(`  MISSING: ${t.image}`);
    }
  }

  console.log('─'.repeat(60));
  return { passed, failed };
}
