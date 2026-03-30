import type { Season } from '@/types';

/** Top-level parsed save file containing all extracted game data. */
export interface SaveData {
  apiVersion: number;
  player: SavePlayer;
  farm: SaveFarm;
  date: SaveDate;
  inventory: SaveItem[];
  fishCaught: SaveFishEntry[];
  itemsShipped: SaveShippedEntry[];
  museum: SaveMuseum;
  friendships: SaveFriendship[];
  achievements: number[];
  activeQuests: SaveQuest[];
  stardrops: SaveStardropEntry[];
  stats: SaveStats;
  animals: SaveAnimal[];
  fishPonds: SaveFishPond[];
  buildings: SaveBuilding[];
  cookingRecipes: SaveRecipeEntry[];
  craftingRecipes: SaveRecipeEntry[];
  bundles: SaveBundleData;
  monstersKilled: SaveMonsterKillEntry[];
  mail: string[];
  specialOrders: SaveSpecialOrders;
  professions: SaveProfession[];
  booksRead: string[];
  eventsSeen: string[];
  secretNotes: SaveSecretNotes;
  walnuts: SaveWalnuts;
  islandUpgrades: SaveIslandUpgrades;
  children: SaveChild[];
  pets: SavePet[];
  horse: SaveHorse | null;
  powers: SavePowers;
  raccoons: SaveRaccoons;
  perfection: SavePerfection;
  mineProgress: SaveMineProgress;
  communityCenter: SaveCommunityCenter;
  joja: SaveJoja;
}

/** Core player profile including name, money, skills, and mastery progress. */
export interface SavePlayer {
  name: string;
  farmName: string;
  favoriteThing: string;
  gender: string;
  money: number;
  totalMoneyEarned: number;
  spouse: string | null;
  houseUpgradeLevel: number;
  luckLevel: number;
  maxItems: number;
  maxHealth: number;
  maxStamina: number;
  skills: SaveSkills;
  mastery: SaveMastery;
  toolLevels: SaveToolLevels;
  willyBackRoomInvitation: boolean;
  lostBooksFound: number;
  helpWantedQuests: number;
  gameVersion: string;
  millisecondsPlayed: number;
}

/** A tool currently being upgraded at the blacksmith. */
export interface SaveUpgradingTool {
  tool: 'wateringCan' | 'pan' | 'pickaxe' | 'axe' | 'hoe';
  name: string;
}

/** Level and active enchantment for a single tool. Enchantment is null when none is applied. */
export interface SaveToolLevel {
  level: number;
  enchantment: string | null;
}

/** Upgrade levels and enchantments for the player's tools (level 0 = base, 1 = copper, 2 = steel, 3 = gold, 4 = iridium). */
export interface SaveToolLevels {
  wateringCan: SaveToolLevel;
  pan: SaveToolLevel;
  pickaxe: SaveToolLevel;
  axe: SaveToolLevel;
  hoe: SaveToolLevel;
  trashCan: SaveToolLevel;
  fishingRod: SaveToolLevel;
  /** The tool currently at the blacksmith being upgraded, or null if none. */
  currentlyUpgrading: SaveUpgradingTool | null;
}

/** Mastery system progress including XP, levels spent, and unlocked perks. */
export interface SaveMastery {
  xp: number;
  levelsSpent: number;
  perks: SaveMasteryPerk[];
}

/** A single mastery perk and whether it has been unlocked. */
export interface SaveMasteryPerk {
  id: string;
  name: string;
  unlocked: boolean;
}

/** Current in-game date with year, season, day, and total days played. */
export interface SaveDate {
  year: number;
  season: Season;
  day: number;
  totalDaysPlayed: number;
}

/** Player skill levels across all five skill categories. */
export interface SaveSkills {
  farming: SaveSkillLevel;
  fishing: SaveSkillLevel;
  foraging: SaveSkillLevel;
  mining: SaveSkillLevel;
  combat: SaveSkillLevel;
}

/** A single skill's current level and accumulated XP. */
export interface SaveSkillLevel {
  level: number;
  xp: number;
}

/** Farm type and name. */
export interface SaveFarm {
  type: number;
  name: string;
}

/** An item in the player's inventory with stack size and quality. */
export interface SaveItem {
  id: string;
  name: string;
  type: string;
  stack: number;
  quality: number;
}

/** A caught fish entry with times caught and largest size recorded. */
export interface SaveFishEntry {
  id: string;
  timesCaught: number;
  largestSize: number;
}

/** A shipped item entry with total count shipped. */
export interface SaveShippedEntry {
  id: string;
  count: number;
}

/** Museum donation progress including donated items, artifacts found, and minerals found. */
export interface SaveMuseum {
  donations: string[];
  artifactsFound: SaveCollectionEntry[];
  mineralsFound: SaveCollectionEntry[];
}

/** A collected item entry with ID and count found. */
export interface SaveCollectionEntry {
  id: string;
  count: number;
}

/** Friendship data for a single NPC including hearts, points, and relationship status. */
export interface SaveFriendship {
  name: string;
  points: number;
  hearts: number;
  status: string;
  giftsThisWeek: number;
}

/** A farm animal with friendship, happiness, and housing details. */
export interface SaveAnimal {
  id: string;
  name: string;
  type: string;
  buildingId: string;
  buildingType: string;
  friendship: number;
  happiness: number;
  age: number;
  hasAnimalCracker: boolean;
}

/** A fish pond building with the fish species and population. */
export interface SaveFishPond {
  buildingId: string;
  fishType: number;
  currentOccupants: number;
  maxOccupants: number;
}

/** A farm building with its type, position, and current animal count. */
export interface SaveBuilding {
  id: string;
  type: string;
  animalCount: number;
}

/** An active or completed quest with its title, description, and completion status. */
export interface SaveQuest {
  id: string;
  title: string;
  description: string;
  type: number;
  completed: boolean;
}

/** A stardrop source and whether it has been collected. */
export interface SaveStardropEntry {
  id: string;
  name: string;
  collected: boolean;
}

/** A known recipe and the number of times it has been made. */
export interface SaveRecipeEntry {
  name: string;
  timesMade: number;
}

/** Community Center bundle data including rooms with nested bundles and Joja route status. */
export interface SaveBundleData {
  rooms: SaveBundleRoom[];
  isJojaRoute: boolean;
  isCCComplete: boolean;
}

/** A Community Center room with its bundles and completion status. */
export interface SaveBundleRoom {
  name: string;
  areaIndex: number;
  complete: boolean;
  bundles: SaveBundleStatus[];
}

/** A single bundle with its required items, completion progress, and reward. */
export interface SaveBundleStatus {
  id: string;
  bundleIndex: number;
  name: string;
  items: SaveBundleItem[];
  itemsRequired: number;
  itemsCompleted: number;
  complete: boolean;
  reward: SaveBundleReward | null;
}

/** A required bundle item with its quantity, quality, and whether it has been donated. */
export interface SaveBundleItem {
  itemId: string;
  name: string;
  quantity: number;
  quality: number;
  qualityName: string;
  completed: boolean;
}

/** The reward granted for completing a bundle. */
export interface SaveBundleReward {
  type: string;
  itemId: string;
  name: string;
  quantity: number;
}

/** A monster type and the total number killed. */
export interface SaveMonsterKillEntry {
  name: string;
  count: number;
}

/** A chosen profession with its internal ID and display name. */
export interface SaveProfession {
  id: number;
  name: string;
}

/** Completed special orders split by town board and Qi's Walnut Room. */
export interface SaveSpecialOrders {
  completed: string[];
  qiCompleted: string[];
}

/** Secret notes and journal scraps found, plus magnifying glass ownership. */
export interface SaveSecretNotes {
  notesFound: number[];
  journalScrapsFound: number[];
  hasMagnifyingGlass: boolean;
  hasSeenKrobus: boolean;
}

/** Golden walnut collection progress with total found and tracker entries. */
export interface SaveWalnuts {
  found: number;
  collected: string[];
}

/** A single Ginger Island parrot upgrade with unlock status. */
export interface SaveIslandUpgrade {
  id: string;
  unlocked: boolean;
}

/** Ginger Island upgrade and unlock status for each parrot-purchasable feature. */
export type SaveIslandUpgrades = SaveIslandUpgrade[];

/** A player's child with name, age stage, and gender. */
export interface SaveChild {
  name: string;
  age: number;
  gender: string;
}

/** A pet owned by the player. `starter` is true for the pet chosen at game start. */
export interface SavePet {
  name: string;
  type: string;
  breed: number;
  friendship: number;
  starter: boolean;
}

/** The player's horse with name and unique ID. */
export interface SaveHorse {
  name: string;
  type: 'horse';
  id: string;
}

/** Powers and special items collection with acquisition status. */
export interface SavePowers {
  specialItems: SavePowerEntry[];
}

/** A single power or special item and whether it has been acquired. */
export interface SavePowerEntry {
  id: string;
  name: string;
  acquired: boolean;
}

/** Raccoon quest progress including times fed and unlock milestones. */
export interface SaveRaccoons {
  timesFed: number;
  daysPlayedWhenLastFinished: number;
  treeFallen: boolean;
  movedIn: boolean;
}

/** Perfection tracker status including farm perfection, waivers, and obelisks owned. */
export interface SavePerfection {
  farmPerfect: boolean;
  waivers: number;
  hasGoldClock: boolean;
  obelisks: string[];
}

/** Community Center completion status including individual room progress. */
export interface SaveCommunityCenterRooms {
  boilerRoom: boolean;
  craftsRoom: boolean;
  pantry: boolean;
  fishTank: boolean;
  vault: boolean;
  bulletin: boolean;
}

/** Community Center unlock, completion, and Joja route status. */
export interface SaveCommunityCenter {
  unlocked: boolean;
  bundlesActive: boolean;
  completed: boolean;
  ceremonyAttended: boolean;
  jojaAbandoned: boolean;
  rooms: SaveCommunityCenterRooms;
}

/** A single Joja development project with purchase status. */
export interface SaveJojaDevelopment {
  id: string;
  purchased: boolean;
}

/** Joja membership, development project completion, and route status. */
export interface SaveJoja {
  isMember: boolean;
  completed: boolean;
  developments: SaveJojaDevelopment[];
}

/** Mine and Skull Cavern progress including deepest levels reached and key ownership. */
export interface SaveMineProgress {
  deepestMineLevel: number;
  deepestSkullCavernLevel: number;
  hasRustyKey: boolean;
  hasSkullKey: boolean;
}

/** Lifetime gameplay statistics with named fields and the full raw stats dictionary. */
export interface SaveStats {
  daysPlayed: number;
  stepsTaken: number;
  fishCaught: number;
  itemsShipped: number;
  itemsForaged: number;
  itemsCrafted: number;
  itemsCooked: number;
  monstersKilled: number;
  questsCompleted: number;
  geodesCracked: number;
  giftsGiven: number;
  timesFished: number;
  timesUnconscious: number;
  seedsSown: number;
  treesChopped: number;
  rocksCrushed: number;
  raw: Record<string, number>;
}
