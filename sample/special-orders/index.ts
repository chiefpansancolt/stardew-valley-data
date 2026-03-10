import { specialOrders } from '../../src/modules/special-orders';

export function run(): { passed: number; failed: number } {
  const passed = 0;
  const failed = 0;

  const all = specialOrders();

  console.log('\n=== SPECIAL ORDERS ===');
  console.log(`  Total: ${all.count()}`);

  const town = all.byType('town');
  const qi = all.byType('qi');
  console.log(`  Town orders: ${town.count()}`);
  console.log(`  Qi orders: ${qi.count()}`);
  console.log(`  Repeatable: ${all.repeatable().count()}`);

  console.log('\n  Town orders:');
  for (const order of town.sortByName().get()) {
    const repeatTag = order.repeatable ? ' [repeatable]' : '';
    console.log(
      `    ${order.id.padEnd(15)} ${order.name.padEnd(30)} (${order.requester})${repeatTag}`,
    );
    console.log(`      ${order.timeframe} days — ${order.requirements}`);
  }

  console.log('\n  Qi orders:');
  for (const order of qi.sortByName().get()) {
    console.log(`    ${order.id.padEnd(20)} ${order.name} — ${order.timeframe} days`);
    console.log(`      ${order.requirements}`);
    console.log(`      Rewards: ${order.rewards}`);
  }

  // No images to validate
  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing (no images for this module)`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
