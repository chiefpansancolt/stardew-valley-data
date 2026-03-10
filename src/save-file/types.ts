import type { Season } from '@/types';

/** Top-level parsed save file result. */
export interface SaveData {
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
  pet: SavePet | null;
  powers: SavePowers;
  raccoons: SaveRaccoons;
  perfection: SavePerfection;
  mineProgress: SaveMineProgress;
}

export interface SavePlayer {
  name: string;
  farmName: string;
  favoriteThing: string;
  gender: string;
  money: number;
  totalMoneyEarned: number;
  spouse: string | null;
  houseUpgradeLevel: number;
  maxHealth: number;
  maxStamina: number;
  skills: SaveSkills;
  mastery: SaveMastery;
  gameVersion: string;
}

export interface SaveMastery {
  xp: number;
  levelsSpent: number;
  perks: SaveMasteryPerk[];
}

export interface SaveMasteryPerk {
  id: string;
  name: string;
  unlocked: boolean;
}

export interface SaveDate {
  year: number;
  season: Season;
  day: number;
  totalDaysPlayed: number;
}

export interface SaveSkills {
  farming: SaveSkillLevel;
  fishing: SaveSkillLevel;
  foraging: SaveSkillLevel;
  mining: SaveSkillLevel;
  combat: SaveSkillLevel;
}

export interface SaveSkillLevel {
  level: number;
  xp: number;
}

export interface SaveFarm {
  type: number;
  name: string;
}

export interface SaveItem {
  id: string;
  name: string;
  type: string;
  stack: number;
  quality: number;
}

export interface SaveFishEntry {
  id: string;
  timesCaught: number;
  largestSize: number;
}

export interface SaveShippedEntry {
  id: string;
  count: number;
}

export interface SaveMuseum {
  donations: string[];
  artifactsFound: SaveCollectionEntry[];
  mineralsFound: SaveCollectionEntry[];
}

export interface SaveCollectionEntry {
  id: string;
  count: number;
}

export interface SaveFriendship {
  name: string;
  points: number;
  hearts: number;
  status: string;
  giftsThisWeek: number;
}

export interface SaveAnimal {
  id: string;
  name: string;
  type: string;
  buildingType: string;
  friendship: number;
  happiness: number;
  age: number;
  hasAnimalCracker: boolean;
}

export interface SaveBuilding {
  type: string;
  tileX: number;
  tileY: number;
  animalCount: number;
}

export interface SaveQuest {
  id: string;
  title: string;
  description: string;
  type: number;
  completed: boolean;
}

export interface SaveStardropEntry {
  id: string;
  collected: boolean;
}

export interface SaveRecipeEntry {
  name: string;
  timesMade: number;
}

export interface SaveBundleData {
  bundles: SaveBundleStatus[];
  rooms: SaveBundleRoom[];
  isJojaRoute: boolean;
  isCCComplete: boolean;
}

export interface SaveBundleRoom {
  name: string;
  areaIndex: number;
  complete: boolean;
  bundles: SaveBundleStatus[];
}

export interface SaveBundleStatus {
  bundleIndex: number;
  name: string;
  room: string;
  items: SaveBundleItem[];
  itemsRequired: number;
  itemsCompleted: number;
  complete: boolean;
  reward: SaveBundleReward | null;
}

export interface SaveBundleItem {
  itemId: string;
  name: string;
  quantity: number;
  quality: number;
  completed: boolean;
}

export interface SaveBundleReward {
  type: string;
  itemId: string;
  name: string;
  quantity: number;
}

export interface SaveMonsterKillEntry {
  name: string;
  count: number;
}

export interface SaveProfession {
  id: number;
  name: string;
}

export interface SaveSpecialOrders {
  completed: string[];
  townCompleted: string[];
  qiCompleted: string[];
}

export interface SaveSecretNotes {
  notesFound: number[];
  journalScrapsFound: number[];
  hasMagnifyingGlass: boolean;
}

export interface SaveWalnuts {
  found: number;
  collected: string[];
}

export interface SaveIslandUpgrades {
  firstParrot: boolean;
  turtle: boolean;
  house: boolean;
  resort: boolean;
  trader: boolean;
  bridge: boolean;
  parrotPlatforms: boolean;
  mailbox: boolean;
  obelisk: boolean;
  volcanoBridge: boolean;
  volcanoShortcut: boolean;
}

export interface SaveChild {
  name: string;
  age: number;
  gender: string;
}

export interface SavePet {
  name: string;
  type: string;
  breed: number;
  friendship: number;
}

export interface SavePowers {
  specialItems: SavePowerEntry[];
}

export interface SavePowerEntry {
  id: string;
  name: string;
  acquired: boolean;
}

export interface SaveRaccoons {
  timesFed: number;
  daysPlayedWhenLastFinished: number;
  treeFallen: boolean;
  movedIn: boolean;
}

export interface SavePerfection {
  farmPerfect: boolean;
  waivers: number;
  hasGoldClock: boolean;
  obelisks: string[];
}

export interface SaveMineProgress {
  deepestMineLevel: number;
  deepestSkullCavernLevel: number;
  hasRustyKey: boolean;
  hasSkullKey: boolean;
}

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
