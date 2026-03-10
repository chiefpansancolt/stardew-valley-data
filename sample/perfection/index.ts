import { perfection } from '../../src/modules/perfection';

export function run(): { passed: number; failed: number } {
  const q = perfection();

  console.log('\n=== PERFECTION ===');
  console.log(`  Total categories: ${q.count()}`);
  console.log(`  Total weight: ${q.totalWeight()}%`);

  for (const cat of q.get()) {
    console.log(
      `  [${String(cat.weight).padStart(2)}%] ${cat.name.padEnd(28)} → ${cat.count} ${cat.unit}`,
    );
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: 0 OK, 0 missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed: 0, failed: 0 };
}
