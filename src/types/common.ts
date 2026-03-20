export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'ginger island';

export type Quality = 'silver' | 'gold' | 'iridium';
export type ItemQuality = 'base' | Quality;

export interface EnergyHealth {
  energy?: number;
  health?: number;
  poison?: boolean;
}

export interface SeedBuyPrice {
  place: string;
  price: number;
}

export interface Ingredient {
  name: string;
  id: string;
  quantity: number;
}

export interface Stage {
  name: string;
  image: string;
}

export interface GiftPreferences {
  loves: string[];
  likes: string[];
  neutrals: string[];
  dislikes: string[];
  hates: string[];
}

export type KnowledgeBonus = 'spring-onion-mastery' | 'bears-knowledge';

export type ProfessionBonus =
  | 'artisan'
  | 'rancher'
  | 'tiller'
  | 'blacksmith'
  | 'gemologist'
  | 'tapper'
  | 'fisher'
  | 'angler';

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface Buff {
  stat: string;
  value: number;
}

export interface ArtisanUses {
  honey: boolean;
  wine: boolean;
  juice: boolean;
  pickles: boolean;
  jelly: boolean;
  driedMushrooms: boolean;
  driedFruit: boolean;
}

export interface TraderShopItem {
  id: string;
  name: string;
  description: string;
  image: string;
  tradeItemId: string;
  tradeItemName: string;
  tradeItemImage: string;
  tradeAmount: number;
  day?: DayOfWeek;
  isRecipe?: boolean;
  availability?: string;
}
