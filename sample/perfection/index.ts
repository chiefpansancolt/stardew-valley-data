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

  console.log('\n' + '─'.repeat(60));
  // Perfection categories have no images to validate
  return { passed: 0, failed: 0 };
}
