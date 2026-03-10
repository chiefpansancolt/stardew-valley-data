import { XMLParser } from 'fast-xml-parser';
import type { ParseContext } from './parser-registry';
import { getParserSet } from './parser-registry';
import { parseEventsSeen } from './parsers/v1/events';
import { parseMail } from './parsers/v1/mail';
import type { SaveData } from './types';
import { resolveApiVersion } from './versions';

export { resolveApiVersion, LATEST_API_VERSION } from './versions';
export type { VersionRange } from './versions';

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
 * The API version is resolved from the game version in the save file,
 * and the appropriate versioned parser set is used.
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

  const gameVersion = String(root.gameVersion ?? '');
  const apiVersion = resolveApiVersion(gameVersion);

  const ctx: ParseContext = { root, player, mailArray, mailSet, eventsSeen, eventsSet };
  const parserSet = getParserSet(apiVersion);

  return {
    apiVersion,
    ...parserSet(ctx),
  };
}
