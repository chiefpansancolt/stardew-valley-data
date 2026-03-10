import { goldenWalnuts } from '../../src/modules/golden-walnuts';

export function run(): { passed: number; failed: number } {
  const passed = 0;
  const failed = 0;

  const all = goldenWalnuts();

  console.log('\n=== GOLDEN WALNUTS ===');
  console.log(`  Total entries: ${all.count()}`);
  console.log(`  Total walnuts: ${all.totalAmount()}`);

  const locations = [...new Set(all.get().map((w) => w.location))];
  console.log(`  Unique locations: ${locations.length}`);

  for (const loc of locations.sort()) {
    const locWalnuts = all.byLocation(loc);
    console.log(
      `  [${loc.padEnd(25)}] ${locWalnuts.count()} sources, ${locWalnuts.totalAmount()} walnuts`,
    );
  }

  console.log(`\n  Tracking types:`);
  for (const type of ['all-at-once', 'limited', 'extra'] as const) {
    const subset = all.byTrackingType(type);
    console.log(
      `    ${type.padEnd(14)} ${subset.count()} entries, ${subset.totalAmount()} walnuts`,
    );
  }

  // No images to validate for golden walnuts
  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
