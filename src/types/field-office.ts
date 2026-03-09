export type FieldOfficeCollection = 'large-animal' | 'snake' | 'mummified-frog' | 'mummified-bat';

export interface FieldOfficeReward {
  goldenWalnuts: number;
  item?: {
    id: string;
    name: string;
    image: string;
  };
}

export interface FieldOfficeDonation {
  id: string;
  name: string;
  description: string;
  image: string;
  collection: FieldOfficeCollection;
  quantity: number;
}

export interface FieldOfficeCollectionData {
  id: FieldOfficeCollection;
  name: string;
  reward: FieldOfficeReward;
  donations: FieldOfficeDonation[];
}
