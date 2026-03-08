import { run as runAnimals } from './animals';
import { run as runArtisanGoods } from './artisan-goods';
import { run as runCalculator } from './calculator';
import { run as runCrops } from './crops';
import { run as runMaps } from './maps';
import { run as runMixedSeeds } from './mixed-seeds';
import { run as runMonsters } from './monsters';
import { run as runRings } from './rings';
import { run as runSearch } from './search';
import { run as runSeasons } from './seasons';
import { run as runSkills } from './skills';
import { run as runTrees } from './trees';
import { run as runUniversalGifts } from './universal-gifts';
import { run as runVillagers } from './villagers';
import { run as runWeather } from './weather';

const results = [
  runAnimals(),
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
  runUniversalGifts(),
  runVillagers(),
];

const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);

console.log('\n=== SUMMARY ===');
console.log(`${totalPassed} images OK, ${totalFailed} missing`);

if (totalFailed > 0) process.exit(1);
