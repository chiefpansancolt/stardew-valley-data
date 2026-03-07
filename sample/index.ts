import { run as runCrops } from './crops';
import { run as runMaps } from './maps';
import { run as runMixedSeeds } from './mixed-seeds';
import { run as runSkills } from './skills';
import { run as runTrees } from './trees';

const results = [runCrops(), runTrees(), runMixedSeeds(), runMaps(), runSkills()];

const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);

console.log('\n=== SUMMARY ===');
console.log(`${totalPassed} images OK, ${totalFailed} missing`);

if (totalFailed > 0) process.exit(1);
