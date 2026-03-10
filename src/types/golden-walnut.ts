export type GoldenWalnutTrackingType = 'all-at-once' | 'limited' | 'extra';

export interface GoldenWalnut {
  id: string;
  name: string;
  amount: number;
  location: string;
  hint: string;
  trackingType: GoldenWalnutTrackingType;
}
