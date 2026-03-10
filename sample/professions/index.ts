import { professions } from '../../src/modules/professions';

export function run(): { passed: number; failed: number } {
  const passed = 0;
  const failed = 0;

  const all = professions();

  console.log('\n=== PROFESSIONS ===');
  console.log(`  Total: ${all.count()}`);

  for (const skill of ['Farming', 'Fishing', 'Foraging', 'Mining', 'Combat'] as const) {
    const skillProfs = all.bySkill(skill);
    const l5 = skillProfs.byLevel(5);
    const l10 = skillProfs.byLevel(10);
    console.log(`  ${skill}: ${l5.count()} level-5, ${l10.count()} level-10`);
    for (const p of skillProfs.get()) {
      const parent = p.parentProfession ? ` (from ${all.find(p.parentProfession)?.name})` : '';
      console.log(`    [L${p.level}] ${p.id.padEnd(3)} ${p.name.padEnd(15)}${parent}`);
    }
  }

  // No images to validate for professions
  console.log(`\nImages: ${passed} OK, ${failed} missing (no images for this module)`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
