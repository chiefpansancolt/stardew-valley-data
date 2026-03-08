import cookingData from '@/data/cooking.json';
import { CookedDish } from '@/types';

const allCookingData: CookedDish[] = cookingData as CookedDish[];

export class CookingQuery {
  constructor(private data: CookedDish[] = allCookingData) {}

  sortByName(order: 'asc' | 'desc' = 'asc'): CookingQuery {
    const sorted = [...this.data].sort((a, b) =>
      order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
    return new CookingQuery(sorted);
  }

  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): CookingQuery {
    const sorted = [...this.data].sort((a, b) =>
      order === 'asc' ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice,
    );
    return new CookingQuery(sorted);
  }

  sortByEnergy(order: 'asc' | 'desc' = 'desc'): CookingQuery {
    const sorted = [...this.data].sort((a, b) => {
      const ea = a.energyHealth.energy ?? 0;
      const eb = b.energyHealth.energy ?? 0;
      return order === 'asc' ? ea - eb : eb - ea;
    });
    return new CookingQuery(sorted);
  }

  withIngredient(ingredientId: string): CookingQuery {
    const filtered = this.data.filter((d) => d.ingredients.some((i) => i.id === ingredientId));
    return new CookingQuery(filtered);
  }

  get(): CookedDish[] {
    return this.data;
  }

  first(): CookedDish | undefined {
    return this.data[0];
  }

  find(id: string): CookedDish | undefined {
    return this.data.find((d) => d.id === id);
  }

  findByName(name: string): CookedDish | undefined {
    return this.data.find((d) => d.name.toLowerCase() === name.toLowerCase());
  }

  count(): number {
    return this.data.length;
  }
}

export function cooking(source: CookedDish[] = allCookingData): CookingQuery {
  return new CookingQuery(source);
}
