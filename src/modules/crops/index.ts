import { QueryBase } from '@/common/query-base';
import data from '@/data/crops.json';
import { ArtisanUses, Crop, Season } from '@/types';

const cropData: Crop[] = data as Crop[];

/** Query builder for crop data. All filter and sort methods return a new CropQuery for chaining. */
export class CropQuery extends QueryBase<Crop> {
  constructor(data: Crop[] = cropData) {
    super(data);
  }

  /** Filter to crops available in the given season. */
  bySeason(season: Season): CropQuery {
    return new CropQuery(this.data.filter((c) => c.seasons.includes(season)));
  }

  /** Filter by category string (e.g. `'Vegetable'`, `'Fruit'`). */
  byCategory(category: string): CropQuery {
    return new CropQuery(this.data.filter((c) => c.category === category));
  }

  /** Filter to crops whose seed is sold at the given shop (case-insensitive). */
  byShop(shop: string): CropQuery {
    return new CropQuery(
      this.data.filter((c) =>
        c.seedBuyPrices.some((p) => p.place.toLowerCase() === shop.toLowerCase()),
      ),
    );
  }

  /** Filter to crops that regrow after harvesting (have a `regrowDays` value). */
  regrowing(): CropQuery {
    return new CropQuery(this.data.filter((c) => c.regrowDays !== null));
  }

  /** Filter to crops that can grow into giant crops. */
  giant(): CropQuery {
    return new CropQuery(this.data.filter((c) => c.giant));
  }

  /** Filter to crops that require a trellis. */
  trellis(): CropQuery {
    return new CropQuery(this.data.filter((c) => c.trellis));
  }

  /** Filter to crops available in more than one season. */
  multiSeason(): CropQuery {
    return new CropQuery(this.data.filter((c) => c.seasons.length > 1));
  }

  /** Filter to crops with a variable harvest that can yield more than 1 item. */
  extraHarvest(): CropQuery {
    return new CropQuery(this.data.filter((c) => c.harvestQuantity.max > 1));
  }

  /** Filter to crops whose seeds are purchasable somewhere. */
  availableInShop(): CropQuery {
    return new CropQuery(this.data.filter((c) => c.seedBuyPrices.length > 0));
  }

  /** Filter to crops with energy/health values (edible when consumed). */
  eatable(): CropQuery {
    return new CropQuery(this.data.filter((c) => c.energyHealth !== undefined));
  }

  /** Filter to crops that can be used to produce the given artisan good (e.g. `'wine'`, `'honey'`). */
  byArtisanUse(use: keyof ArtisanUses): CropQuery {
    return new CropQuery(this.data.filter((c) => c.artisanUses[use]));
  }

  /** Sort by crop sell price. Default: `'desc'` (most valuable first). */
  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): CropQuery {
    return new CropQuery(
      [...this.data].sort((a, b) =>
        order === 'desc' ? b.cropSellPrice - a.cropSellPrice : a.cropSellPrice - b.cropSellPrice,
      ),
    );
  }

  /** Sort by grow days. Default: `'asc'` (fastest first). */
  sortByGrowDays(order: 'asc' | 'desc' = 'asc'): CropQuery {
    return new CropQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.growDays - b.growDays : b.growDays - a.growDays,
      ),
    );
  }
}

/** Returns a CropQuery for all crop data. Pass `source` to wrap a pre-filtered array. */
export function crops(source: Crop[] = cropData): CropQuery {
  return new CropQuery(source);
}
