export type SpecialOrderCategory = 'town' | 'qi';

export interface SpecialOrderData {
  id: string;
  name: string;
  requester: string;
  type: SpecialOrderCategory;
  text: string;
  prerequisites: string | null;
  timeframe: number;
  requirements: string;
  rewards: string;
  repeatable: boolean;
}
