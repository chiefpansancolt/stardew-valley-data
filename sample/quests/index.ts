import { quests } from '@/modules/quests';

export function run(): { passed: number; failed: number } {
  console.log('\n=== QUESTS ===');
  console.log(`Total quests: ${quests().count()}`);

  console.log('\n--- Story quests ---');
  for (const q of quests().sortByName().get()) {
    console.log(`  [${q.id}] ${q.name}`);
    console.log(`    From:     ${q.providedBy}`);
    console.log(`    Requires: ${q.requirements}`);
    console.log(`    Rewards:  ${q.rewards}`);
  }

  console.log('\n' + '─'.repeat(60));
  return { passed: 0, failed: 0 };
}
