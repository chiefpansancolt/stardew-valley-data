import { existsSync } from 'fs';
import { rings } from '../../src/rings';

function checkImage(name: string, image: string): boolean {
  if (existsSync(image)) return true;
  console.error(`  MISSING image for ${name}: ${image}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== RINGS ===');
  console.log(`Total rings: ${rings().count()}`);

  console.log('\n--- All rings ---');
  for (const ring of rings().get()) {
    const craftStr =
      ring.ingredients.length > 0
        ? ` [Craft: ${ring.ingredients.map((i) => `${i.name} x${i.quantity}`).join(', ')}]`
        : '';
    const buyStr = ring.purchasePrice !== null ? ` [Buy: ${ring.purchasePrice}g]` : '';
    console.log(`  [${ring.id}] ${ring.name} — ${ring.sellPrice}g${craftStr}${buyStr}`);
    if (checkImage(ring.name, ring.image)) passed++;
    else failed++;
  }

  console.log('\n--- Filters ---');
  console.log(`  Craftable: ${rings().craftable().count()} rings`);
  console.log(`  Purchasable: ${rings().purchasable().count()} rings`);

  console.log('\n--- Craftable rings ---');
  for (const ring of rings().craftable().get()) {
    console.log(
      `  ${ring.name} (${ring.craftingSkill} ${ring.craftingLevel}) — ${ring.ingredients.map((i) => `${i.name} x${i.quantity}`).join(', ')}`,
    );
  }

  console.log('\n--- Top 5 by sell price ---');
  for (const ring of rings().sortBySellPrice('desc').get().slice(0, 5)) {
    console.log(`  ${ring.name}: ${ring.sellPrice}g`);
  }

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
