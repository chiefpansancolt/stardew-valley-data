import { QueryBase } from '@/common/query-base';
import data from '@/data/locations.json';
import { GameLocation, LocationCategory, LocationDay, LocationType } from '@/types';

const allLocations: GameLocation[] = data as GameLocation[];

/** Query builder for Stardew Valley location data. All filter and sort methods return a new LocationQuery for chaining. */
export class LocationQuery extends QueryBase<GameLocation> {
  constructor(data: GameLocation[] = allLocations) {
    super(data);
  }

  /** Filter to entries of the given type ("location" or "building"). */
  byType(type: LocationType): LocationQuery {
    return new LocationQuery(this.data.filter((l) => l.type === type));
  }

  /** Filter to locations in the given category. */
  byCategory(category: LocationCategory): LocationQuery {
    return new LocationQuery(this.data.filter((l) => l.category === category));
  }

  /** Filter to locations that have a linked shop data file. */
  withShop(): LocationQuery {
    return new LocationQuery(this.data.filter((l) => l.shop !== null));
  }

  /** Filter to locations that are always accessible (no operating hours). */
  alwaysOpen(): LocationQuery {
    return new LocationQuery(this.data.filter((l) => l.openHours === null));
  }

  /** Filter to locations closed on the given day. */
  closedOn(day: LocationDay): LocationQuery {
    return new LocationQuery(this.data.filter((l) => l.closed.includes(day)));
  }

  /** Filter to locations that have the given NPC as an occupant (case-insensitive). */
  byOccupant(name: string): LocationQuery {
    const lower = name.toLowerCase();
    return new LocationQuery(
      this.data.filter((l) => l.occupants.some((o) => o.toLowerCase() === lower)),
    );
  }

  /** Sort locations by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): LocationQuery {
    return new LocationQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a LocationQuery for all Stardew Valley location data. Pass `source` to wrap a pre-filtered array. */
export function locations(source: GameLocation[] = allLocations): LocationQuery {
  return new LocationQuery(source);
}
