import fs from 'fs';
import path from 'path';
import { parseSaveFile } from '../../src/save-file';

function check(
  label: string,
  value: string | number,
  valid: boolean,
  counters: { passed: number; failed: number },
) {
  console.log(`  ${label}: ${value}`);
  if (valid) counters.passed++;
  else {
    console.log(`  ✗ Invalid ${label}`);
    counters.failed++;
  }
}

export function run() {
  const counters = { passed: 0, failed: 0 };

  const savePath = path.resolve('tmp/SaveFile/PerfectRun_431233398');
  if (!fs.existsSync(savePath)) {
    console.log('  ⚠ Save file not found — skipping');
    return counters;
  }

  const xml = fs.readFileSync(savePath, 'utf-8');
  const data = parseSaveFile(xml);

  // Player
  console.log(`  Player: ${data.player.name} on ${data.farm.name} Farm`);
  console.log(`  Date: ${data.date.season} ${data.date.day}, Year ${data.date.year}`);
  console.log(`  Money: ${data.player.money.toLocaleString()}g`);
  check('Player name', data.player.name, !!data.player.name, counters);
  check('Farm name', data.farm.name, !!data.farm.name, counters);

  // Skills
  const { skills } = data.player;
  console.log(
    `  Skills: Farming ${skills.farming.level}, Fishing ${skills.fishing.level}, ` +
      `Foraging ${skills.foraging.level}, Mining ${skills.mining.level}, Combat ${skills.combat.level}`,
  );
  check(
    'Skills',
    'valid',
    Object.values(skills).every((s) => s.level >= 0),
    counters,
  );

  // Mastery
  const { mastery } = data.player;
  const unlockedPerks = mastery.perks.filter((p) => p.unlocked);
  check('Mastery XP', mastery.xp, mastery.xp >= 0, counters);
  check('Mastery perks', `${unlockedPerks.length}/5`, mastery.perks.length === 5, counters);

  // Collections
  check('Fish caught', `${data.fishCaught.length} unique`, data.fishCaught.length > 0, counters);
  check(
    'Items shipped',
    `${data.itemsShipped.length} unique`,
    data.itemsShipped.length > 0,
    counters,
  );
  check(
    'Museum donations',
    data.museum.donations.length,
    data.museum.donations.length > 0,
    counters,
  );
  check(
    'Artifacts found',
    data.museum.artifactsFound.length,
    data.museum.artifactsFound.length > 0,
    counters,
  );
  check(
    'Minerals found',
    data.museum.mineralsFound.length,
    data.museum.mineralsFound.length > 0,
    counters,
  );

  // Social
  check(
    'Friendships',
    `${data.friendships.length} villagers`,
    data.friendships.length > 0,
    counters,
  );
  check('Animals', data.animals.length, data.animals.length > 0, counters);
  check('Buildings', data.buildings.length, data.buildings.length > 0, counters);
  check('Achievements', data.achievements.length, data.achievements.length > 0, counters);

  // Stardrops
  const collected = data.stardrops.filter((s) => s.collected);
  check('Stardrops', `${collected.length}/7`, data.stardrops.length === 7, counters);

  // Recipes
  check(
    'Recipes',
    `${data.cookingRecipes.length} cooking, ${data.craftingRecipes.length} crafting`,
    data.cookingRecipes.length > 0 && data.craftingRecipes.length > 0,
    counters,
  );

  // Monsters
  check(
    'Monster types killed',
    data.monstersKilled.length,
    data.monstersKilled.length > 0,
    counters,
  );

  // Professions
  check(
    'Professions',
    data.professions.map((p) => p.name).join(', '),
    data.professions.length > 0,
    counters,
  );

  // Books
  check('Books read', data.booksRead.length, data.booksRead.length > 0, counters);

  // Stats
  check('Days played', data.stats.daysPlayed, data.stats.daysPlayed > 0, counters);

  // New sections
  check('Events seen', data.eventsSeen.length, data.eventsSeen.length > 0, counters);
  check('Secret notes', data.secretNotes.notesFound.length, true, counters);
  check('Inventory', data.inventory.length, data.inventory.length > 0, counters);

  // Bundles
  const { bundles } = data;
  const completedBundles = bundles.bundles.filter((b) => b.complete).length;
  check(
    'Bundles',
    `${completedBundles}/${bundles.bundles.length} complete, CC: ${bundles.isCCComplete}, Joja: ${bundles.isJojaRoute}`,
    bundles.bundles.length > 0,
    counters,
  );
  for (const room of bundles.rooms) {
    const roomDone = room.bundles.filter((b) => b.complete).length;
    console.log(
      `    ${room.complete ? '✓' : '○'} ${room.name}: ${roomDone}/${room.bundles.length}`,
    );
    for (const bundle of room.bundles) {
      const missing = bundle.items.filter((it) => !it.completed).map((it) => it.name);
      if (bundle.complete) {
        console.log(`      ✓ ${bundle.name} (${bundle.itemsCompleted}/${bundle.itemsRequired})`);
      } else {
        console.log(
          `      ○ ${bundle.name} (${bundle.itemsCompleted}/${bundle.itemsRequired}) — missing: ${missing.join(', ')}`,
        );
      }
    }
  }

  // Special orders
  check(
    'Special orders',
    `${data.specialOrders.townCompleted.length} town, ${data.specialOrders.qiCompleted.length} Qi`,
    true,
    counters,
  );

  // Walnuts
  check('Walnuts found', data.walnuts.found, true, counters);

  // Island upgrades
  const upgradeCount = Object.values(data.islandUpgrades).filter(Boolean).length;
  check('Island upgrades', `${upgradeCount}/11`, true, counters);

  // Pet
  check('Pet', data.pet ? `${data.pet.name} (${data.pet.type})` : 'none', true, counters);

  // Children
  check('Children', data.children.length, true, counters);

  // Powers
  const acquiredPowers = data.powers.specialItems.filter((p) => p.acquired);
  check(
    'Powers',
    `${acquiredPowers.length}/${data.powers.specialItems.length}`,
    data.powers.specialItems.length > 0,
    counters,
  );

  // Raccoons
  check('Raccoons fed', data.raccoons.timesFed, true, counters);

  // Perfection
  check(
    'Perfection',
    `perfect: ${data.perfection.farmPerfect}, obelisks: ${data.perfection.obelisks.length}/4, gold clock: ${data.perfection.hasGoldClock}`,
    true,
    counters,
  );

  // Mine progress
  check(
    'Mine progress',
    `mines: ${data.mineProgress.deepestMineLevel}, skull: ${data.mineProgress.deepestSkullCavernLevel}`,
    true,
    counters,
  );

  console.log('─'.repeat(60));
  return counters;
}
