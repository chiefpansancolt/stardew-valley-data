import { QueryBase } from '@/common/query-base';
import data from '@/data/cooking.json';
import { CookedDish } from '@/types';

const cookingData: CookedDish[] = data as CookedDish[];

/** Query builder for cooked dish data. All filter and sort methods return a new CookingQuery for chaining. */
export class CookingQuery extends QueryBase<CookedDish> {
  constructor(data: CookedDish[] = cookingData) {
    super(data);
  }

  /** Filter to dishes that require a specific ingredient by ID. */
  withIngredient(ingredientId: string): CookingQuery {
    return new CookingQuery(
      this.data.filter((d) => d.ingredients.some((i) => i.id === ingredientId)),
    );
  }

  /** Sort alphabetically by name. Default: `'asc'`. */
  sortByName(order: 'asc' | 'desc' = 'asc'): CookingQuery {
    return new CookingQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  /** Sort by sell price. Default: `'desc'` (most valuable first). */
  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): CookingQuery {
    return new CookingQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice,
      ),
    );
  }

  /**
   * Sort by energy restored. Dishes with no energy value sort as 0.
   * Default: `'desc'` (most energising first).
   */
  sortByEnergy(order: 'asc' | 'desc' = 'desc'): CookingQuery {
    return new CookingQuery(
      [...this.data].sort((a, b) => {
        const ea = a.energyHealth.energy ?? 0;
        const eb = b.energyHealth.energy ?? 0;
        return order === 'asc' ? ea - eb : eb - ea;
      }),
    );
  }
}

/** Returns a CookingQuery for all cooked dish data. Pass `source` to wrap a pre-filtered array. */
export function cooking(source: CookedDish[] = cookingData): CookingQuery {
  return new CookingQuery(source);
}
