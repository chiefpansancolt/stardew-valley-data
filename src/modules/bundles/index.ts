import { QueryBase } from '@/common/query-base';
import bundleData from '@/data/bundles.json';
import { Bundle, BundleRoom, GoldBundle, ItemBundle, JojaBundle } from '@/types';

const bundlesData: Bundle[] = bundleData as Bundle[];

/**
 * Query builder for Community Center bundle data.
 * Covers item bundles, gold bundles, and the Joja Mart restoration.
 * All filter and sort methods return a new BundleQuery for chaining.
 */
export class BundleQuery extends QueryBase<Bundle> {
  constructor(data: Bundle[] = bundlesData) {
    super(data);
  }

  /** Filter to bundles in the given room. Joja bundles (no room) are excluded. */
  byRoom(room: BundleRoom): BundleQuery {
    return new BundleQuery(
      this.data.filter(
        (b): b is ItemBundle | GoldBundle => b.type !== 'joja mart' && b.room === room,
      ),
    );
  }

  /**
   * Return the active remix bundle selection: for each bundle group, returns the
   * remix variant if one exists, otherwise falls back to the non-remix entry.
   * Joja bundles are excluded.
   */
  remix(): BundleQuery {
    const eligible = this.data.filter((b): b is ItemBundle | GoldBundle => b.type !== 'joja mart');
    const groups = new Map<string, (ItemBundle | GoldBundle)[]>();
    for (const b of eligible) {
      const key = `${b.room}:${b.bundleGroup}`;
      const group = groups.get(key) ?? [];
      group.push(b);
      groups.set(key, group);
    }
    const result: (ItemBundle | GoldBundle)[] = [];
    for (const group of groups.values()) {
      const remixEntries = group.filter((b) => b.remixBundle);
      result.push(...(remixEntries.length > 0 ? remixEntries : group));
    }
    return new BundleQuery(result);
  }

  /** Filter to standard (non-remix) Community Center bundles. Joja bundles are excluded. */
  standard(): BundleQuery {
    return new BundleQuery(
      this.data.filter(
        (b): b is ItemBundle | GoldBundle => b.type !== 'joja mart' && !b.remixBundle,
      ),
    );
  }

  /** Filter to item bundles (type `'items'`). */
  itemBundles(): BundleQuery {
    return new BundleQuery(this.data.filter((b): b is ItemBundle => b.type === 'items'));
  }

  /** Filter to gold bundles (type `'gold'`). */
  goldBundles(): BundleQuery {
    return new BundleQuery(this.data.filter((b): b is GoldBundle => b.type === 'gold'));
  }

  /** Filter to Joja Mart restoration bundles. */
  jojaBundles(): BundleQuery {
    return new BundleQuery(this.data.filter((b): b is JojaBundle => b.type === 'joja mart'));
  }

  /** Sort by room order (as they appear in the Community Center), then by bundle group number within each room. */
  sortByRoomAndBundleGroup(): BundleQuery {
    const ROOM_ORDER: BundleRoom[] = [
      'crafts-room',
      'pantry',
      'fish-tank',
      'boiler-room',
      'bulletin-board',
      'vault',
      'abandoned-joja-mart',
    ];
    return new BundleQuery(
      [...this.data].sort((a, b) => {
        const aRoom = 'room' in a ? ROOM_ORDER.indexOf(a.room) : Infinity;
        const bRoom = 'room' in b ? ROOM_ORDER.indexOf(b.room) : Infinity;
        if (aRoom !== bRoom) return aRoom - bRoom;
        const aGroup = 'bundleGroup' in a ? a.bundleGroup : Infinity;
        const bGroup = 'bundleGroup' in b ? b.bundleGroup : Infinity;
        return aGroup - bGroup;
      }),
    );
  }

  /** Sort alphabetically by name. Default: `'asc'`. */
  sortByName(order: 'asc' | 'desc' = 'asc'): BundleQuery {
    return new BundleQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }
}

/** Returns a BundleQuery for all bundle data. Pass `source` to wrap a pre-filtered array. */
export function bundles(source: Bundle[] = bundlesData): BundleQuery {
  return new BundleQuery(source);
}
