export type TrinketSource = 'combat-drop' | 'desert-festival';

export interface Trinket {
  /** Unique identifier in kebab-case */
  id: string;
  /** Display name */
  name: string;
  /** Description of the trinket's effect */
  effect: string;
  /** Where the trinket is obtained */
  source: TrinketSource;
  /** Whether the trinket can be re-forged at the Forge to randomise its stat */
  forgeable: boolean;
  /** Sell price in gold */
  sellPrice: number;
  /** Image path relative to package root */
  image: string;
}
