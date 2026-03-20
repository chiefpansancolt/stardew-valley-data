import {
  artisanCalculator,
  knowledgeCalculator,
  professionCalculator,
  qualityCalculator,
} from '@/modules/calculator';
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

  const artisan = artisanCalculator();

  console.log('\n=== ARTISAN CALCULATOR ===');

  console.log('\n--- Roe (Catfish: 200g) ---');
  console.log(`  sellPrice: ${artisan.roe(200).sellPrice}g`); // 130

  console.log('\n--- Aged Roe (Catfish: 200g) ---');
  console.log(`  sellPrice: ${artisan.agedRoe(200).sellPrice}g`); // 260

  console.log('\n--- Honey (wild) ---');
  console.log(`  sellPrice: ${artisan.honey(0).sellPrice}g`); // 100

  console.log('\n--- Honey (Tulip: 30g) ---');
  console.log(`  sellPrice: ${artisan.honey(30).sellPrice}g`); // 160

  console.log('\n--- Wine (Starfruit: 750g, 98 energy, 44 health) ---');
  const wine = artisan.wine(750, 98, 44);
  console.log(`  sellPrice: ${wine.sellPrice}g, energy: ${wine.energy}, health: ${wine.health}`); // 2250g

  console.log('\n--- Juice (Pumpkin: 320g, 145 energy, 65 health) ---');
  const juice = artisan.juice(320, 145, 65);
  console.log(`  sellPrice: ${juice.sellPrice}g, energy: ${juice.energy}, health: ${juice.health}`); // 720g

  console.log('\n--- Pickles (Pumpkin: 320g, 145 energy, 65 health) ---');
  const pickles = artisan.pickles(320, 145, 65);
  console.log(
    `  sellPrice: ${pickles.sellPrice}g, energy: ${pickles.energy}, health: ${pickles.health}`,
  ); // 690g

  console.log('\n--- Jelly (Strawberry: 120g, 26 energy, 11 health) ---');
  const jelly = artisan.jelly(120, 26, 11);
  console.log(`  sellPrice: ${jelly.sellPrice}g, energy: ${jelly.energy}, health: ${jelly.health}`); // 290g

  console.log('\n--- Dried Mushrooms (Morel: 150g, 67 energy, 30 health) ---');
  const driedMushrooms = artisan.driedMushrooms(150, 67, 30);
  console.log(
    `  sellPrice: ${driedMushrooms.sellPrice}g, energy: ${driedMushrooms.energy}, health: ${driedMushrooms.health}`,
  ); // 1150g

  console.log('\n--- Dried Fruit (Apricot: 50g, 38 energy, 17 health) ---');
  const driedFruit = artisan.driedFruit(50, 38, 17);
  console.log(
    `  sellPrice: ${driedFruit.sellPrice}g, energy: ${driedFruit.energy}, health: ${driedFruit.health}`,
  ); // 375g

  console.log('\n--- Smoked Fish (Tuna: 100g, 50 energy, 22 health) ---');
  const smokedFish = artisan.smokedFish(100, 50, 22);
  console.log(
    `  sellPrice: ${smokedFish.sellPrice}g, energy: ${smokedFish.energy}, health: ${smokedFish.health}`,
  ); // 200g

  const profession = professionCalculator();

  console.log('\n=== PROFESSION CALCULATOR ===');

  console.log('\n--- Artisan (Starfruit Wine: 2250g) ---');
  console.log(`  artisan: ${profession.artisan(2250)}g`); // 3150

  console.log('\n--- Rancher (Truffle: 625g) ---');
  console.log(`  rancher: ${profession.rancher(625)}g`); // 750

  console.log('\n--- Tiller (Starfruit: 750g) ---');
  console.log(`  tiller: ${profession.tiller(750)}g`); // 825

  console.log('\n--- Blacksmith (Gold Bar: 250g) ---');
  console.log(`  blacksmith: ${profession.blacksmith(250)}g`); // 375

  console.log('\n--- Gemologist (Diamond: 750g) ---');
  console.log(`  gemologist: ${profession.gemologist(750)}g`); // 975

  console.log('\n--- Tapper (Oak Resin: 150g) ---');
  console.log(`  tapper: ${profession.tapper(150)}g`); // 187

  console.log('\n--- Fisher (Tuna: 100g) ---');
  console.log(`  fisher: ${profession.fisher(100)}g`); // 125

  console.log('\n--- Angler (Legend: 5000g) ---');
  console.log(`  angler: ${profession.angler(5000)}g`); // 7500

  const knowledge = knowledgeCalculator();

  console.log('\n=== KNOWLEDGE CALCULATOR ===');

  console.log('\n--- Spring Onion Mastery (Spring Onion: 8g) ---');
  console.log(`  springOnionMastery: ${knowledge.springOnionMastery(8)}g`); // 40

  console.log("\n--- Bear's Knowledge (Blackberry: 20g) ---");
  console.log(`  bearsKnowledge: ${knowledge.bearsKnowledge(20)}g`); // 60

  console.log("\n--- Bear's Knowledge (Salmonberry: 5g) ---");
  console.log(`  bearsKnowledge: ${knowledge.bearsKnowledge(5)}g`); // 15

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
