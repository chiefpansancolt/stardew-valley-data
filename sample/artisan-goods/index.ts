import { existsSync } from 'fs';
import { join } from 'path';
import { artisanGoods } from '../../src/artisan-goods';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}]: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== ARTISAN GOODS ===');
  console.log(`Total: ${artisanGoods().count()}`);

  for (const good of artisanGoods().get()) {
    const price =
      good.sellPrice !== null ? `${good.sellPrice}g` : `formula (${good.sellPriceFormula})`;
    const cask = good.cask
      ? `cask: ${good.cask.silverDays}/${good.cask.goldDays}/${good.cask.iridiumDays}d`
      : 'no cask';
    console.log(
      `  ${good.name} (${good.equipment}) — ${price} — ${cask} — ${good.processingMinutes}min`,
    );
    if (checkImage(good.name, good.image)) passed++;
    else failed++;
  }

  console.log('\n--- By equipment ---');
  const equipments = [
    ...new Set(
      artisanGoods()
        .get()
        .map((g) => g.equipment),
    ),
  ];
  equipments.forEach((eq) => {
    const items = artisanGoods()
      .byEquipment(eq)
      .get()
      .map((g) => g.name)
      .join(', ');
    console.log(`  ${eq}: ${items}`);
  });

  console.log('\n--- Cask-ageable ---');
  const caskable = artisanGoods().caskAgeable().get();
  console.log(`  ${caskable.map((g) => g.name).join(', ')} (${caskable.length} total)`);

  console.log('\n--- Formula-priced ---');
  const formula = artisanGoods().formulaPrice().get();
  console.log(`  ${formula.map((g) => g.name).join(', ')} (${formula.length} total)`);

  console.log(`\nImages: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
