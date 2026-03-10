import { QueryBase } from '@/common/query-base';
import buildingData from '@/data/buildings.json';
import { Building, BuildingBuilder } from '@/types';

const allBuildings: Building[] = buildingData as Building[];

/**
 * Query builder for building data. All filter and sort methods return a new BuildingQuery for chaining.
 * Farmhouse upgrades/renovations are in the separate `farmhouse` module.
 */
export class BuildingQuery extends QueryBase<Building> {
  constructor(data: Building[] = allBuildings) {
    super(data);
  }

  /** Filter by builder (Robin or Wizard). */
  byBuilder(builder: BuildingBuilder): BuildingQuery {
    return new BuildingQuery(this.data.filter((b) => b.builder === builder));
  }

  /** Filter to magical buildings only (Wizard buildings constructed instantly). */
  magical(): BuildingQuery {
    return new BuildingQuery(this.data.filter((b) => b.magical));
  }

  /** Filter to buildings that are upgrades of another building. */
  upgrades(): BuildingQuery {
    return new BuildingQuery(this.data.filter((b) => b.upgradeFrom !== null));
  }

  /** Filter to base buildings (not upgrades). */
  base(): BuildingQuery {
    return new BuildingQuery(this.data.filter((b) => b.upgradeFrom === null));
  }

  /** Sort by build cost. Default: `'asc'`. */
  sortByCost(order: 'asc' | 'desc' = 'asc'): BuildingQuery {
    const sorted = [...this.data].sort((a, b) => a.buildCost - b.buildCost);
    return new BuildingQuery(order === 'desc' ? sorted.reverse() : sorted);
  }

  /** Sort alphabetically by name. */
  sortByName(order: 'asc' | 'desc' = 'asc'): BuildingQuery {
    const sorted = [...this.data].sort((a, b) => a.name.localeCompare(b.name));
    return new BuildingQuery(order === 'desc' ? sorted.reverse() : sorted);
  }
}

/** Returns a BuildingQuery for all building data. Pass `source` to wrap a pre-filtered array. */
export function buildings(source: Building[] = allBuildings): BuildingQuery {
  return new BuildingQuery(source);
}
