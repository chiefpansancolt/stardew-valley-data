import { professions } from '@/modules/professions';
import {
  getMasteryLevel,
  getProfessionOptions,
  getTitle,
  MASTERY_LEVELS,
  skills,
} from '@/modules/skills';
import { ProfessionSkill } from '@/types';
import { existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '../..');

function checkImage(name: string, label: string, imgPath: string): boolean {
  if (existsSync(join(ROOT, imgPath))) return true;
  console.error(`  MISSING [${name}] ${label}: ${imgPath}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== SKILLS ===');
  console.log(`Total: ${skills().count()}`);

  for (const skill of skills().get()) {
    console.log(`\n${skill.name} (id: ${skill.id})`);
    console.log(`  Tool bonus: ${skill.toolBonus}`);

    for (const lvl of skill.levels) {
      const crafting = lvl.recipes.crafting.length > 0 ? lvl.recipes.crafting.join(', ') : '—';
      const cooking = lvl.recipes.cooking.length > 0 ? lvl.recipes.cooking.join(', ') : '—';
      console.log(
        `  Level ${lvl.level} (${lvl.totalXp.toLocaleString()} XP): crafting=[${crafting}] cooking=[${cooking}]`,
      );
    }

    const skillProfs = professions().bySkill(skill.name as ProfessionSkill);
    for (const level of [5, 10] as const) {
      const profs = skillProfs.byLevel(level).get();
      console.log(`  Level ${level} professions:`);
      for (const p of profs) {
        const parent = p.parentProfession
          ? ` (requires ${skillProfs.find(p.parentProfession)?.name})`
          : '';
        console.log(`    ${p.name}${parent}: ${p.description}`);
      }
    }

    console.log(`  Mastery unlocks:`);
    for (const unlock of skill.mastery.unlocks) {
      console.log(`    - ${unlock}`);
    }
  }

  console.log('\n--- Title examples ---');
  console.log(`All 0:           "${getTitle(0, 0, 0, 0, 0)}"`);
  console.log(`All 5:           "${getTitle(5, 5, 5, 5, 5)}"`);
  console.log(`All 10:          "${getTitle(10, 10, 10, 10, 10)}"`);
  console.log(`Mixed (10,8,6,7,9): "${getTitle(10, 8, 6, 7, 9)}"`);

  console.log('\n--- Mastery levels ---');
  for (const ml of MASTERY_LEVELS) {
    console.log(`  Level ${ml.level}: ${ml.totalXp.toLocaleString()} total XP`);
  }
  console.log(`getMasteryLevel(45000) = ${getMasteryLevel(45000)}`);
  console.log(`getMasteryLevel(500)   = ${getMasteryLevel(500)}`);

  console.log('\n--- getProfessionOptions examples ---');
  const tillerOptions = getProfessionOptions('Farming', 'Tiller');
  console.log(`Farming > Tiller: ${tillerOptions.map((p) => p.name).join(', ')}`);
  const scoutOptions = getProfessionOptions('Combat', 'Scout');
  console.log(`Combat  > Scout:  ${scoutOptions.map((p) => p.name).join(', ')}`);

  console.log('\n--- Image validation ---');
  for (const skill of skills().get()) {
    if (checkImage(skill.name, 'image', skill.image)) passed++;
    else failed++;
  }

  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
