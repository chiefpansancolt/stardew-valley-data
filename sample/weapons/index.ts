import { existsSync } from 'fs';
import { MeleeWeapon } from '../../src/types';
import { weapons } from '../../src/weapons';

function checkImage(name: string, image: string): boolean {
  if (existsSync(image)) return true;
  console.error(`  MISSING image for ${name}: ${image}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== WEAPONS ===');
  console.log(`Total weapons: ${weapons().count()}`);
  console.log(`  Swords:     ${weapons().swords().count()}`);
  console.log(`  Daggers:    ${weapons().daggers().count()}`);
  console.log(`  Clubs:      ${weapons().clubs().count()}`);
  console.log(`  Slingshots: ${weapons().slingshots().count()}`);
  console.log(`  Enchantable: ${weapons().canEnchant().count()}`);

  const types = ['sword', 'dagger', 'club'] as const;
  const labels = { sword: 'SWORDS', dagger: 'DAGGERS', club: 'CLUBS' };

  for (const type of types) {
    console.log(`\n--- ${labels[type]} ---`);
    const list = weapons().byType(type).sortByLevel().get() as MeleeWeapon[];
    for (const w of list) {
      console.log(
        `  [Lv${w.level}] ${w.name} — ${w.damageMin}–${w.damageMax} dmg` +
          (w.speed !== 0 ? ` spd${w.speed > 0 ? '+' : ''}${w.speed}` : '') +
          (w.defense > 0 ? ` def+${w.defense}` : '') +
          (w.critPower > 0 ? ` crit+${w.critPower}` : ''),
      );
      if (checkImage(w.name, w.image)) passed++;
      else failed++;
    }
  }

  console.log('\n--- SLINGSHOTS ---');
  for (const w of weapons().slingshots().get()) {
    console.log(`  ${w.name}`);
    if (checkImage(w.name, w.image)) passed++;
    else failed++;
  }

  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
