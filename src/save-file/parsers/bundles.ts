import type {
  SaveBundleData,
  SaveBundleItem,
  SaveBundleReward,
  SaveBundleRoom,
  SaveBundleStatus,
} from '../types';
import { ensureArray, extractDictItems, num } from './util';

const JOJA_MAIL_FLAGS = [
  'jojaBoilerRoom',
  'jojaCraftsRoom',
  'jojaFishTank',
  'jojaPantry',
  'jojaVault',
];

/** Area index → room name, matching the game's internal area IDs. */
const AREA_NAMES: Record<number, string> = {
  0: 'Pantry',
  1: 'Crafts Room',
  2: 'Fish Tank',
  3: 'Boiler Room',
  4: 'Vault',
  5: 'Bulletin Board',
  6: 'Abandoned Joja Mart',
};

/** Room key string (from bundleData keys) → area index. */
const ROOM_KEY_TO_AREA: Record<string, number> = {
  Pantry: 0,
  'Crafts Room': 1,
  'Fish Tank': 2,
  'Boiler Room': 3,
  Vault: 4,
  'Bulletin Board': 5,
  'Abandoned Joja Mart': 6,
};

const QUALITY_NAMES: Record<number, string> = {
  0: 'Normal',
  1: 'Silver',
  2: 'Gold',
  4: 'Iridium',
};

/** Reward type prefix → human-readable type. */
const REWARD_TYPES: Record<string, string> = {
  O: 'Object',
  BO: 'Big Craftable',
  F: 'Furniture',
  H: 'Hat',
  C: 'Clothing',
  R: 'Ring',
};

/**
 * Build a name lookup from Objects.json and BigCraftables.json data embedded
 * in the game. Since we don't bundle those files, we build a hardcoded map
 * for the items that appear in bundle definitions.
 */
const ITEM_NAMES: Record<string, string> = {
  // Pantry - Spring Crops
  '24': 'Parsnip',
  '188': 'Green Bean',
  '190': 'Cauliflower',
  '192': 'Potato',
  // Pantry - Summer Crops
  '256': 'Tomato',
  '258': 'Blueberry',
  '260': 'Hot Pepper',
  '254': 'Melon',
  // Pantry - Fall Crops
  '270': 'Corn',
  '272': 'Eggplant',
  '276': 'Pumpkin',
  '280': 'Yam',
  // Pantry - Animal Bundle
  '186': 'Large Milk',
  '182': 'Large Egg (Brown)',
  '174': 'Large Egg',
  '438': 'Large Goat Milk',
  '440': 'Wool',
  '442': 'Duck Egg',
  // Pantry - Artisan Bundle
  '432': 'Truffle Oil',
  '428': 'Cloth',
  '426': 'Goat Cheese',
  '424': 'Cheese',
  '340': 'Honey',
  '344': 'Jelly',
  '613': 'Apple',
  '634': 'Apricot',
  '635': 'Orange',
  '636': 'Peach',
  '637': 'Pomegranate',
  '638': 'Cherry',
  // Crafts Room - Foraging
  '16': 'Wild Horseradish',
  '18': 'Daffodil',
  '20': 'Leek',
  '22': 'Dandelion',
  '396': 'Spice Berry',
  '398': 'Grape',
  '402': 'Sweet Pea',
  '404': 'Common Mushroom',
  '406': 'Wild Plum',
  '408': 'Hazelnut',
  '410': 'Blackberry',
  '412': 'Winter Root',
  '414': 'Crystal Fruit',
  '416': 'Snow Yam',
  '418': 'Crocus',
  // Crafts Room - Construction
  '388': 'Wood',
  '390': 'Stone',
  '709': 'Hardwood',
  // Crafts Room - Exotic Foraging
  '88': 'Coconut',
  '90': 'Cactus Fruit',
  '78': 'Cave Carrot',
  '420': 'Red Mushroom',
  '422': 'Purple Mushroom',
  '724': 'Maple Syrup',
  '725': 'Oak Resin',
  '726': 'Pine Tar',
  '257': 'Morel',
  // Fish Tank
  '145': 'Sunfish',
  '143': 'Catfish',
  '706': 'Shad',
  '699': 'Tiger Trout',
  '136': 'Largemouth Bass',
  '142': 'Carp',
  '700': 'Bullhead',
  '698': 'Sturgeon',
  '131': 'Sardine',
  '130': 'Tuna',
  '150': 'Red Snapper',
  '701': 'Tilapia',
  '140': 'Walleye',
  '132': 'Bream',
  '148': 'Eel',
  '128': 'Pufferfish',
  '156': 'Ghostfish',
  '164': 'Sandfish',
  '734': 'Woodskip',
  // Fish Tank - Crab Pot
  '715': 'Lobster',
  '716': 'Crayfish',
  '717': 'Crab',
  '718': 'Cockle',
  '719': 'Mussel',
  '720': 'Shrimp',
  '721': 'Snail',
  '722': 'Periwinkle',
  '723': 'Oyster',
  '372': 'Clam',
  // Boiler Room
  '334': 'Copper Bar',
  '335': 'Iron Bar',
  '336': 'Gold Bar',
  '80': 'Quartz',
  '86': 'Earth Crystal',
  '84': 'Frozen Tear',
  '82': 'Fire Quartz',
  '766': 'Slime',
  '767': 'Bat Wing',
  '768': 'Solar Essence',
  '769': 'Void Essence',
  // Bulletin Board
  '259': 'Fiddlehead Fern',
  '430': 'Truffle',
  '376': 'Poppy',
  '228': 'Maki Roll',
  '194': 'Fried Egg',
  '392': 'Nautilus Shell',
  '702': 'Chub',
  '536': 'Nautilus Fossil',
  '348': 'Wine',
  '446': "Rabbit's Foot",
  '397': 'Sea Urchin',
  '421': 'Sunflower',
  '444': 'Duck Feather',
  '62': 'Aquamarine',
  '266': 'Red Cabbage',
  '262': 'Wheat',
  '178': 'Hay',
  // Abandoned Joja Mart - The Missing Bundle
  '807': 'Dinosaur Mayonnaise',
  '74': 'Prismatic Shard',
  '454': 'Ancient Fruit',
  '795': 'Void Salmon',
  '445': 'Caviar',
  // Rewards
  '465': 'Speed-Gro',
  '621': 'Quality Sprinkler',
  '495': 'Spring Seeds',
  '496': 'Summer Seeds',
  '497': 'Fall Seeds',
  '498': 'Winter Seeds',
  '235': "Autumn's Bounty",
  '687': 'Dressed Spinner',
  '690': 'Warp Totem: Beach',
  '517': 'Glow Ring',
  '518': 'Warrior Ring',
  '242': "Dish O' The Sea",
  '710': 'Crab Pot',
  '749': 'Omni Geode',
  '220': 'Chocolate Cake',
  '369': 'Quality Fertilizer',
  '221': 'Pink Cake',
  DeluxeBait: 'Deluxe Bait',
};

/** BigCraftable name lookup for reward items. */
const BIG_CRAFTABLE_NAMES: Record<string, string> = {
  '9': 'Lightning Rod',
  '10': 'Bee House',
  '12': 'Keg',
  '13': 'Furnace',
  '15': 'Preserves Jar',
  '16': 'Cheese Press',
  '20': 'Recycling Machine',
  '21': 'Crystalarium',
  '25': 'Seed Maker',
  '104': 'Heater',
  '114': 'Charcoal Kiln',
};

function resolveItemName(itemId: string): string {
  return ITEM_NAMES[itemId] ?? `Item ${itemId}`;
}

function resolveRewardName(type: string, itemId: string): string {
  if (type === 'BO') return BIG_CRAFTABLE_NAMES[itemId] ?? `BigCraftable ${itemId}`;
  if (type === 'R') return ITEM_NAMES[itemId] ?? `Ring ${itemId}`;
  return ITEM_NAMES[itemId] ?? `Item ${itemId}`;
}

interface ParsedBundleDef {
  bundleIndex: number;
  room: string;
  areaIndex: number;
  name: string;
  items: Array<{ itemId: string; quantity: number; quality: number }>;
  itemsRequired: number;
  reward: SaveBundleReward | null;
}

/**
 * Parse a bundle definition string from the save file's bundleData.
 * Format: "name/reward/items/colorIndex/itemsRequired/textureOverride/displayName"
 */
function parseBundleDef(key: string, value: string): ParsedBundleDef {
  const [roomKey, indexStr] = key.split('/');
  const bundleIndex = parseInt(indexStr, 10);
  const areaIndex = ROOM_KEY_TO_AREA[roomKey] ?? -1;
  const room = AREA_NAMES[areaIndex] ?? roomKey;

  const parts = value.split('/');
  const internalName = parts[0];
  const displayName = parts[6] || internalName;

  // Parse reward: "type itemId quantity" e.g. "O 465 20", "BO 10 1", "R 517 1"
  let reward: SaveBundleReward | null = null;
  const rewardStr = parts[1]?.trim();
  if (rewardStr) {
    const rewardParts = rewardStr.split(' ');
    if (rewardParts.length >= 3) {
      const type = rewardParts[0];
      const itemId = rewardParts[1];
      const quantity = parseInt(rewardParts[2], 10);
      reward = {
        type: REWARD_TYPES[type] ?? type,
        itemId,
        name: resolveRewardName(type, itemId),
        quantity,
      };
    }
  }

  // Parse required items: space-separated triplets "itemId quantity quality"
  const itemsStr = parts[2]?.trim() ?? '';
  const itemTokens = itemsStr.split(' ');
  const items: Array<{ itemId: string; quantity: number; quality: number }> = [];
  for (let i = 0; i + 2 < itemTokens.length; i += 3) {
    const itemId = itemTokens[i];
    const quantity = parseInt(itemTokens[i + 1], 10);
    const quality = parseInt(itemTokens[i + 2], 10);
    // Vault bundles use -1 as itemId (gold payment)
    if (itemId === '-1') {
      items.push({ itemId: '-1', quantity, quality });
    } else {
      items.push({ itemId, quantity, quality });
    }
  }

  // Items required (field index 4) — how many of the listed items must be donated
  const itemsRequiredStr = parts[4]?.trim();
  const itemsRequired = itemsRequiredStr ? parseInt(itemsRequiredStr, 10) : items.length;

  return {
    bundleIndex,
    room,
    areaIndex,
    name: displayName,
    items,
    itemsRequired: itemsRequired || items.length,
    reward,
  };
}

/** Parse Community Center bundle definitions, completion status, and room summaries from the save file root and pre-computed mail flags. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseBundles(root: any, mail: Set<string>): SaveBundleData {
  // Step 1: Parse bundle definitions from bundleData (root-level)
  const bundleDefs = new Map<number, ParsedBundleDef>();
  const bundleDataItems = extractDictItems(root.bundleData);
  for (const item of bundleDataItems) {
    const key = item.key as Record<string, unknown>;
    const val = item.value as Record<string, unknown>;
    const keyStr = String(key?.string ?? '');
    const valStr = String(val?.string ?? '');
    if (keyStr && valStr) {
      const def = parseBundleDef(keyStr, valStr);
      bundleDefs.set(def.bundleIndex, def);
    }
  }

  // Step 2: Parse completion slots from CommunityCenter location
  const slotMap = new Map<number, boolean[]>();
  let areasComplete: boolean[] = [];

  const locations = ensureArray(root.locations?.GameLocation);
  for (const loc of locations) {
    const l = loc as Record<string, unknown>;
    if ((l.name as string) !== 'CommunityCenter') continue;

    const bundleItems = extractDictItems(l.bundles);
    for (const item of bundleItems) {
      const key = item.key as Record<string, unknown>;
      const val = item.value as Record<string, unknown>;
      const booleans = ensureArray((val?.ArrayOfBoolean as Record<string, unknown>)?.boolean);
      const slots = booleans.map((b) => b === true || b === 'true');
      slotMap.set(num(key?.int), slots);
    }

    const areasBooleans = ensureArray((l.areasComplete as Record<string, unknown>)?.boolean);
    areasComplete = areasBooleans.map((b) => b === true || b === 'true');
    break;
  }

  // Step 3: Merge definitions with completion data
  const bundles: SaveBundleStatus[] = [];
  for (const [index, def] of bundleDefs) {
    const slots = slotMap.get(index) ?? [];

    const items: SaveBundleItem[] = def.items.map((reqItem, i) => {
      const isGold = reqItem.itemId === '-1';
      return {
        itemId: reqItem.itemId,
        name: isGold ? `${reqItem.quantity.toLocaleString()}g` : resolveItemName(reqItem.itemId),
        quantity: reqItem.quantity,
        quality: reqItem.quality,
        completed: slots[i] === true,
      };
    });

    const itemsCompleted = items.filter((it) => it.completed).length;

    bundles.push({
      bundleIndex: index,
      name: def.name,
      room: def.room,
      items,
      itemsRequired: def.itemsRequired,
      itemsCompleted,
      complete: itemsCompleted >= def.itemsRequired,
      reward: def.reward,
    });
  }

  // Sort bundles by index for consistent output
  bundles.sort((a, b) => a.bundleIndex - b.bundleIndex);

  // Step 4: Build room summaries
  const roomMap = new Map<number, SaveBundleStatus[]>();
  for (const bundle of bundles) {
    const def = bundleDefs.get(bundle.bundleIndex)!;
    const existing = roomMap.get(def.areaIndex) ?? [];
    existing.push(bundle);
    roomMap.set(def.areaIndex, existing);
  }

  const rooms: SaveBundleRoom[] = [];
  for (const [areaIndex, roomBundles] of roomMap) {
    rooms.push({
      name: AREA_NAMES[areaIndex] ?? `Area ${areaIndex}`,
      areaIndex,
      complete: areasComplete[areaIndex] === true,
      bundles: roomBundles,
    });
  }
  rooms.sort((a, b) => a.areaIndex - b.areaIndex);

  const isJojaRoute = JOJA_MAIL_FLAGS.some((f) => mail.has(f));
  const isCCComplete = mail.has('ccIsComplete');

  return { bundles, rooms, isJojaRoute, isCCComplete };
}
