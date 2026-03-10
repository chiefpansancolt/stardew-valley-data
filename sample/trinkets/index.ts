import { existsSync } from 'fs';
import { join } from 'path';
import { trinkets } from '../../src/modules/trinkets';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}]: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const all = trinkets();

  console.log('\n=== TRINKETS ===');
  console.log(`  Total: ${all.count()}  Forgeable: ${all.forgeable().count()}`);

  for (const trinket of all.sortByName().get()) {
    const tags = [
      trinket.forgeable ? 'forgeable' : null,
      trinket.source === 'desert-festival' ? 'desert-festival' : null,
    ]
      .filter(Boolean)
      .join(', ');
    console.log(`  ${trinket.name.padEnd(22)} ${tags}`);
    if (checkImage(trinket.name, trinket.image)) passed++;
    else failed++;
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
