export type CasinoCategory = 'furniture' | 'hat' | 'scarecrow' | 'consumable' | 'decoration';

export interface CasinoItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: CasinoCategory;
}
