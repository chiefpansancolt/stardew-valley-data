import { events } from '../../src/modules/events';

export function run(): { passed: number; failed: number } {
  const passed = 0;
  const failed = 0;

  const all = events();

  console.log('\n=== EVENTS ===');
  console.log(`  Total heart events: ${all.count()}`);

  const villagers = [...new Set(all.get().map((e) => e.villager))].sort();
  console.log(`  Villagers with events: ${villagers.length}`);

  for (const v of villagers) {
    const vEvents = all.byVillager(v).sortByHearts();
    const hearts = vEvents.get().map((e) => e.hearts);
    console.log(`    ${v.padEnd(15)} ${vEvents.count()} events (hearts: ${hearts.join(', ')})`);
  }

  // No images to validate
  console.log(`\nImages: ${passed} OK, ${failed} missing (no images for this module)`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
