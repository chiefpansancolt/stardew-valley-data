import { monsterLoot, monsters } from '@/modules/monsters';
import { existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}]: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== MONSTERS ===');
  console.log(`Total monsters: ${monsters().count()}`);
  console.log(`Total monster loot: ${monsterLoot().count()}`);

  console.log('\n--- Monster loot ---');
  for (const loot of monsterLoot().get()) {
    const droppers = loot.droppedBy.length;
    console.log(
      `  [${loot.id}] ${loot.name} — ${loot.sellPrice}g (dropped by ${droppers} monsters)`,
    );
    if (checkImage(loot.name, loot.image)) passed++;
    else failed++;
  }

  console.log('\n--- All monsters ---');
  for (const m of monsters().get()) {
    const lootNames =
      m.lootIds.map((id) => monsterLoot().find(id)?.name ?? id).join(', ') || 'none';
    const dangerFlag = m.dangerous ? ' [DANGEROUS]' : '';
    console.log(
      `  [${m.id}] ${m.name}${dangerFlag} — HP:${m.hp} DMG:${m.damage} XP:${m.xp} | loot: ${lootNames}`,
    );
    if (checkImage(m.name, m.image)) passed++;
    else failed++;
  }

  console.log('\n--- Filters ---');
  console.log(`  Skull Cavern: ${monsters().byLocation('Skull Cavern').count()} monsters`);
  console.log(`  Volcano Dungeon: ${monsters().byLocation('Volcano').count()} monsters`);
  console.log(`  Dangerous only: ${monsters().dangerous().count()} monsters`);
  console.log(
    `  Drops Solar Essence (768): ${monsters()
      .dropsLoot('768')
      .get()
      .map((m) => m.name)
      .join(', ')}`,
  );
  console.log(
    `  Drops Void Essence (769): ${monsters()
      .dropsLoot('769')
      .get()
      .map((m) => m.name)
      .join(', ')}`,
  );

  console.log('\n--- Top 5 by XP ---');
  for (const m of monsters().sortByXp('desc').get().slice(0, 5)) {
    console.log(`  ${m.name}: ${m.xp} XP`);
  }

  console.log('\n--- Monster loot dropped by serpent ---');
  for (const l of monsterLoot().droppedBy('serpent').get()) {
    console.log(`  ${l.name}`);
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
