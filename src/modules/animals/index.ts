import { QueryBase } from '@/common/query-base';
import data from '@/data/animals.json';
import { Animal, FarmAnimal, Pet } from '@/types';

const animalData: Animal[] = data as Animal[];

/** Type guard: narrows an Animal to Pet. */
export function isPet(animal: Animal): animal is Pet {
  return animal.type === 'pet';
}

/** Type guard: narrows an Animal to FarmAnimal. */
export function isFarmAnimal(animal: Animal): animal is FarmAnimal {
  return animal.type === 'farm-animal';
}

/**
 * Query builder for animal data (pets and farm animals).
 * All filter methods return a new AnimalQuery for chaining.
 * Use `.pets()` or `.farmAnimals()` to narrow to a specific subtype.
 */
export class AnimalQuery extends QueryBase<Animal> {
  constructor(data: Animal[] = animalData) {
    super(data);
  }

  /** Filter to pets only. */
  pets(): AnimalQuery {
    return new AnimalQuery(this.data.filter(isPet));
  }

  /** Filter to a specific pet breed by name (case-insensitive). Only matches pets. */
  byPetName(name: string): AnimalQuery {
    return new AnimalQuery(
      this.data.filter((a) => isPet(a) && a.name.toLowerCase() === name.toLowerCase()),
    );
  }

  /** Filter to farm animals only. */
  farmAnimals(): AnimalQuery {
    return new AnimalQuery(this.data.filter(isFarmAnimal));
  }

  /** Filter farm animals by their required building (e.g. `'Coop'`, `'Barn'`). */
  byBuilding(building: string): AnimalQuery {
    return new AnimalQuery(
      this.data.filter(
        (a) => isFarmAnimal(a) && a.building.toLowerCase() === building.toLowerCase(),
      ),
    );
  }

  /** Filter farm animals by harvest method (`'tool'` or `'auto'`). */
  byHarvestMethod(method: FarmAnimal['harvestMethod']): AnimalQuery {
    return new AnimalQuery(this.data.filter((a) => isFarmAnimal(a) && a.harvestMethod === method));
  }

  /** Filter to farm animals with a purchase price (excludes animals obtained by other means). */
  purchasable(): AnimalQuery {
    return new AnimalQuery(this.data.filter((a) => isFarmAnimal(a) && a.purchasePrice !== null));
  }
}

/** Returns an AnimalQuery for all animal data. Pass `source` to wrap a pre-filtered array. */
export function animals(source: Animal[] = animalData): AnimalQuery {
  return new AnimalQuery(source);
}
