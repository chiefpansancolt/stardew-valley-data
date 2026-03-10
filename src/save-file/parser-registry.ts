import { parseAchievements } from './parsers/v1/achievements';
import { parseAnimals } from './parsers/v1/animals';
import { parseBuildings } from './parsers/v1/buildings';
import { parseBundles } from './parsers/v1/bundles';
import { parseDate } from './parsers/v1/date';
import { parseChildren, parsePet } from './parsers/v1/family';
import { parseFishCaught } from './parsers/v1/fish';
import { parseFriendships } from './parsers/v1/friendships';
import { parseInventory } from './parsers/v1/inventory';
import { parseIslandUpgrades } from './parsers/v1/island-upgrades';
import { parseBooksRead, parseSpecialOrders } from './parsers/v1/mail';
import { parseMineProgress } from './parsers/v1/mine-progress';
import { parseMonstersKilled } from './parsers/v1/monsters';
import { parseMuseum } from './parsers/v1/museum';
import { parsePerfection } from './parsers/v1/perfection';
import { parsePlayer } from './parsers/v1/player';
import { parsePowers } from './parsers/v1/powers';
import { parseProfessions } from './parsers/v1/professions';
import { parseQuests } from './parsers/v1/quests';
import { parseRaccoons } from './parsers/v1/raccoons';
import { parseCookingRecipes, parseCraftingRecipes } from './parsers/v1/recipes';
import { parseSecretNotes } from './parsers/v1/secret-notes';
import { parseShipped } from './parsers/v1/shipping';
import { parseStardrops } from './parsers/v1/stardrops';
import { parseStats } from './parsers/v1/stats';
import { parseWalnuts } from './parsers/v1/walnuts';
import type { SaveData } from './types';

/** Shared context built once from the parsed XML, passed to all versioned parsers. */
export interface ParseContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  root: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  player: any;
  mailArray: string[];
  mailSet: Set<string>;
  eventsSeen: string[];
  eventsSet: Set<string>;
}

/** A versioned parser set: takes a ParseContext and returns all SaveData fields except apiVersion. */
type ParserSetFn = (ctx: ParseContext) => Omit<SaveData, 'apiVersion'>;

/**
 * v1 parser set — the initial parser covering all game versions from 1.0.0 onward.
 * Each field maps to one of the individual parsers in `parsers/v1/`.
 */
const v1: ParserSetFn = (ctx) => ({
  player: parsePlayer(ctx.player, ctx.root),
  farm: { type: ctx.root.whichFarm, name: ctx.player.farmName },
  date: parseDate(ctx.player, ctx.root),
  inventory: parseInventory(ctx.player.items),
  fishCaught: parseFishCaught(ctx.player.fishCaught),
  itemsShipped: parseShipped(ctx.player.basicShipped),
  museum: parseMuseum(ctx.root, ctx.player),
  friendships: parseFriendships(ctx.player.friendshipData),
  achievements: parseAchievements(ctx.player.achievements),
  activeQuests: parseQuests(ctx.player.questLog),
  stardrops: parseStardrops(ctx.player.mailReceived),
  stats: parseStats(ctx.player),
  animals: parseAnimals(ctx.root),
  buildings: parseBuildings(ctx.root),
  cookingRecipes: parseCookingRecipes(ctx.player.cookingRecipes),
  craftingRecipes: parseCraftingRecipes(ctx.player.craftingRecipes),
  bundles: parseBundles(ctx.root, ctx.mailSet),
  monstersKilled: parseMonstersKilled(ctx.player),
  mail: ctx.mailArray,
  specialOrders: parseSpecialOrders(ctx.root),
  professions: parseProfessions(ctx.player.professions),
  booksRead: parseBooksRead(ctx.player),
  eventsSeen: ctx.eventsSeen,
  secretNotes: parseSecretNotes(ctx.player, ctx.mailSet),
  walnuts: parseWalnuts(ctx.root),
  islandUpgrades: parseIslandUpgrades(ctx.mailSet),
  children: parseChildren(ctx.root),
  pet: parsePet(ctx.root),
  powers: parsePowers(ctx.mailSet, ctx.eventsSet),
  raccoons: parseRaccoons(ctx.root, ctx.mailSet),
  perfection: parsePerfection(ctx.root),
  mineProgress: parseMineProgress(ctx.player, ctx.root, ctx.mailSet),
});

/*
 * To add a new API version:
 *
 * 1. Create new parser files (e.g. `parsers/v2/bundles.ts`) for changed parsers only.
 * 2. Define the new version spreading from the previous one:
 *
 *    import { parseBundlesV2 } from './parsers/v2/bundles';
 *
 *    const v2: ParserSetFn = (ctx) => ({
 *      ...v1(ctx),
 *      bundles: parseBundlesV2(ctx.root, ctx.mailSet),
 *    });
 *
 * 3. Add it to PARSER_SETS below.
 * 4. Update VERSION_RANGES in versions.ts.
 */

/** Registry of parser sets keyed by API version number. */
const PARSER_SETS: Record<number, ParserSetFn> = {
  1: v1,
};

/** Get the parser set function for a given API version. Falls back to the latest registered version. */
export function getParserSet(apiVersion: number): ParserSetFn {
  return PARSER_SETS[apiVersion] ?? PARSER_SETS[Math.max(...Object.keys(PARSER_SETS).map(Number))];
}
