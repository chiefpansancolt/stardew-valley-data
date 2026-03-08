export interface Artifact {
  id: string;
  name: string;
  description: string;
  sellPrice: number;
  locations: string[];
  donationNotes: string | null;
  image: string;
}
