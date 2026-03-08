import { artifacts } from '@/modules/artifacts';
import { existsSync } from 'fs';

function checkImage(name: string, image: string): boolean {
  if (existsSync(image)) return true;
  console.error(`  MISSING image for ${name}: ${image}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== ARTIFACTS ===');
  console.log(`Total artifacts: ${artifacts().count()}`);

  // Artifacts with special donation rewards
  const withNotes = artifacts().withDonationNotes().sortByName();
  console.log(`\nWith donation rewards (${withNotes.count()}):`);
  for (const a of withNotes.get()) {
    console.log(`  [${a.id}] ${a.name} — ${a.donationNotes}`);
  }

  // Most valuable artifacts
  const top5 = artifacts().sortBySellPrice().get().slice(0, 5);
  console.log('\nTop 5 by sell price:');
  for (const a of top5) {
    console.log(`  ${a.name} — ${a.sellPrice}g`);
  }

  // Artifacts from fishing
  const fishing = artifacts().fromFishing().sortByName();
  console.log(`\nFrom fishing treasure chests (${fishing.count()}):`);
  for (const a of fishing.get()) {
    console.log(`  ${a.name}`);
  }

  // Image validation
  console.log('\n--- Image validation ---');
  for (const a of artifacts().sortByName().get()) {
    if (checkImage(a.name, a.image)) passed++;
    else failed++;
  }

  console.log('─'.repeat(60));
  return { passed, failed };
}
