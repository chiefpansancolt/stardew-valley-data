export type VolcanoShopCurrency = 'gold' | 'cinder-shard' | 'diamond';
export type VolcanoShopCategory = 'footwear' | 'book' | 'consumable' | 'hat' | 'food';

export interface VolcanoShopItem {
  id: string;
  name: string;
  price: number;
  currency: VolcanoShopCurrency;
  description: string;
  image: string;
  category: VolcanoShopCategory;
  availability?: string;
}
