import { existsSync } from 'fs';
import { join } from 'path';
import { booksellerShop, booksellerTrades } from '../../src/modules/bookseller-shop';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}]: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const items = booksellerShop();
  const trades = booksellerTrades();

  console.log('\n=== BOOKSELLER SHOP ===');
  console.log(`  Items: ${items.count()}  Trades: ${trades.count()}`);

  console.log('\n--- Always available ---');
  for (const item of items.alwaysAvailable().sortByPrice().get()) {
    console.log(`  ${item.name.padEnd(30)} ${item.price.toLocaleString()}g`);
    if (checkImage(item.name, item.image)) passed++;
    else failed++;
  }

  console.log('\n--- Rotating skill books ---');
  for (const item of items.byAvailability('rotating-skill').get()) {
    const tiers = item.priceTiers
      ? item.priceTiers.map((p) => `${p.toLocaleString()}g`).join(' / ')
      : '';
    console.log(`  ${item.name.padEnd(30)} ${tiers}`);
    if (checkImage(item.name, item.image)) passed++;
    else failed++;
  }

  console.log('\n--- Rotating (Year 3+) ---');
  for (const item of items.byAvailability('rotating-year3').sortByName().get()) {
    console.log(`  ${item.name}`);
    if (checkImage(item.name, item.image)) passed++;
    else failed++;
  }

  console.log('\n--- Chance (25%) ---');
  for (const item of items.byAvailability('chance').get()) {
    console.log(`  ${item.name}  ${item.price.toLocaleString()}g`);
    if (checkImage(item.name, item.image)) passed++;
    else failed++;
  }

  console.log('\n--- Requires 100 Golden Walnuts ---');
  for (const item of items.byAvailability('golden-walnut').get()) {
    console.log(`  ${item.name}  ${item.price.toLocaleString()}g`);
    if (checkImage(item.name, item.image)) passed++;
    else failed++;
  }

  console.log('\n--- Trade-ins ---');
  for (const trade of trades.get()) {
    const receive = `${trade.receiveItems.join(' or ')} ×${trade.receiveQuantity}`;
    console.log(`  ${trade.bookName.padEnd(30)} → ${receive}`);
    if (checkImage(trade.bookName, trade.bookImage)) passed++;
    else failed++;
  }

  console.log(`\nImages: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
