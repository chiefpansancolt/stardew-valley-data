export type KrobusStockType = 'permanent' | 'daily';

export type KrobusDay = 'Monday' | 'Tuesday' | 'Thursday' | 'Friday' | 'Sunday';

export interface KrobusItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stockType: KrobusStockType;
  day?: KrobusDay;
  stockLimit: number;
  isRecipe: boolean;
  availability?: string;
}
