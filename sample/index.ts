import { run as runAnimals } from './animals';
import { run as runArtisanGoods } from './artisan-goods';
import { run as runCalculator } from './calculator';
import { run as runCrops } from './crops';
import { run as runMaps } from './maps';
import { run as runMixedSeeds } from './mixed-seeds';
import { run as runSearch } from './search';
import { run as runSkills } from './skills';
import { run as runTrees } from './trees';
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
];

const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);

console.log('\n=== SUMMARY ===');
console.log(`${totalPassed} images OK, ${totalFailed} missing`);

if (totalFailed > 0) process.exit(1);
