# animals

Query builder and utilities for Stardew Valley animal data.

Covers all pets (Cat, Dog, Turtle, Horse) and farm animals (Coop and Barn), including produce,
deluxe produce, purchase prices, and harvest details.

## Usage

```ts
import { animals, isFarmAnimal, isPet } from "stardew-valley-data";
```

## Factory function

```ts
animals(source?: Animal[]): AnimalQuery
```

## Filter methods

| Method                    | Returns       | Description                                   |
| ------------------------- | ------------- | --------------------------------------------- |
| `pets()`                  | `AnimalQuery` | Only pets (Cat, Dog, Turtle, Horse)           |
| `farmAnimals()`           | `AnimalQuery` | Only farm animals                             |
| `byPetName(name)`         | `AnimalQuery` | All pet variants matching a name (e.g. "Cat") |
| `byBuilding(building)`    | `AnimalQuery` | Farm animals requiring the given building     |
| `byHarvestMethod(method)` | `AnimalQuery` | Farm animals with the given harvest method    |
| `purchasable()`           | `AnimalQuery` | Farm animals with a direct purchase price     |

## Terminal methods

| Method             | Returns               | Description                           |
| ------------------ | --------------------- | ------------------------------------- |
| `get()`            | `Animal[]`            | All animals in the current query      |
| `first()`          | `Animal \| undefined` | First animal in the current query     |
| `find(id)`         | `Animal \| undefined` | Find by animal ID                     |
| `findByName(name)` | `Animal \| undefined` | Find by name (case-insensitive)       |
| `count()`          | `number`              | Count of animals in the current query |

## Type guards

```ts
isPet(animal: Animal): animal is Pet
isFarmAnimal(animal: Animal): animal is FarmAnimal
```

## Examples

```ts
// All animals
animals().get();

// All pets
animals().pets().get();

// All cat variants
animals().byPetName("Cat").get();
// [{ id: 'cat-1', name: 'Cat', variant: 1, ... }, { id: 'cat-2', ... }, ...]

// Find a specific pet variant
animals().find("dog-3");
// { type: 'pet', id: 'dog-3', name: 'Dog', variant: 3, image: '...' }

// All farm animals
animals().farmAnimals().get();

// Farm animals in the Barn
animals().byBuilding("Barn").get();

// Only directly purchasable animals
animals().farmAnimals().purchasable().get();

// Animals harvested with a tool
animals().byHarvestMethod("tool").get();

// Look up a specific farm animal
const pig = animals().find("pig");
pig?.produce.name; // 'Truffle'
pig?.produce.sellPrice; // 625
pig?.daysToProduce; // 1

// Narrowing with type guards
for (const animal of animals().get()) {
  if (isFarmAnimal(animal)) {
    console.log(animal.produce.name);
  }
  if (isPet(animal)) {
    console.log(animal.variant);
  }
}
```

## Pet fields

| Field   | Type   | Notes                                   |
| ------- | ------ | --------------------------------------- |
| type    | string | Always "pet"                            |
| id      | string | e.g. cat-1, cat-2, dog-1, turtle, horse |
| name    | string | e.g. "Cat", "Dog", "Turtle", "Horse"    |
| variant | number | Variant index (1–5 for cats/dogs)       |
| image   | string | Path to animal image                    |

### Pet IDs

| ID             | Name           | Variant |
| -------------- | -------------- | ------- |
| cat-1          | Cat            | 1       |
| cat-2          | Cat            | 2       |
| cat-3          | Cat            | 3       |
| cat-4          | Cat            | 4       |
| cat-5          | Cat            | 5       |
| dog-1          | Dog            | 1       |
| dog-2          | Dog            | 2       |
| dog-3          | Dog            | 3       |
| dog-4          | Dog            | 4       |
| dog-5          | Dog            | 5       |
| turtle         | Turtle         | 1       |
| iridium-turtle | Iridium Turtle | 2       |
| horse          | Horse          |         |

## Farm animal fields

| Field                   | Type                  | Notes                                         |
| ----------------------- | --------------------- | --------------------------------------------- |
| type                    | string                | Always "farm-animal"                          |
| id                      | string                |                                               |
| name                    | string                |                                               |
| description             | string                |                                               |
| building                | string                | Required building (e.g. "Coop", "Big Barn")   |
| purchasePrice           | number or null        | null if not directly purchasable from Marnie  |
| sellPrice               | number                |                                               |
| daysToMature            | number                | Days before the animal begins producing       |
| daysToProduce           | number                | Days between each produce drop                |
| harvestMethod           | drop, tool, or dig    | How produce is collected                      |
| harvestTool             | string or null        | Required tool (e.g. "Milk Pail", "Shears")    |
| produce                 | AnimalProduce         |                                               |
| produce.id              | string                | Object ID from game data                      |
| produce.name            | string                |                                               |
| produce.sellPrice       | number                |                                               |
| produce.image           | string                | Path to produce image                         |
| deluxeProduce           | AnimalProduce or null | Dropped when animal friendship is high enough |
| deluxeProduce.id        | string                |                                               |
| deluxeProduce.name      | string                |                                               |
| deluxeProduce.sellPrice | number                |                                               |
| deluxeProduce.image     | string                |                                               |
| image                   | string                | Path to animal image                          |

### All farm animals

| ID             | Building    | Price  | Produce      | Deluxe Produce  |
| -------------- | ----------- | ------ | ------------ | --------------- |
| white-chicken  | Coop        | 400g   | Egg          | Large Egg       |
| brown-chicken  | Coop        | —      | Brown Egg    | Large Brown Egg |
| blue-chicken   | Coop        | —      | Egg          | Large Egg       |
| void-chicken   | Coop        | —      | Void Egg     | —               |
| golden-chicken | Coop        | —      | Golden Egg   | —               |
| duck           | Big Coop    | 600g   | Duck Egg     | Duck Feather    |
| rabbit         | Deluxe Coop | 4,000g | Wool         | Rabbit's Foot   |
| dinosaur       | Coop        | —      | Dinosaur Egg | —               |
| white-cow      | Barn        | 750g   | Milk         | Large Milk      |
| brown-cow      | Barn        | —      | Milk         | Large Milk      |
| goat           | Big Barn    | 2,000g | Goat Milk    | Large Goat Milk |
| sheep          | Deluxe Barn | 4,000g | Wool         | —               |
| pig            | Deluxe Barn | 8,000g | Truffle      | —               |
| ostrich        | Barn        | —      | Ostrich Egg  | —               |
