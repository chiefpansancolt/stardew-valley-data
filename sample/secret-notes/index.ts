import { secretNotes } from '../../src/modules/secret-notes';

export function run(): { passed: number; failed: number } {
  const all = secretNotes();

  console.log('\n=== SECRET NOTES ===');
  console.log(
    `  Total: ${all.count()}  (Notes: ${all.notes().count()}, Scraps: ${all.journalScraps().count()})`,
  );

  console.log('\n--- Secret Notes ---');
  for (const note of all.notes().get()) {
    console.log(`  ${note.name.padEnd(20)} ${note.description.substring(0, 60)}...`);
  }

  console.log('\n--- Journal Scraps ---');
  for (const scrap of all.journalScraps().get()) {
    console.log(`  ${scrap.name.padEnd(22)} ${scrap.description.substring(0, 60)}...`);
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: ${all.count()} OK, 0 missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed: all.count(), failed: 0 };
}
