import { BundleQuery, bundles } from '@/modules/bundles';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('bundles', () => bundles());

describe('BundleQuery filters', () => {
  it('itemBundles() returns only item bundles', () => {
    const items = bundles().itemBundles().get();
    expect(items.length).toBeGreaterThan(0);
    for (const b of items) {
      expect(b.type).toBe('items');
    }
  });

  it('goldBundles() returns only gold bundles', () => {
    const gold = bundles().goldBundles().get();
    expect(gold.length).toBeGreaterThan(0);
    for (const b of gold) {
      expect(b.type).toBe('gold');
    }
  });

  it('jojaBundles() returns only joja bundles', () => {
    const joja = bundles().jojaBundles().get();
    expect(joja.length).toBeGreaterThan(0);
    for (const b of joja) {
      expect(b.type).toBe('joja mart');
    }
  });

  it('standard() excludes remix and joja', () => {
    const std = bundles().standard().get();
    expect(std.length).toBeGreaterThan(0);
    for (const b of std) {
      expect(b.type).not.toBe('joja mart');
      if (b.type === 'items' || b.type === 'gold') {
        expect(b.remixBundle).toBe(false);
      }
    }
  });

  it('remix() picks remix variants when available, falls back to standard', () => {
    const remixed = bundles().remix().get();
    expect(remixed.length).toBeGreaterThan(0);
    for (const b of remixed) {
      expect(b.type).not.toBe('joja mart');
    }
  });

  it('byRoom() filters to a specific room', () => {
    const pantry = bundles().byRoom('pantry').get();
    expect(pantry.length).toBeGreaterThan(0);
    for (const b of pantry) {
      if (b.type === 'items' || b.type === 'gold') {
        expect(b.room).toBe('pantry');
      }
    }
  });
});

describe('BundleQuery sorts', () => {
  it('sortByName asc is alphabetical', () => {
    const sorted = bundles().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc is reverse alphabetical', () => {
    const sorted = bundles().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });

  it('sortByRoomAndBundleGroup() orders by room then bundle group', () => {
    const sorted = bundles().sortByRoomAndBundleGroup().get();
    expect(sorted.length).toBeGreaterThan(0);
    const ROOM_ORDER = [
      'crafts-room',
      'pantry',
      'fish-tank',
      'boiler-room',
      'bulletin-board',
      'vault',
      'abandoned-joja-mart',
    ];
    for (let i = 1; i < sorted.length; i++) {
      const aRoom =
        'room' in sorted[i - 1] ? ROOM_ORDER.indexOf((sorted[i - 1] as any).room) : Infinity;
      const bRoom = 'room' in sorted[i] ? ROOM_ORDER.indexOf((sorted[i] as any).room) : Infinity;
      if (aRoom !== bRoom) {
        expect(aRoom).toBeLessThanOrEqual(bRoom);
      } else {
        const aGroup =
          'bundleGroup' in sorted[i - 1] ? (sorted[i - 1] as any).bundleGroup : Infinity;
        const bGroup = 'bundleGroup' in sorted[i] ? (sorted[i] as any).bundleGroup : Infinity;
        expect(aGroup).toBeLessThanOrEqual(bGroup);
      }
    }
  });
});

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new BundleQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByName default order is asc', () => {
    const sorted = bundles().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testFilterImmutability(
  'standard',
  () => bundles(),
  (q) => (q as BundleQuery).standard(),
);
testFilterImmutability(
  'jojaBundles',
  () => bundles(),
  (q) => (q as BundleQuery).jojaBundles(),
);
