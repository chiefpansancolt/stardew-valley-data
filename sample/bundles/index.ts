import { bundles } from '@/modules/bundles';
import { GoldBundle, ItemBundle, JojaBundle } from '@/types';
import { existsSync } from 'fs';

function checkImage(name: string, image: string): boolean {
  if (existsSync(image)) return true;
  console.error(`  MISSING image for ${name}: ${image}`);
  return false;
}

const ROOMS = [
  'crafts-room',
  'pantry',
  'fish-tank',
  'boiler-room',
  'bulletin-board',
  'vault',
  'abandoned-joja-mart',
] as const;

function printBundle(b: ItemBundle | GoldBundle): void {
  const remixTag = b.remixBundle ? ' [remix]' : '';
  if (b.type === 'gold') {
    console.log(`  [${b.id}]${remixTag} ${b.name} — ${b.goldCost.toLocaleString()}g`);
    console.log(`    Reward: ${b.reward.quantity}x ${b.reward.name}`);
  } else {
    const choiceNote = b.itemsChosenRandom
      ? ` (${b.itemsRequired} of ${b.numItemsAvailable} random)`
      : ` (${b.itemsRequired}/${b.items.length} items)`;
    console.log(`  [${b.id}]${remixTag} ${b.name}${choiceNote}`);
    console.log(`    Reward: ${b.reward.quantity}x ${b.reward.name}`);
  }
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== BUNDLES ===');
  console.log(`Total bundles: ${bundles().count()}`);
  console.log(`  Item bundles:  ${bundles().itemBundles().count()}`);
  console.log(`  Gold bundles:  ${bundles().goldBundles().count()}`);
  console.log(`  Joja bundles:  ${bundles().jojaBundles().count()}`);
  console.log(`  Standard set:  ${bundles().standard().count()}`);
  console.log(`  Remix set:     ${bundles().remix().count()}`);

  // --- Standard bundles by room ---
  console.log('\n--- STANDARD BUNDLES BY ROOM ---');
  for (const room of ROOMS) {
    const roomBundles = bundles().standard().byRoom(room).get() as (ItemBundle | GoldBundle)[];
    if (roomBundles.length === 0) continue;
    console.log(`\n  [${room}]`);
    for (const b of roomBundles) {
      printBundle(b);
      if (checkImage(b.name, b.image)) passed++;
      else failed++;
    }
  }

  // --- Remix bundles by room ---
  console.log('\n--- REMIX BUNDLES BY ROOM ---');
  for (const room of ROOMS) {
    const roomBundles = bundles().remix().byRoom(room).get() as (ItemBundle | GoldBundle)[];
    if (roomBundles.length === 0) continue;
    console.log(`\n  [${room}]`);
    for (const b of roomBundles) {
      printBundle(b);
      if (checkImage(b.name, b.image)) passed++;
      else failed++;
    }
  }

  // --- Joja bundles ---
  console.log('\n--- JOJA MART ---');
  for (const b of bundles().jojaBundles().get() as JojaBundle[]) {
    console.log(`  [${b.id}] ${b.name} — ${b.goldCost.toLocaleString()}g`);
    console.log(`    Unlocks: ${b.unlock}`);
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
