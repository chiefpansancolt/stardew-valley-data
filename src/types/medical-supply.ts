export interface MedicalSupply {
  /** Game item ID from Objects.json */
  id: string;
  /** Display name */
  name: string;
  /** Purchase price in gold */
  price: number;
  /** Item description */
  description: string;
  /** Energy restored when consumed */
  energy: number;
  /** Health restored when consumed */
  health: number;
  /** Image path */
  image: string;
}
