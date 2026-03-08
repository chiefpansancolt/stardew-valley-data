import { quests } from '@/modules/quests';
import { QiSpecialOrder, StoryQuest } from '@/types';

export function run(): { passed: number; failed: number } {
  console.log('\n=== QUESTS ===');
  console.log(`Total quests: ${quests().count()}`);
  console.log(`  Story:             ${quests().byType('story').count()}`);
  console.log(`  Special Orders:    ${quests().byType('special-order').count()}`);
  console.log(`  Qi Special Orders: ${quests().byType('qi-special-order').count()}`);

  console.log('\n--- Story quests ---');
  for (const q of quests().byType('story').get() as StoryQuest[]) {
    console.log(`  [${q.id}] ${q.name}`);
    console.log(`    From:     ${q.providedBy}`);
    console.log(`    Requires: ${q.requirements}`);
    console.log(`    Rewards:  ${q.rewards}`);
  }

  console.log('\n--- Special Orders ---');
  for (const q of quests().byType('special-order').sortByName().get()) {
    if (q.type !== 'special-order') continue;
    const repeatTag = q.repeatable ? ' [repeatable]' : '';
    console.log(`  [${q.id}]${repeatTag} ${q.name} — ${q.timeframe} days`);
    console.log(`    From:     ${q.providedBy}`);
    console.log(`    Requires: ${q.requirements}`);
    console.log(`    Rewards:  ${q.rewards}`);
  }

  console.log("\n--- Mr. Qi's Special Orders ---");
  for (const q of quests().byType('qi-special-order').get() as QiSpecialOrder[]) {
    console.log(`  [${q.id}] ${q.name} — ${q.timeframe} days`);
    console.log(`    Requires: ${q.requirements}`);
    console.log(`    Rewards:  ${q.rewards}`);
  }

  console.log('\n--- Repeatable Special Orders ---');
  for (const q of quests().repeatable().sortByName().get()) {
    console.log(`  ${q.name}`);
  }

  console.log('\n' + '─'.repeat(60));
  return { passed: 0, failed: 0 };
}
