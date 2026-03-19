import { crops } from '@/modules/crops';
import { forageables } from '@/modules/forageables';
import { trees } from '@/modules/trees';
import { ArtisanUses, FruitTree } from '@/types';

type ArtisanUseKey = keyof ArtisanUses;

const ALL_USES: ArtisanUseKey[] = [
  'honey',
  'wine',
  'juice',
  'pickles',
  'jelly',
  'driedMushrooms',
  'driedFruit',
];

export function run(): { passed: number; failed: number } {
  console.log('\n=== ARTISAN USES (all sources) ===');

  for (const use of ALL_USES) {
    const cropNames = crops()
      .byArtisanUse(use)
      .get()
      .map((c) => c.name)
      .sort();

    const forageableNames = forageables()
      .byArtisanUse(use)
      .get()
      .map((f) => f.name)
      .sort();

    const treeNames = trees()
      .byArtisanUse(use)
      .get()
      .map((t) => (t as FruitTree).produce.name)
      .sort();

    const total = cropNames.length + forageableNames.length + treeNames.length;

    console.log(`\n  ${use} (${total} total)`);

    if (cropNames.length > 0) {
      console.log(`    Crops        (${cropNames.length}): ${cropNames.join(', ')}`);
    }
    if (forageableNames.length > 0) {
      console.log(`    Forageables  (${forageableNames.length}): ${forageableNames.join(', ')}`);
    }
    if (treeNames.length > 0) {
      console.log(`    Fruit trees  (${treeNames.length}): ${treeNames.join(', ')}`);
    }
    if (total === 0) {
      console.log(`    (none)`);
    }
  }

  console.log('\n' + '─'.repeat(60));
  return { passed: 0, failed: 0 };
}
