import { QueryBase } from '@/common/query-base';
import craftingData from '@/data/crafting.json';
import { CraftingRecipe } from '@/types';

const allCraftingData: CraftingRecipe[] = craftingData as CraftingRecipe[];

/** Query builder for crafting recipe data. All filter and sort methods return a new CraftingQuery for chaining. */
export class CraftingQuery extends QueryBase<CraftingRecipe> {
  constructor(data: CraftingRecipe[] = allCraftingData) {
    super(data);
  }

  /** Filter recipes by category (case-insensitive). */
  byCategory(category: string): CraftingQuery {
    const lower = category.toLowerCase();
    return new CraftingQuery(this.data.filter((r) => r.category.toLowerCase() === lower));
  }

  /** Filter recipes by source string (partial match, case-insensitive). */
  bySource(source: string): CraftingQuery {
    const lower = source.toLowerCase();
    return new CraftingQuery(this.data.filter((r) => r.source.toLowerCase().includes(lower)));
  }

  /** Find a recipe by its output item ID. */
  findByOutputId(id: string): CraftingRecipe | undefined {
    return this.data.find((r) => r.output.id === id);
  }

  sortByName(order: 'asc' | 'desc' = 'asc'): CraftingQuery {
    const sorted = [...this.data].sort((a, b) =>
      order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
    return new CraftingQuery(sorted);
  }

  sortByCategory(order: 'asc' | 'desc' = 'asc'): CraftingQuery {
    const sorted = [...this.data].sort((a, b) => {
      const cmp = a.category.localeCompare(b.category);
      return order === 'asc' ? cmp : -cmp;
    });
    return new CraftingQuery(sorted);
  }
}

/** Returns a CraftingQuery for all crafting recipe data. Pass `source` to wrap a pre-filtered array. */
export function crafting(source: CraftingRecipe[] = allCraftingData): CraftingQuery {
  return new CraftingQuery(source);
}
