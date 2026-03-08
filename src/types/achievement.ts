export interface Achievement {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string | null;
  reward: string | null;
  secret: boolean;
}
