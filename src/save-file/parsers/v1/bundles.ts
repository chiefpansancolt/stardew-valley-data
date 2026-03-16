import type {
  SaveBundleData,
  SaveBundleItem,
  SaveBundleReward,
  SaveBundleRoom,
  SaveBundleStatus,
} from '../../types';
import { resolveItemName, resolveRewardName } from '../item-names';
import { ensureArray, extractDictItems, num } from '../util';

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

/** Quality number → display name. */
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
    items.push({ itemId, quantity, quality });
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
        qualityName: QUALITY_NAMES[reqItem.quality] ?? `Quality ${reqItem.quality}`,
        completed: slots[i] === true,
      };
    });

    const itemsCompleted = items.filter((it) => it.completed).length;

    bundles.push({
      id: `${def.room}/${index}`,
      bundleIndex: index,
      name: def.name,
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

  return { rooms, isJojaRoute, isCCComplete };
}
