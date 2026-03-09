# wizard

Query magical constructions available at the Wizard's Tower. Each building has a gold cost and
material requirements.

## Usage

```ts
import { wizard } from "stardew-valley-data";

// All buildings
wizard().count(); // 6

// Sort by cost
wizard().sortByCost().get();

// Always available (no prerequisite)
wizard().alwaysAvailable().count(); // 5

// Find specific building
wizard().find("junimo-hut"); // Junimo Hut
wizard().findByName("Gold Clock");

// Inspect materials
wizard()
  .find("island-obelisk")
  ?.materials.forEach((m) => console.log(m.amount, m.itemName));
```

## Factory function

```ts
function wizard(source?: WizardBuilding[]): WizardQuery;
```

## Filter methods

| Method            | Returns     | Description                                      |
| ----------------- | ----------- | ------------------------------------------------ |
| alwaysAvailable() | WizardQuery | Buildings with no special availability condition |

## Sort methods

| Method             | Returns     | Description                       |
| ------------------ | ----------- | --------------------------------- |
| sortByCost(order?) | WizardQuery | Sort by build cost (default: asc) |
| sortByName(order?) | WizardQuery | Sort by name alphabetically       |

## Terminal methods

| Method           | Returns                     | Description                        |
| ---------------- | --------------------------- | ---------------------------------- |
| get()            | WizardBuilding[]            | All buildings in the current query |
| first()          | WizardBuilding \| undefined | First building                     |
| find(id)         | WizardBuilding \| undefined | Find by building ID                |
| findByName(name) | WizardBuilding \| undefined | Find by name (case-insensitive)    |
| count()          | number                      | Number of buildings                |

## Examples

```ts
// All obelisks sorted by cost
wizard()
  .get()
  .filter((b) => b.name.includes("Obelisk"))
  .sort((a, b) => a.buildCost - b.buildCost);

// Gold Clock (no materials needed)
wizard().findByName("Gold Clock")?.materials; // []
```

## WizardBuilding fields

| Field        | Type                     | Description                              |
| ------------ | ------------------------ | ---------------------------------------- |
| id           | string                   | Unique slug identifier                   |
| name         | string                   | Display name                             |
| buildCost    | number                   | Gold cost to construct                   |
| materials    | WizardBuildingMaterial[] | Additional items required                |
| description  | string                   | Building description                     |
| image        | string                   | Image path                               |
| availability | string?                  | Unlock condition if not always available |

## WizardBuildingMaterial fields

| Field    | Type   | Description                      |
| -------- | ------ | -------------------------------- |
| itemId   | string | Game item ID of the material     |
| itemName | string | Display name of the material     |
| amount   | number | Quantity required                |
| image    | string | Image path for the material item |

## Buildings

| Name           | Cost        | Availability                 |
| -------------- | ----------- | ---------------------------- |
| Junimo Hut     | 20,000g     | Always                       |
| Earth Obelisk  | 500,000g    | Always                       |
| Water Obelisk  | 500,000g    | Always                       |
| Desert Obelisk | 1,000,000g  | Always                       |
| Island Obelisk | 1,000,000g  | After visiting Ginger Island |
| Gold Clock     | 10,000,000g | Always                       |
