import { existsSync } from 'fs';
import { fieldOffice, fieldOfficeDonations } from '../../src/modules/field-office';

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const collections = fieldOffice();
  const donations = fieldOfficeDonations();

  console.log('\n=== ISLAND FIELD OFFICE ===');
  console.log(`  Collections: ${collections.count()}`);
  console.log(`  Total donations: ${donations.count()}`);

  for (const collection of collections.get()) {
    console.log(
      `\n  [${collection.name}] → ${collection.reward.goldenWalnuts} Golden Walnuts${collection.reward.item ? ` + ${collection.reward.item.name}` : ''}`,
    );

    if (collection.reward.item) {
      const rewardImgOk = existsSync(collection.reward.item.image);
      if (rewardImgOk) passed++;
      else {
        failed++;
        console.error(
          `    MISSING reward image for ${collection.reward.item.name}: ${collection.reward.item.image}`,
        );
      }
    }

    for (const donation of collection.donations) {
      const imgOk = existsSync(donation.image);
      if (imgOk) passed++;
      else {
        failed++;
        console.error(`    MISSING image for ${donation.name}: ${donation.image}`);
      }
      console.log(`    ${donation.name.padEnd(24)} ×${donation.quantity}`);
    }
  }

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
