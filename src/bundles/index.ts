import bundleData from '@/data/bundles.json';
import { Bundle, BundleRoom, GoldBundle, ItemBundle, JojaBundle } from '@/types';

const bundlesData: Bundle[] = bundleData as Bundle[];

export class BundleQuery {
  constructor(private data: Bundle[] = bundlesData) {}

  byRoom(room: BundleRoom): BundleQuery {
    return new BundleQuery(
      this.data.filter(
        (b): b is ItemBundle | GoldBundle => b.type !== 'joja mart' && b.room === room,
      ),
    );
  }

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

  standard(): BundleQuery {
    return new BundleQuery(
      this.data.filter(
        (b): b is ItemBundle | GoldBundle => b.type !== 'joja mart' && !b.remixBundle,
      ),
    );
  }

  itemBundles(): BundleQuery {
    return new BundleQuery(this.data.filter((b): b is ItemBundle => b.type === 'items'));
  }

  goldBundles(): BundleQuery {
    return new BundleQuery(this.data.filter((b): b is GoldBundle => b.type === 'gold'));
  }

  jojaBundles(): BundleQuery {
    return new BundleQuery(this.data.filter((b): b is JojaBundle => b.type === 'joja mart'));
  }

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

  sortByName(order: 'asc' | 'desc' = 'asc'): BundleQuery {
    return new BundleQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  get(): Bundle[] {
    return this.data;
  }

  first(): Bundle | undefined {
    return this.data[0];
  }

  find(id: string): Bundle | undefined {
    return this.data.find((b) => b.id === id);
  }

  findByName(name: string): Bundle | undefined {
    const q = name.toLowerCase();
    return this.data.find((b) => b.name.toLowerCase() === q);
  }

  count(): number {
    return this.data.length;
  }
}

export function bundles(source: Bundle[] = bundlesData): BundleQuery {
  return new BundleQuery(source);
}
