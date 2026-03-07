import data from '@/data/crops.json';
import { Crop, Season } from '@/types';

const cropData: Crop[] = data as Crop[];

export class CropQuery {
  constructor(private data: Crop[] = cropData) {}

  bySeason(season: Season): CropQuery {
    return new CropQuery(this.data.filter((c) => c.seasons.includes(season)));
  }

  byCategory(category: string): CropQuery {
    return new CropQuery(this.data.filter((c) => c.category === category));
  }

  byShop(shop: string): CropQuery {
    return new CropQuery(
      this.data.filter((c) =>
        c.seedBuyPrices.some((p) => p.place.toLowerCase() === shop.toLowerCase())
      )
    );
  }

  regrowing(): CropQuery {
    return new CropQuery(this.data.filter((c) => c.regrowDays !== null));
  }

  giant(): CropQuery {
    return new CropQuery(this.data.filter((c) => c.giant));
  }

  trellis(): CropQuery {
    return new CropQuery(this.data.filter((c) => c.trellis));
  }

  multiSeason(): CropQuery {
    return new CropQuery(this.data.filter((c) => c.seasons.length > 1));
  }

  extraHarvest(): CropQuery {
    return new CropQuery(this.data.filter((c) => c.harvestQuantity.max > 1));
  }

  availableInShop(): CropQuery {
    return new CropQuery(this.data.filter((c) => c.seedBuyPrices.length > 0));
  }

  eatable(): CropQuery {
    return new CropQuery(this.data.filter((c) => c.energyHealth !== undefined));
  }

  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): CropQuery {
    return new CropQuery(
      [...this.data].sort((a, b) =>
        order === 'desc' ? b.cropSellPrice - a.cropSellPrice : a.cropSellPrice - b.cropSellPrice
      )
    );
  }

  sortByGrowDays(order: 'asc' | 'desc' = 'asc'): CropQuery {
    return new CropQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.growDays - b.growDays : b.growDays - a.growDays
      )
    );
  }

  find(id: string): Crop | undefined {
    return this.data.find((c) => c.id === id);
  }

  findByName(name: string): Crop | undefined {
    return this.data.find((c) => c.name.toLowerCase() === name.toLowerCase());
  }

  get(): Crop[] {
    return this.data;
  }

  first(): Crop | undefined {
    return this.data[0];
  }

  count(): number {
    return this.data.length;
  }
}

export function crops(source: Crop[] = cropData): CropQuery {
  return new CropQuery(source);
}
