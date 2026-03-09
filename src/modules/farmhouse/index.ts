import { QueryBase } from '@/common/query-base';
import farmhouseData from '@/data/farmhouse.json';
import { HouseRenovation, HouseUpgrade } from '@/types';

const allUpgrades: HouseUpgrade[] = farmhouseData.upgrades as HouseUpgrade[];
const allRenovations: HouseRenovation[] = farmhouseData.renovations as HouseRenovation[];

/** Query builder for farmhouse upgrade data. Upgrades are sequential (tier 1–4). All filter and sort methods return a new HouseUpgradeQuery for chaining. */
export class HouseUpgradeQuery extends QueryBase<HouseUpgrade> {
  constructor(data: HouseUpgrade[] = allUpgrades) {
    super(data);
  }

  /** Filter to upgrades at the given tier. */
  byTier(tier: number): HouseUpgradeQuery {
    return new HouseUpgradeQuery(this.data.filter((u) => u.tier === tier));
  }

  /** Sort by tier ascending or descending. */
  sortByTier(order: 'asc' | 'desc' = 'asc'): HouseUpgradeQuery {
    return new HouseUpgradeQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.tier - b.tier : b.tier - a.tier)),
    );
  }
}

/** Query builder for farmhouse renovation data. Renovations are available after Upgrade 2 and are completed instantly. All filter and sort methods return a new HouseRenovationQuery for chaining. */
export class HouseRenovationQuery extends QueryBase<HouseRenovation> {
  constructor(data: HouseRenovation[] = allRenovations) {
    super(data);
  }

  /** Filter to free renovations (cost === 0). */
  free(): HouseRenovationQuery {
    return new HouseRenovationQuery(this.data.filter((r) => r.cost === 0));
  }

  /** Filter to renovations that require another renovation to be completed first. */
  withPrerequisite(): HouseRenovationQuery {
    return new HouseRenovationQuery(this.data.filter((r) => r.prerequisite !== null));
  }

  /** Sort by cost ascending or descending. */
  sortByPrice(order: 'asc' | 'desc' = 'asc'): HouseRenovationQuery {
    return new HouseRenovationQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.cost - b.cost : b.cost - a.cost)),
    );
  }

  /** Sort alphabetically by name. */
  sortByName(order: 'asc' | 'desc' = 'asc'): HouseRenovationQuery {
    return new HouseRenovationQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a HouseUpgradeQuery for all farmhouse upgrade tiers. Pass `source` to wrap a pre-filtered array. */
export function houseUpgrades(source: HouseUpgrade[] = allUpgrades): HouseUpgradeQuery {
  return new HouseUpgradeQuery(source);
}

/** Returns a HouseRenovationQuery for all farmhouse renovations. Pass `source` to wrap a pre-filtered array. */
export function houseRenovations(source: HouseRenovation[] = allRenovations): HouseRenovationQuery {
  return new HouseRenovationQuery(source);
}
