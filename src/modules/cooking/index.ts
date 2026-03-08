import { QueryBase } from '@/common/query-base';
import cookingData from '@/data/cooking.json';
import { CookedDish } from '@/types';

const allCookingData: CookedDish[] = cookingData as CookedDish[];

/** Query builder for cooked dish data. All filter and sort methods return a new CookingQuery for chaining. */
export class CookingQuery extends QueryBase<CookedDish> {
  constructor(data: CookedDish[] = allCookingData) {
    super(data);
  }

  /** Sort alphabetically by name. Default: `'asc'`. */
  sortByName(order: 'asc' | 'desc' = 'asc'): CookingQuery {
    const sorted = [...this.data].sort((a, b) =>
      order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
    return new CookingQuery(sorted);
  }

  /** Sort by sell price. Default: `'desc'` (most valuable first). */
  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): CookingQuery {
    const sorted = [...this.data].sort((a, b) =>
      order === 'asc' ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice,
    );
    return new CookingQuery(sorted);
  }

  /**
   * Sort by energy restored. Dishes with no energy value sort as 0.
   * Default: `'desc'` (most energising first).
   */
  sortByEnergy(order: 'asc' | 'desc' = 'desc'): CookingQuery {
    const sorted = [...this.data].sort((a, b) => {
      const ea = a.energyHealth.energy ?? 0;
      const eb = b.energyHealth.energy ?? 0;
      return order === 'asc' ? ea - eb : eb - ea;
    });
    return new CookingQuery(sorted);
  }

  /** Filter to dishes that require a specific ingredient by ID. */
  withIngredient(ingredientId: string): CookingQuery {
    const filtered = this.data.filter((d) => d.ingredients.some((i) => i.id === ingredientId));
    return new CookingQuery(filtered);
  }
}

/** Returns a CookingQuery for all cooked dish data. Pass `source` to wrap a pre-filtered array. */
export function cooking(source: CookedDish[] = allCookingData): CookingQuery {
  return new CookingQuery(source);
}
