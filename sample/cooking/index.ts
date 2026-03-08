import * as fs from 'fs';
import * as path from 'path';
import { cooking } from '../../src/cooking';

const root = path.resolve(__dirname, '../../');

function checkImage(imagePath: string): boolean {
  return fs.existsSync(path.join(root, imagePath));
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== COOKING ===\n');

  const allDishes = cooking().sortByName().get();

  console.log(`Total: ${allDishes.length} cooked dishes\n`);

  for (const dish of allDishes) {
    const ingredientList = dish.ingredients
      .map((i) => `${i.name}${i.quantity > 1 ? ` x${i.quantity}` : ''}`)
      .join(', ');
    console.log(
      `  ${dish.name} — ${dish.sellPrice}g | E:${dish.energyHealth.energy} H:${dish.energyHealth.health} | ${ingredientList}`,
    );
  }

  console.log('\n--- Image validation ---');

  for (const dish of allDishes) {
    if (checkImage(dish.image)) {
      passed++;
    } else {
      failed++;
      console.log(`  MISSING: ${dish.image}`);
    }
  }

  console.log('─'.repeat(60));
  return { passed, failed };
}
