import { existsSync } from 'fs';
import { join } from 'path';
import { specialItems } from '../../src/modules/special-items';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}]: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const query = specialItems();

  console.log('\n=== SPECIAL ITEMS & POWERS ===');
  console.log(`  Total: ${query.count()}`);

  console.log('\n--- All items (sorted by name) ---');
  for (const item of query.sortByName().get()) {
    console.log(`  [${item.type.padEnd(12)}] ${item.name}`);
    if (checkImage(item.name, item.image)) passed++;
    else failed++;
  }

  console.log('\n--- Special Items ---');
  for (const item of query.byType('special-item').get()) {
    console.log(`  ${item.name}`);
  }

  console.log('\n--- Book Powers ---');
  for (const item of query.byType('book').sortByName().get()) {
    console.log(`  ${item.name}`);
  }

  console.log('\n--- Skill Books ---');
  for (const item of query.byType('skill-book').sortByName().get()) {
    console.log(`  ${item.name}  — ${item.effect}`);
  }

  console.log('\n--- Mastery Powers ---');
  for (const item of query.byType('mastery').get()) {
    console.log(`  ${item.name} (${item.skill})`);
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
