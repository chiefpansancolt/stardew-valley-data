import data from '@/data/animals.json';
import { Animal, FarmAnimal, Pet } from '@/types';

const animalData: Animal[] = data as Animal[];

export function isPet(animal: Animal): animal is Pet {
  return animal.type === 'pet';
}

export function isFarmAnimal(animal: Animal): animal is FarmAnimal {
  return animal.type === 'farm-animal';
}

export class AnimalQuery {
  constructor(private data: Animal[] = animalData) {}

  pets(): AnimalQuery {
    return new AnimalQuery(this.data.filter(isPet));
  }

  byPetName(name: string): AnimalQuery {
    return new AnimalQuery(
      this.data.filter((a) => isPet(a) && a.name.toLowerCase() === name.toLowerCase()),
    );
  }

  farmAnimals(): AnimalQuery {
    return new AnimalQuery(this.data.filter(isFarmAnimal));
  }

  byBuilding(building: string): AnimalQuery {
    return new AnimalQuery(
      this.data.filter(
        (a) => isFarmAnimal(a) && a.building.toLowerCase() === building.toLowerCase(),
      ),
    );
  }

  byHarvestMethod(method: FarmAnimal['harvestMethod']): AnimalQuery {
    return new AnimalQuery(this.data.filter((a) => isFarmAnimal(a) && a.harvestMethod === method));
  }

  purchasable(): AnimalQuery {
    return new AnimalQuery(this.data.filter((a) => isFarmAnimal(a) && a.purchasePrice !== null));
  }

  get(): Animal[] {
    return this.data;
  }

  first(): Animal | undefined {
    return this.data[0];
  }

  find(id: string): Animal | undefined {
    return this.data.find((a) => a.id === id);
  }

  findByName(name: string): Animal | undefined {
    return this.data.find((a) => a.name.toLowerCase() === name.toLowerCase());
  }

  count(): number {
    return this.data.length;
  }
}

export function animals(source: Animal[] = animalData): AnimalQuery {
  return new AnimalQuery(source);
}
