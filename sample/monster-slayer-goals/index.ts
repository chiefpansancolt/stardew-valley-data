import { existsSync } from 'fs';
import { join } from 'path';
import { monsterSlayerGoals } from '../../src/modules/monster-slayer-goals';

const ROOT = join(__dirname, '../..');

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const all = monsterSlayerGoals();

  console.log('\n=== MONSTER SLAYER GOALS ===');
  console.log(`  Total: ${all.count()}`);

  for (const goal of all.sortByKillTarget().get()) {
    const label = `  [${String(goal.killTarget).padStart(4)} kills] ${goal.name.padEnd(15)} → ${goal.reward.name}`;
    if (goal.reward.image) {
      if (existsSync(join(ROOT, goal.reward.image))) {
        passed++;
        console.log(label);
      } else {
        failed++;
        console.error(`${label}  MISSING: ${goal.reward.image}`);
      }
    } else {
      console.log(label);
    }
  }

  console.log(`\nImages: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
