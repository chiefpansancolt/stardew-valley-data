import { trees } from '@/modules/trees';
import { FruitTree, WildTree } from '@/types';
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

  console.log('\n=== TREES ===');
  console.log(`Total:        ${trees().count()}`);
  console.log(`Fruit trees:  ${trees().fruitTrees().count()}`);
  console.log(`Wild trees:   ${trees().wildTrees().count()}`);

  console.log('\n--- Fruit trees ---');
  console.log(
    `Spring: ${trees()
      .bySeason('spring')
      .get()
      .map((t) => t.name)
      .join(', ')}`,
  );
  console.log(
    `Summer: ${trees()
      .bySeason('summer')
      .get()
      .map((t) => t.name)
      .join(', ')}`,
  );
  console.log(
    `Fall:   ${trees()
      .bySeason('fall')
      .get()
      .map((t) => t.name)
      .join(', ')}`,
  );
  console.log(
    `By fruit sell price: ${trees()
      .fruitTrees()
      .sortByProduceSellPrice()
      .get()
      .map((t) => `${(t as FruitTree).produce.name} (${(t as FruitTree).produce.sellPrice}g)`)
      .join(', ')}`,
  );

  console.log('\n--- Wild trees ---');
  console.log(
    `Tappable: ${trees()
      .tappable()
      .get()
      .map((t) => t.name)
      .join(', ')}`,
  );
  console.log(
    `By tap sell price: ${trees()
      .tappable()
      .sortByProduceSellPrice()
      .get()
      .map((t) => `${(t as WildTree).tapper?.name} (${(t as WildTree).tapper?.sellPrice}g)`)
      .join(', ')}`,
  );

  console.log('\n--- Image validation ---');

  for (const tree of trees().fruitTrees().get()) {
    const t = tree as FruitTree;
    if (checkImage(t.name, 'image', t.image)) passed++;
    else failed++;

    if (checkImage(t.name, 'saplingImage', t.saplingImage)) passed++;
    else failed++;

    if (checkImage(t.name, 'produce.image', t.produce.image)) passed++;
    else failed++;

    for (const stage of t.stages) {
      if (checkImage(t.name, `stage:${stage.name}`, stage.image)) passed++;
      else failed++;
    }
  }

  for (const tree of trees().wildTrees().get()) {
    const t = tree as WildTree;
    if (checkImage(t.name, 'image', t.image)) passed++;
    else failed++;

    if (checkImage(t.name, 'seedImage', t.seedImage)) passed++;
    else failed++;

    if (t.tapper) {
      if (checkImage(t.name, 'tapper.image', t.tapper.image)) passed++;
      else failed++;
    }

    for (const stage of t.stages) {
      if (checkImage(t.name, `stage:${stage.name}`, stage.image)) passed++;
      else failed++;
    }
  }

  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
