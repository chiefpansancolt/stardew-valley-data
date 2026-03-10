import { AnimalQuery, animals, isFarmAnimal, isPet } from '@/modules/animals';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('animals', () => animals());

describe('type guards', () => {
  it('isPet() returns true for pets', () => {
    const pet = animals().pets().first()!;
    expect(isPet(pet)).toBe(true);
    expect(isFarmAnimal(pet)).toBe(false);
  });

  it('isFarmAnimal() returns true for farm animals', () => {
    const farm = animals().farmAnimals().first()!;
    expect(isFarmAnimal(farm)).toBe(true);
    expect(isPet(farm)).toBe(false);
  });
});

describe('AnimalQuery filters', () => {
  it('pets() returns only pets', () => {
    const pets = animals().pets().get();
    expect(pets.length).toBeGreaterThan(0);
    for (const a of pets) {
      expect(a.type).toBe('pet');
    }
  });

  it('farmAnimals() returns only farm animals', () => {
    const farm = animals().farmAnimals().get();
    expect(farm.length).toBeGreaterThan(0);
    for (const a of farm) {
      expect(a.type).toBe('farm-animal');
    }
  });

  it('pets + farmAnimals = all animals', () => {
    const total = animals().count();
    const petCount = animals().pets().count();
    const farmCount = animals().farmAnimals().count();
    expect(petCount + farmCount).toBe(total);
  });

  it('byBuilding() filters farm animals by building', () => {
    const coop = animals().byBuilding('Coop').get();
    expect(coop.length).toBeGreaterThan(0);
    for (const a of coop) {
      expect(isFarmAnimal(a)).toBe(true);
      if (isFarmAnimal(a)) {
        expect(a.building.toLowerCase()).toBe('coop');
      }
    }
  });

  it('purchasable() returns only purchasable farm animals', () => {
    const purchasable = animals().purchasable().get();
    expect(purchasable.length).toBeGreaterThan(0);
    for (const a of purchasable) {
      expect(isFarmAnimal(a)).toBe(true);
      if (isFarmAnimal(a)) {
        expect(a.purchasePrice).not.toBeNull();
      }
    }
  });

  it('byPetName() filters pets by name (case-insensitive)', () => {
    const firstPet = animals().pets().first()!;
    const results = animals().byPetName(firstPet.name).get();
    expect(results.length).toBeGreaterThan(0);
    for (const a of results) {
      expect(isPet(a)).toBe(true);
      expect(a.name.toLowerCase()).toBe(firstPet.name.toLowerCase());
    }
  });

  it('byPetName() returns empty for non-existent pet name', () => {
    const results = animals().byPetName('NonExistentPet').get();
    expect(results.length).toBe(0);
  });

  it('byHarvestMethod() filters farm animals by harvest method', () => {
    const dropHarvest = animals().byHarvestMethod('drop').get();
    for (const a of dropHarvest) {
      expect(isFarmAnimal(a)).toBe(true);
      if (isFarmAnimal(a)) {
        expect(a.harvestMethod).toBe('drop');
      }
    }
    const toolHarvest = animals().byHarvestMethod('tool').get();
    for (const a of toolHarvest) {
      expect(isFarmAnimal(a)).toBe(true);
      if (isFarmAnimal(a)) {
        expect(a.harvestMethod).toBe('tool');
      }
    }
  });
});

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new AnimalQuery();
    expect(query.count()).toBeGreaterThan(0);
  });
});

testFilterImmutability(
  'pets',
  () => animals(),
  (q) => (q as AnimalQuery).pets(),
);
testFilterImmutability(
  'farmAnimals',
  () => animals(),
  (q) => (q as AnimalQuery).farmAnimals(),
);
