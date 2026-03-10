import { existsSync } from 'fs';
import { collections } from '../../src/modules/collections';
import { CollectionItem } from '../../src/types';

const COLS = 10;
const ROWS = 7;
const COL_WIDTH = 20;

function checkImage(name: string, image: string): boolean {
  if (existsSync(image)) return true;
  console.error(`  MISSING image for ${name}: ${image}`);
  return false;
}

function printGrid(items: CollectionItem[]): void {
  const pageSize = COLS * ROWS;
  const divider = ('----' + '-'.repeat(COL_WIDTH + 1)).repeat(COLS) + '----';

  for (let p = 0; p < items.length; p += pageSize) {
    const page = items.slice(p, p + pageSize);
    if (p > 0) console.log(`  --- page ${Math.floor(p / pageSize) + 1} ---`);

    for (let r = 0; r < ROWS; r++) {
      const row = page.slice(r * COLS, (r + 1) * COLS);
      if (row.length === 0) break;
      const cells = row.map((item) => item.name.slice(0, COL_WIDTH).padEnd(COL_WIDTH));
      console.log('| ' + cells.join(' | ') + ' |');
      console.log(divider);
    }
  }
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const col = collections();

  console.log('\n=== COLLECTIONS ===');
  console.log(`  Items Shipped: ${col.itemsShipped().count()} resolved`);
  console.log(`  Fish:          ${col.fish().count()} resolved`);
  console.log(`  Artifacts:     ${col.artifacts().count()} resolved`);
  console.log(`  Minerals:      ${col.minerals().count()} resolved`);
  console.log(`  Cooking:       ${col.cooking().count()} resolved`);
  console.log(`  Crafting:      ${col.crafting().count()} resolved`);

  const sections: [string, ReturnType<typeof col.fish>][] = [
    ['Items Shipped', col.itemsShipped()],
    ['Fish', col.fish()],
    ['Artifacts', col.artifacts()],
    ['Minerals', col.minerals()],
    ['Cooking', col.cooking()],
  ];

  for (const [label, query] of sections) {
    const items = query.get();
    console.log(`\n--- ${label} ---`);
    printGrid(items);
    for (const item of items) {
      if (checkImage(item.name, item.image)) passed++;
      else failed++;
    }
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
