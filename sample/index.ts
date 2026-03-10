import { run as runAchievements } from './achievements';
import { run as runAnimals } from './animals';
import { run as runArtifacts } from './artifacts';
import { run as runArtisanGoods } from './artisan-goods';
import { run as runBait } from './bait';
import { run as runBlacksmith } from './blacksmith-shop';
import { run as runBookseller } from './bookseller-shop';
import { run as runBuildings } from './buildings';
import { run as runBundles } from './bundles';
import { run as runCalculator } from './calculator';
import { captureRun, ensureOutputDir, writeSummary } from './capture';
import { run as runCarpenter } from './carpenter-shop';
import { run as runCasino } from './casino-shop';
import { run as runCollections } from './collections';
import { run as runConcessions } from './concessions';
import { run as runCooking } from './cooking';
import { run as runCrafting } from './crafting';
import { run as runCrops } from './crops';
import { run as runDesertTrader } from './desert-trader-shop';
import { run as runDwarfShop } from './dwarf-shop';
import { run as runEvents } from './events';
import { run as runFarmhouse } from './farmhouse';
import { run as runFieldOffice } from './field-office';
import { run as runFish } from './fish';
import { run as runFootwear } from './footwear';
import { run as runForageables } from './forageables';
import { run as runGoldenWalnuts } from './golden-walnuts';
import { run as runGrandpa } from './grandpa';
import { run as runGuild } from './guild-shop';
import { run as runHats } from './hats';
import { run as runIslandTrader } from './island-trader-shop';
import { run as runJoja } from './joja-shop';
import { run as runKrobus } from './krobus-shop';
import { run as runLocations } from './locations';
import { run as runLostBooks } from './lost-books';
import { run as runMaps } from './maps';
import { run as runMarnie } from './marnie-shop';
import { run as runMedicalSupplies } from './medical-supplies-shop';
import { run as runMinerals } from './minerals';
import { run as runMixedSeeds } from './mixed-seeds';
import { run as runMonsterSlayerGoals } from './monster-slayer-goals';
import { run as runMonsters } from './monsters';
import { run as runOasis } from './oasis-shop';
import { run as runPerfection } from './perfection';
import { run as runPierre } from './pierre-shop';
import { run as runProfessions } from './professions';
import { run as runQiShop } from './qi-shop';
import { run as runQuests } from './quests';
import { run as runRings } from './rings';
import { run as runSaloon } from './saloon-shop';
import { run as runSaveFile } from './save-file';
import { run as runSearch } from './search';
import { run as runSeasons } from './seasons';
import { run as runSecretNotes } from './secret-notes';
import { run as runSkills } from './skills';
import { run as runSpecialItems } from './special-items';
import { run as runSpecialOrders } from './special-orders';
import { run as runStarDrops } from './stardrops';
import { run as runTackle } from './tackle';
import { run as runTools } from './tools';
import { run as runTrees } from './trees';
import { run as runTrinkets } from './trinkets';
import { run as runUniversalGifts } from './universal-gifts';
import { run as runVillagers } from './villagers';
import { run as runVolcanoShop } from './volcano-shop';
import { run as runWeaponStats } from './weapon-stats';
import { run as runWeapons } from './weapons';
import { run as runWeather } from './weather';
import { run as runWilly } from './willy-shop';
import { run as runWizard } from './wizard-shop';

ensureOutputDir();

const results = [
  { name: 'achievements', ...captureRun('achievements', runAchievements) },
  { name: 'animals', ...captureRun('animals', runAnimals) },
  { name: 'bundles', ...captureRun('bundles', runBundles) },
  { name: 'quests', ...captureRun('quests', runQuests) },
  { name: 'artisan-goods', ...captureRun('artisan-goods', runArtisanGoods) },
  { name: 'calculator', ...captureRun('calculator', runCalculator) },
  { name: 'crops', ...captureRun('crops', runCrops) },
  { name: 'trees', ...captureRun('trees', runTrees) },
  { name: 'mixed-seeds', ...captureRun('mixed-seeds', runMixedSeeds) },
  { name: 'maps', ...captureRun('maps', runMaps) },
  { name: 'search', ...captureRun('search', runSearch) },
  { name: 'skills', ...captureRun('skills', runSkills) },
  { name: 'weather', ...captureRun('weather', runWeather) },
  { name: 'seasons', ...captureRun('seasons', runSeasons) },
  { name: 'monsters', ...captureRun('monsters', runMonsters) },
  {
    name: 'monster-slayer-goals',
    ...captureRun('monster-slayer-goals', runMonsterSlayerGoals),
  },
  { name: 'rings', ...captureRun('rings', runRings) },
  { name: 'tools', ...captureRun('tools', runTools) },
  { name: 'weapons', ...captureRun('weapons', runWeapons) },
  { name: 'weapon-stats', ...captureRun('weapon-stats', runWeaponStats) },
  { name: 'hats', ...captureRun('hats', runHats) },
  { name: 'footwear', ...captureRun('footwear', runFootwear) },
  { name: 'fish', ...captureRun('fish', runFish) },
  { name: 'bait', ...captureRun('bait', runBait) },
  { name: 'tackle', ...captureRun('tackle', runTackle) },
  { name: 'cooking', ...captureRun('cooking', runCooking) },
  { name: 'forageables', ...captureRun('forageables', runForageables) },
  {
    name: 'universal-gifts',
    ...captureRun('universal-gifts', runUniversalGifts),
  },
  { name: 'villagers', ...captureRun('villagers', runVillagers) },
  { name: 'artifacts', ...captureRun('artifacts', runArtifacts) },
  { name: 'collections', ...captureRun('collections', runCollections) },
  { name: 'crafting', ...captureRun('crafting', runCrafting) },
  { name: 'minerals', ...captureRun('minerals', runMinerals) },
  { name: 'perfection', ...captureRun('perfection', runPerfection) },
  { name: 'qi-shop', ...captureRun('qi-shop', runQiShop) },
  {
    name: 'medical-supplies-shop',
    ...captureRun('medical-supplies-shop', runMedicalSupplies),
  },
  {
    name: 'blacksmith-shop',
    ...captureRun('blacksmith-shop', runBlacksmith),
  },
  { name: 'joja-shop', ...captureRun('joja-shop', runJoja) },
  { name: 'pierre-shop', ...captureRun('pierre-shop', runPierre) },
  { name: 'saloon-shop', ...captureRun('saloon-shop', runSaloon) },
  { name: 'krobus-shop', ...captureRun('krobus-shop', runKrobus) },
  { name: 'marnie-shop', ...captureRun('marnie-shop', runMarnie) },
  { name: 'wizard-shop', ...captureRun('wizard-shop', runWizard) },
  { name: 'willy-shop', ...captureRun('willy-shop', runWilly) },
  { name: 'guild-shop', ...captureRun('guild-shop', runGuild) },
  {
    name: 'carpenter-shop',
    ...captureRun('carpenter-shop', runCarpenter),
  },
  { name: 'casino-shop', ...captureRun('casino-shop', runCasino) },
  {
    name: 'desert-trader-shop',
    ...captureRun('desert-trader-shop', runDesertTrader),
  },
  { name: 'oasis-shop', ...captureRun('oasis-shop', runOasis) },
  {
    name: 'volcano-shop',
    ...captureRun('volcano-shop', runVolcanoShop),
  },
  {
    name: 'island-trader-shop',
    ...captureRun('island-trader-shop', runIslandTrader),
  },
  {
    name: 'field-office',
    ...captureRun('field-office', runFieldOffice),
  },
  { name: 'grandpa', ...captureRun('grandpa', runGrandpa) },
  { name: 'dwarf-shop', ...captureRun('dwarf-shop', runDwarfShop) },
  { name: 'locations', ...captureRun('locations', runLocations) },
  {
    name: 'special-items',
    ...captureRun('special-items', runSpecialItems),
  },
  {
    name: 'bookseller-shop',
    ...captureRun('bookseller-shop', runBookseller),
  },
  { name: 'concessions', ...captureRun('concessions', runConcessions) },
  { name: 'farmhouse', ...captureRun('farmhouse', runFarmhouse) },
  {
    name: 'secret-notes',
    ...captureRun('secret-notes', runSecretNotes),
  },
  { name: 'lost-books', ...captureRun('lost-books', runLostBooks) },
  { name: 'trinkets', ...captureRun('trinkets', runTrinkets) },
  { name: 'stardrops', ...captureRun('stardrops', runStarDrops) },
  {
    name: 'golden-walnuts',
    ...captureRun('golden-walnuts', runGoldenWalnuts),
  },
  { name: 'professions', ...captureRun('professions', runProfessions) },
  {
    name: 'special-orders',
    ...captureRun('special-orders', runSpecialOrders),
  },
  { name: 'events', ...captureRun('events', runEvents) },
  { name: 'buildings', ...captureRun('buildings', runBuildings) },
  { name: 'save-file', ...captureRun('save-file', runSaveFile) },
];

writeSummary(results);

const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);

console.log('\n=== SUMMARY ===');
console.log(`${totalPassed} images OK, ${totalFailed} missing`);
console.log(`\nDetailed output written to sample/output/`);

if (totalFailed > 0) process.exit(1);
