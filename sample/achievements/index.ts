import { achievements } from '@/modules/achievements';
import { existsSync } from 'fs';

function checkImage(name: string, image: string): boolean {
  if (existsSync(image)) return true;
  console.error(`  MISSING image for ${name}: ${image}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== ACHIEVEMENTS ===');
  console.log(`Total achievements: ${achievements().count()}`);
  console.log(`  In-game:     ${achievements().inGame().count()}`);
  console.log(`  Platform:    ${achievements().count() - achievements().inGame().count()}`);
  console.log(`  Secret:      ${achievements().secret().count()}`);
  console.log(`  With reward: ${achievements().withReward().count()}`);

  console.log('\n--- All achievements ---');
  for (const a of achievements().get()) {
    const tags = [a.secret ? '[secret]' : '', a.icon ? '[in-game]' : '[platform]']
      .filter(Boolean)
      .join(' ');
    console.log(`  [${a.id}] ${a.name} ${tags}`);
    if (a.reward) console.log(`    Reward: ${a.reward}`);

    if (checkImage(a.name, a.image)) passed++;
    else failed++;

    if (a.icon) {
      if (checkImage(`${a.name} (icon)`, a.icon)) passed++;
      else failed++;
    }
  }

  console.log('\n--- Secret achievements ---');
  for (const a of achievements().secret().get()) {
    console.log(`  ${a.name} — ${a.description}`);
  }

  console.log('\n--- In-game achievements with rewards ---');
  for (const a of achievements().inGame().withReward().sortByName().get()) {
    console.log(`  ${a.name} → ${a.reward}`);
  }

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
