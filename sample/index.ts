import { run as runAchievements } from './achievements';
import { run as runAnimals } from './animals';
import { run as runArtisanGoods } from './artisan-goods';
import { run as runBundles } from './bundles';
import { run as runCalculator } from './calculator';
import { run as runCrops } from './crops';
import { run as runFish } from './fish';
import { run as runFootwear } from './footwear';
import { run as runForageables } from './forageables';
import { run as runHats } from './hats';
import { run as runMaps } from './maps';
import { run as runMixedSeeds } from './mixed-seeds';
import { run as runMonsters } from './monsters';
import { run as runQuests } from './quests';
import { run as runRings } from './rings';
import { run as runSearch } from './search';
import { run as runSeasons } from './seasons';
import { run as runSkills } from './skills';
import { run as runTools } from './tools';
import { run as runTrees } from './trees';
import { run as runUniversalGifts } from './universal-gifts';
import { run as runVillagers } from './villagers';
import { run as runWeaponStats } from './weapon-stats';
import { run as runWeapons } from './weapons';
import { run as runWeather } from './weather';

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
  runForageables(),
  runUniversalGifts(),
  runVillagers(),
];

const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);

console.log('\n=== SUMMARY ===');
console.log(`${totalPassed} images OK, ${totalFailed} missing`);

if (totalFailed > 0) process.exit(1);
