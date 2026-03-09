export type DesertTraderDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface DesertTraderItem {
  /** Game item ID of the item you receive */
  id: string;
  /** Display name of the item you receive */
  name: string;
  /** Description of the item you receive */
  description: string;
  /** Image path of the item you receive */
  image: string;
  /** ID of the item used to trade */
  tradeItemId: string;
  /** Name of the item used to trade */
  tradeItemName: string;
  /** Image of the item used to trade */
  tradeItemImage: string;
  /** Quantity of trade item required */
  tradeAmount: number;
  /** Day of week this trade is available (undefined = always available) */
  day?: DesertTraderDay;
  /** Whether this item is sold as a crafting recipe */
  isRecipe?: boolean;
  /** Purchase condition if not always available */
  availability?: string;
}
