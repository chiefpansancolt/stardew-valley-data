import cropsData from '@/data/crops.json';
import { Crop, Season } from '@/types';

export const crops: Crop[] = cropsData as Crop[];

export function getCropById(id: string): Crop | undefined {
  return crops.find((crop) => crop.id === id);
}

export function getCropsBySeason(season: Season): Crop[] {
  return crops.filter((crop) => crop.seasons.includes(season));
}

export function getGiantCrops(): Crop[] {
  return crops.filter((crop) => crop.giant);
}

export function getTrellisCrops(): Crop[] {
  return crops.filter((crop) => crop.trellis);
}

export function getRegrowingCrops(): Crop[] {
  return crops.filter((crop) => crop.regrowDays !== null);
}
