# medical-supplies

Query items sold at Harvey's Clinic. Both items are available when Harvey or Maru is staffing the
supplies counter.

## Usage

```ts
import { medicalSupplies } from "stardew-valley-data";

// All items
medicalSupplies().count(); // 2
medicalSupplies().get();

// Find specific item
medicalSupplies().find("349"); // Energy Tonic
medicalSupplies().findByName("Muscle Remedy");

// Sort
medicalSupplies().sortByName().get();
medicalSupplies().sortByPrice().get();
```

## Factory function

```ts
function medicalSupplies(source?: MedicalSupply[]): MedicalSupplyQuery;
```

## Sort methods

| Method              | Returns            | Description                  |
| ------------------- | ------------------ | ---------------------------- |
| sortByPrice(order?) | MedicalSupplyQuery | Sort by price (default: asc) |
| sortByName(order?)  | MedicalSupplyQuery | Sort by name alphabetically  |

## Terminal methods

| Method           | Returns                    | Description                      |
| ---------------- | -------------------------- | -------------------------------- |
| get()            | MedicalSupply[]            | All items in the current query   |
| first()          | MedicalSupply \| undefined | First item                       |
| find(id)         | MedicalSupply \| undefined | Find by item ID                  |
| findByName(name) | MedicalSupply \| undefined | Find by name (case-insensitive)  |
| count()          | number                     | Number of items in current query |

## Examples

```ts
medicalSupplies().find("349");
// → { id: "349", name: "Energy Tonic", price: 1000, energy: 500, health: 0, ... }

medicalSupplies().find("351");
// → { id: "351", name: "Muscle Remedy", price: 1000, energy: 50, health: 22, ... }
```

## Items

| Name          | Price | Energy | Health | Notes                             |
| ------------- | ----- | ------ | ------ | --------------------------------- |
| Energy Tonic  | 1000g | 500    | 0      | Restores a large amount of energy |
| Muscle Remedy | 1000g | 50     | 22     | Removes the Exhaustion debuff     |

## MedicalSupply fields

| Field       | Type   | Description                    |
| ----------- | ------ | ------------------------------ |
| id          | string | Game item ID from Objects.json |
| name        | string | Display name                   |
| price       | number | Purchase price in gold         |
| description | string | Item description               |
| energy      | number | Energy restored when consumed  |
| health      | number | Health restored when consumed  |
| image       | string | Image path                     |
