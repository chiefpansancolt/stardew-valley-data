import { search } from '@/modules/search';
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

  console.log('\n=== SEARCH ===');

  const queries = ['egg', 'wine', 'maple', 'parsnip', 'cat'];

  for (const query of queries) {
    const results = search(query);
    console.log(`\n  search("${query}") — ${results.length} result(s):`);
    for (const r of results) {
      const price = r.sellPrice !== null ? `${r.sellPrice}g` : 'n/a';
      const from = r.parents ? ` (from ${r.parents.map((p) => p.name).join(', ')})` : '';
      console.log(`    [${r.kind}] ${r.name}${from} — ${price}`);
      if (checkImage(r.name, r.image)) passed++;
      else failed++;
    }
  }

  // Kind filter example
  console.log('\n  search("egg", kinds: ["animal-produce", "crop"]):');
  for (const r of search('egg', ['animal-produce', 'crop'])) {
    const from = r.parents ? ` (from ${r.parents.map((p) => p.name).join(', ')})` : '';
    console.log(`    [${r.kind}] ${r.name}${from}`);
  }

  console.log(`\nImages: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
