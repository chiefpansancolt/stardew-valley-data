import { qualityCalculator } from '@/modules/calculator';
import { existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}]: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const calc = qualityCalculator();

  console.log('\n=== QUALITY CALCULATOR ===');

  console.log('\n--- Sell prices (base: 200g) ---');
  for (const tier of calc.sellPrices(200)) {
    console.log(`  ${tier.quality}: ${tier.value}g — ${tier.icon}`);
    if (checkImage(tier.quality, tier.icon)) passed++;
    else failed++;
  }

  console.log('\n--- Sell prices (base: 625g — Truffle) ---');
  for (const tier of calc.sellPrices(625)) {
    console.log(`  ${tier.quality}: ${tier.value}g`);
  }

  console.log('\n--- Energy/health (Parsnip: 38 energy / 17 health) ---');
  for (const tier of calc.energyHealth(38, 17)) {
    console.log(`  ${tier.quality}: ${tier.energy} energy / ${tier.health} health — ${tier.icon}`);
  }

  console.log('\n--- Energy/health (Melon: 100 energy / 45 health) ---');
  for (const tier of calc.energyHealth(100, 45)) {
    console.log(`  ${tier.quality}: ${tier.energy} energy / ${tier.health} health`);
  }

  console.log(`\nImages: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
