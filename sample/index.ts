import { run as runAchievements } from './achievements';
import { run as runAnimals } from './animals';
import { run as runArtifacts } from './artifacts';
import { run as runArtisanGoods } from './artisan-goods';
import { run as runBait } from './bait';
import { run as runBlacksmith } from './blacksmith';
import { run as runBundles } from './bundles';
import { run as runCalculator } from './calculator';
import { run as runCarpenter } from './carpenter';
import { run as runCasino } from './casino';
import { run as runCollections } from './collections';
import { run as runCooking } from './cooking';
import { run as runCrafting } from './crafting';
import { run as runCrops } from './crops';
import { run as runDesertTrader } from './desert-trader';
import { run as runFieldOffice } from './field-office';
import { run as runFish } from './fish';
import { run as runFootwear } from './footwear';
import { run as runForageables } from './forageables';
import { run as runGuild } from './guild';
import { run as runHats } from './hats';
import { run as runIslandTrader } from './island-trader';
import { run as runJoja } from './joja';
import { run as runKrobus } from './krobus';
import { run as runMaps } from './maps';
import { run as runMarnie } from './marnie';
import { run as runMedicalSupplies } from './medical-supplies';
import { run as runMinerals } from './minerals';
import { run as runMixedSeeds } from './mixed-seeds';
import { run as runMonsters } from './monsters';
import { run as runOasis } from './oasis';
import { run as runPerfection } from './perfection';
import { run as runPierre } from './pierre';
import { run as runQiStock } from './qi-stock';
import { run as runQuests } from './quests';
import { run as runRings } from './rings';
import { run as runSaloon } from './saloon';
import { run as runSearch } from './search';
import { run as runSeasons } from './seasons';
import { run as runSkills } from './skills';
import { run as runTackle } from './tackle';
import { run as runTools } from './tools';
import { run as runTrees } from './trees';
import { run as runUniversalGifts } from './universal-gifts';
import { run as runVillagers } from './villagers';
import { run as runVolcanoShop } from './volcano-shop';
import { run as runWeaponStats } from './weapon-stats';
import { run as runWeapons } from './weapons';
import { run as runWeather } from './weather';
import { run as runWilly } from './willy';
import { run as runWizard } from './wizard';

const results = [
  runAchievements(),
  runAnimals(),
  runBundles(),
  runQuests(),
  runArtisanGoods(),
  runCalculator(),
  runCrops(),
  runTrees(),
  runMixedSeeds(),
  runMaps(),
  runSearch(),
  runSkills(),
  runWeather(),
  runSeasons(),
  runMonsters(),
  runRings(),
  runTools(),
  runWeapons(),
  runWeaponStats(),
  runHats(),
  runFootwear(),
  runFish(),
  runBait(),
  runTackle(),
  runCooking(),
  runForageables(),
  runUniversalGifts(),
  runVillagers(),
  runArtifacts(),
  runCollections(),
  runCrafting(),
  runMinerals(),
  runPerfection(),
  runQiStock(),
  runMedicalSupplies(),
  runBlacksmith(),
  runJoja(),
  runPierre(),
  runSaloon(),
  runKrobus(),
  runMarnie(),
  runWizard(),
  runWilly(),
  runGuild(),
  runCarpenter(),
  runCasino(),
  runDesertTrader(),
  runOasis(),
  runVolcanoShop(),
  runIslandTrader(),
  runFieldOffice(),
];

const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);

console.log('\n=== SUMMARY ===');
console.log(`${totalPassed} images OK, ${totalFailed} missing`);

if (totalFailed > 0) process.exit(1);
