import { existsSync } from 'fs';
import { join } from 'path';
import { maps } from '../../src/maps';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, label: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}] ${label}: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== MAPS ===');
  console.log(`Total: ${maps().count()}`);

  for (const map of maps().get()) {
    console.log(`\n${map.name} (id: ${map.id})`);
    console.log(`  Skills:        ${map.skills.join(', ')}`);
    console.log(`  Tillable:      ${map.tillableTiles} tiles`);
    console.log(`  Starting:      ${map.startingItems.join(', ')}`);
    for (const feature of map.features) {
      console.log(`  - ${feature}`);
    }
  }

  console.log('\n--- Skill queries ---');
  console.log(
    `Farming:    ${maps()
      .bySkill('Farming')
      .get()
      .map((m) => m.name)
      .join(', ')}`,
  );
  console.log(
    `Fishing:    ${maps()
      .bySkill('Fishing')
      .get()
      .map((m) => m.name)
      .join(', ')}`,
  );
  console.log(
    `Foraging:   ${maps()
      .bySkill('Foraging')
      .get()
      .map((m) => m.name)
      .join(', ')}`,
  );
  console.log(
    `Mining:     ${maps()
      .bySkill('Mining')
      .get()
      .map((m) => m.name)
      .join(', ')}`,
  );
  console.log(
    `Combat:     ${maps()
      .bySkill('Combat')
      .get()
      .map((m) => m.name)
      .join(', ')}`,
  );
  console.log(
    `Multiplayer:${maps()
      .bySkill('Multiplayer')
      .get()
      .map((m) => m.name)
      .join(', ')}`,
  );
  console.log(`find("0"):  ${maps().find('0')?.name}`);
  console.log(`findByName("Beach"): ${maps().findByName('Beach')?.name}`);

  console.log('\n--- Image validation ---');
  for (const map of maps().get()) {
    if (checkImage(map.name, 'image', map.image)) passed++;
    else failed++;

    if (checkImage(map.name, 'icon', map.icon)) passed++;
    else failed++;
  }

  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
