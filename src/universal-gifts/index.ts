import { UniversalGifts } from '@/types';
import universalGiftsData from '../../data/universal-gifts.json';

export function universalGifts(): UniversalGifts {
  return universalGiftsData as UniversalGifts;
}
