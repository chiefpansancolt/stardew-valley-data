import { existsSync } from 'fs';
import { join } from 'path';
import { lostBooks } from '../../src/modules/lost-books';

const ROOT = join(__dirname, '../..');

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const all = lostBooks();

  console.log('\n=== LOST BOOKS ===');
  console.log(`  Total: ${all.count()}`);

  // Image is shared across all books — check once
  const first = all.first();
  if (first) {
    if (existsSync(join(ROOT, first.image))) passed++;
    else {
      console.error(`  MISSING: ${first.image}`);
      failed++;
    }
  }

  for (const book of all.get()) {
    console.log(`  #${book.id.padEnd(3)} ${book.name}`);
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
