export type DesertTraderDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface DesertTraderItem {
  id: string;
  name: string;
  description: string;
  image: string;
  tradeItemId: string;
  tradeItemName: string;
  tradeItemImage: string;
  tradeAmount: number;
  day?: DesertTraderDay;
  isRecipe?: boolean;
  availability?: string;
}
