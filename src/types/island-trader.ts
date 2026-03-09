export type IslandTraderDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface IslandTraderItem {
  id: string;
  name: string;
  description: string;
  image: string;
  tradeItemId: string;
  tradeItemName: string;
  tradeItemImage: string;
  tradeAmount: number;
  day?: IslandTraderDay;
  isRecipe?: boolean;
  availability?: string;
}
