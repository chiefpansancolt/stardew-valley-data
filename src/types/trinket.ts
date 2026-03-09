export type TrinketSource = 'combat-drop' | 'desert-festival';

export interface Trinket {
  id: string;
  name: string;
  effect: string;
  source: TrinketSource;
  forgeable: boolean;
  sellPrice: number;
  image: string;
}
