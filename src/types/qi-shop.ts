export type QiCurrency = 'qi-gem' | 'golden-walnut';

export interface QiStockItem {
  id: string;
  name: string;
  cost: number;
  currency: QiCurrency;
  quantity: number;
  description: string;
  image: string;
  isRecipe: boolean;
  availability?: string;
  note?: string;
}
