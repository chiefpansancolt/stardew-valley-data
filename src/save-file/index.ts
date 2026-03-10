import { XMLParser } from 'fast-xml-parser';
import { parseAchievements } from './parsers/achievements';
import { parseAnimals } from './parsers/animals';
import { parseBuildings } from './parsers/buildings';
import { parseBundles } from './parsers/bundles';
import { parseDate } from './parsers/date';
import { parseEventsSeen } from './parsers/events';
import { parseChildren, parsePet } from './parsers/family';
import { parseFishCaught } from './parsers/fish';
import { parseFriendships } from './parsers/friendships';
import { parseInventory } from './parsers/inventory';
import { parseIslandUpgrades } from './parsers/island-upgrades';
import { parseBooksRead, parseMail, parseSpecialOrders } from './parsers/mail';
import { parseMineProgress } from './parsers/mine-progress';
import { parseMonstersKilled } from './parsers/monsters';
import { parseMuseum } from './parsers/museum';
import { parsePerfection } from './parsers/perfection';
import { parsePlayer } from './parsers/player';
import { parsePowers } from './parsers/powers';
import { parseProfessions } from './parsers/professions';
import { parseQuests } from './parsers/quests';
import { parseRaccoons } from './parsers/raccoons';
import { parseCookingRecipes, parseCraftingRecipes } from './parsers/recipes';
import { parseSecretNotes } from './parsers/secret-notes';
import { parseShipped } from './parsers/shipping';
import { parseStardrops } from './parsers/stardrops';
import { parseStats } from './parsers/stats';
import { parseWalnuts } from './parsers/walnuts';
import type { SaveData } from './types';

export type {
  SaveAnimal,
  SaveBuilding,
  SaveBundleData,
  SaveBundleItem,
  SaveBundleReward,
  SaveBundleRoom,
  SaveBundleStatus,
  SaveChild,
  SaveCollectionEntry,
  SaveData,
  SaveDate,
  SaveFarm,
  SaveFishEntry,
  SaveFriendship,
  SaveIslandUpgrades,
  SaveItem,
  SaveMastery,
  SaveMasteryPerk,
  SaveMineProgress,
  SaveMonsterKillEntry,
  SaveMuseum,
  SavePerfection,
  SavePet,
  SavePlayer,
  SavePowerEntry,
  SavePowers,
  SaveProfession,
  SaveQuest,
  SaveRaccoons,
  SaveRecipeEntry,
  SaveSecretNotes,
  SaveShippedEntry,
  SaveSkillLevel,
  SaveSkills,
  SaveSpecialOrders,
  SaveStardropEntry,
  SaveStats,
  SaveWalnuts,
} from './types';

const parserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  isArray: (name: string) => {
    return [
      'item',
      'Item',
      'int',
      'Quest',
      'Building',
      'FarmAnimal',
      'GameLocation',
      'SpecialOrder',
      'NPC',
    ].includes(name);
  },
};

/**
 * Parse a Stardew Valley XML save file and return structured game data.
 * IDs in the result are normalized to match the IDs used in this package's data files.
 */
export function parseSaveFile(xml: string): SaveData {
  const parser = new XMLParser(parserOptions);
  const doc = parser.parse(xml);
  const root = doc.SaveGame;
  const player = root.player;

  // Pre-compute mail and events as Sets for efficient lookups across parsers
  const mailArray = parseMail(player.mailReceived);
  const mailSet = new Set(mailArray);
  const eventsSeen = parseEventsSeen(player);
  const eventsSet = new Set(eventsSeen);

  return {
    player: parsePlayer(player, root),
    farm: { type: root.whichFarm, name: player.farmName },
    date: parseDate(player, root),
    inventory: parseInventory(player.items),
    fishCaught: parseFishCaught(player.fishCaught),
    itemsShipped: parseShipped(player.basicShipped),
    museum: parseMuseum(root, player),
    friendships: parseFriendships(player.friendshipData),
    achievements: parseAchievements(player.achievements),
    activeQuests: parseQuests(player.questLog),
    stardrops: parseStardrops(player.mailReceived),
    stats: parseStats(player),
    animals: parseAnimals(root),
    buildings: parseBuildings(root),
    cookingRecipes: parseCookingRecipes(player.cookingRecipes),
    craftingRecipes: parseCraftingRecipes(player.craftingRecipes),
    bundles: parseBundles(root, mailSet),
    monstersKilled: parseMonstersKilled(player),
    mail: mailArray,
    specialOrders: parseSpecialOrders(root),
    professions: parseProfessions(player.professions),
    booksRead: parseBooksRead(player),
    eventsSeen,
    secretNotes: parseSecretNotes(player, mailSet),
    walnuts: parseWalnuts(root),
    islandUpgrades: parseIslandUpgrades(mailSet),
    children: parseChildren(root),
    pet: parsePet(root),
    powers: parsePowers(mailSet, eventsSet),
    raccoons: parseRaccoons(root, mailSet),
    perfection: parsePerfection(root),
    mineProgress: parseMineProgress(player, root, mailSet),
  };
}
