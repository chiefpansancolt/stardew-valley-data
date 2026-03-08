import universalGiftsData from '@/data/universal-gifts.json';
import { UniversalGifts } from '@/types';

/**
 * Returns the universal gift preferences shared across all villagers:
 * loved, liked, neutral, disliked, and hated item lists.
 */
export function universalGifts(): UniversalGifts {
  return universalGiftsData as UniversalGifts;
}
