import { QueryBase } from '@/common/query-base';
import dwarfShopData from '@/data/dwarf-shop.json';
import { DwarfShopCategory, DwarfShopItem } from '@/types';

const allDwarfShopData: DwarfShopItem[] = dwarfShopData as DwarfShopItem[];

/** Query builder for items sold at the Dwarf's shop in the Mines. All filter and sort methods return a new DwarfShopQuery for chaining. */
export class DwarfShopQuery extends QueryBase<DwarfShopItem> {
  constructor(data: DwarfShopItem[] = allDwarfShopData) {
    super(data);
  }

  /** Filter to items in the given category. */
  byCategory(category: DwarfShopCategory): DwarfShopQuery {
    return new DwarfShopQuery(this.data.filter((item) => item.category === category));
  }

  /** Filter to explosive items (Cherry Bomb, Bomb, Mega Bomb). */
  explosives(): DwarfShopQuery {
    return new DwarfShopQuery(this.data.filter((item) => item.category === 'explosive'));
  }

  /** Filter to consumable items (Life Elixir, Oil of Garlic). */
  consumables(): DwarfShopQuery {
    return new DwarfShopQuery(this.data.filter((item) => item.category === 'consumable'));
  }

  /** Filter to crafting recipe items. */
  recipes(): DwarfShopQuery {
    return new DwarfShopQuery(this.data.filter((item) => item.category === 'recipe'));
  }

  /** Sort by price ascending or descending. */
  sortByPrice(order: 'asc' | 'desc' = 'asc'): DwarfShopQuery {
    return new DwarfShopQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price)),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): DwarfShopQuery {
    return new DwarfShopQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a DwarfShopQuery for all items sold at the Dwarf's shop. Pass `source` to wrap a pre-filtered array. */
export function dwarfShop(source: DwarfShopItem[] = allDwarfShopData): DwarfShopQuery {
  return new DwarfShopQuery(source);
}
