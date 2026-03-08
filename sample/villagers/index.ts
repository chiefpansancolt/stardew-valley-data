import { existsSync } from 'fs';
import { villagers } from '../../src/villagers';

function checkImage(name: string, image: string): boolean {
  if (existsSync(image)) return true;
  console.error(`  MISSING image for ${name}: ${image}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== VILLAGERS ===');
  console.log(`Total villagers: ${villagers().count()}`);
  console.log(`Marriageable: ${villagers().marriageable().count()}`);

  console.log('\n--- All villagers ---');
  for (const v of villagers().sortByBirthday().get()) {
    const marryFlag = v.marriageable ? ' [♥]' : '';
    console.log(
      `  [${v.id}]${marryFlag} ${v.name} — ${v.birthday.season} ${v.birthday.day} | ${v.address}`,
    );
    if (checkImage(v.name, v.image)) passed++;
    else failed++;
    if (v.spouseImage) {
      if (checkImage(`${v.name} (spouse)`, v.spouseImage)) passed++;
      else failed++;
    }
  }

  console.log('\n--- Marriageable villagers ---');
  for (const v of villagers().marriageable().sortByName().get()) {
    console.log(`  ${v.name} — loves: ${v.loves.join(', ')}`);
  }

  console.log('\n--- By season ---');
  for (const season of ['spring', 'summer', 'fall', 'winter'] as const) {
    const names = villagers()
      .byBirthdaySeason(season)
      .sortByBirthday()
      .get()
      .map((v) => `${v.name} (${v.birthday.day})`)
      .join(', ');
    console.log(`  ${season}: ${names}`);
  }

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
