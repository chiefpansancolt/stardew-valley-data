import { animals, isFarmAnimal, isPet } from '@/modules/animals';
import { existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, label: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}] ${label}: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== ANIMALS ===');
  console.log(`Total: ${animals().count()}`);
  console.log(`  Pets: ${animals().pets().count()}`);
  console.log(`  Farm animals: ${animals().farmAnimals().count()}`);

  console.log('\n--- Pets ---');
  for (const animal of animals().pets().get()) {
    if (!isPet(animal)) continue;
    console.log(`  ${animal.name} (id: ${animal.id})`);
    if (checkImage(animal.name, 'image', animal.image)) passed++;
    else failed++;
  }

  console.log('\n--- Farm Animals ---');
  for (const animal of animals().farmAnimals().get()) {
    if (!isFarmAnimal(animal)) continue;
    const price = animal.purchasePrice !== null ? `${animal.purchasePrice}g` : 'not purchasable';
    console.log(`  ${animal.name} (id: ${animal.id})`);
    console.log(`    Building: ${animal.building} | Price: ${price} | Sell: ${animal.sellPrice}g`);
    console.log(
      `    Matures in: ${animal.daysToMature}d | Produces every: ${animal.daysToProduce}d | Method: ${animal.harvestMethod}${animal.harvestTool ? ` (${animal.harvestTool})` : ''}`,
    );
    console.log(
      `    Produce: ${animal.produce.name} (${animal.produce.sellPrice}g)${animal.deluxeProduce ? ` | Deluxe: ${animal.deluxeProduce.name} (${animal.deluxeProduce.sellPrice}g)` : ''}`,
    );
    if (checkImage(animal.name, 'image', animal.image)) passed++;
    else failed++;
    if (checkImage(animal.name, 'produce image', animal.produce.image)) passed++;
    else failed++;
    if (animal.deluxeProduce) {
      if (checkImage(animal.name, 'deluxe produce image', animal.deluxeProduce.image)) passed++;
      else failed++;
    }
  }

  console.log('\n--- Filter examples ---');
  console.log(`Barn animals: ${animals().byBuilding('Barn').count()}`);
  console.log(`Purchasable: ${animals().farmAnimals().purchasable().count()}`);
  console.log(`Tool harvest: ${animals().byHarvestMethod('tool').count()}`);

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
