# buildings

Constructable building data for Stardew Valley. Covers 23 buildings built by Robin and the Wizard,
including upgrade chains (Coop → Big Coop → Deluxe Coop, etc.).

Farmhouse upgrades and renovations are in the separate `farmhouse` module.

## Usage

```ts
import { buildings } from "stardew-valley-data";

buildings().get();
buildings().byBuilder("Wizard").get();
buildings().base().sortByCost().get();
```

## Factory function

```ts
function buildings(source?: Building[]): BuildingQuery;
```

## Filter methods

| Method          | Returns       | Description                              |
| --------------- | ------------- | ---------------------------------------- |
| byBuilder(name) | BuildingQuery | Filter by builder ("Robin" or "Wizard")  |
| magical()       | BuildingQuery | Filter to magical buildings only         |
| upgrades()      | BuildingQuery | Filter to buildings that upgrade another |
| base()          | BuildingQuery | Filter to base buildings (not upgrades)  |

## Sort methods

| Method             | Returns       | Description                 |
| ------------------ | ------------- | --------------------------- |
| sortByCost(order?) | BuildingQuery | Sort by build cost          |
| sortByName(order?) | BuildingQuery | Sort alphabetically by name |

## Terminal methods

| Method           | Returns               | Description                     |
| ---------------- | --------------------- | ------------------------------- |
| get()            | Building[]            | All buildings in current query  |
| first()          | Building \| undefined | First building                  |
| find(id)         | Building \| undefined | Find by ID                      |
| findByName(name) | Building \| undefined | Find by name (case-insensitive) |
| count()          | number                | Number of buildings             |

## Examples

```ts
// All Robin buildings sorted by cost
buildings().byBuilder("Robin").sortByCost().get();

// Wizard (magical) buildings
buildings().magical().get();

// Base buildings only (no upgrades)
buildings().base().sortByName().get();

// Find the Deluxe Barn
buildings().find("deluxe-barn");

// All upgrade buildings
buildings().upgrades().get();
```

## Building fields

| Field       | Type               | Description                                  |
| ----------- | ------------------ | -------------------------------------------- |
| id          | string             | Kebab-case identifier (e.g. `'deluxe-coop'`) |
| name        | string             | Display name                                 |
| description | string             | Building description                         |
| builder     | BuildingBuilder    | "Robin" or "Wizard"                          |
| buildCost   | number             | Gold cost                                    |
| buildDays   | number             | Days to construct (0 = instant)              |
| materials   | BuildingMaterial[] | Required materials                           |
| upgradeFrom | string \| null     | ID of building this upgrades; `null` if base |
| magical     | boolean            | Whether this is a magical (Wizard) building  |
| image       | string             | Path to building image                       |

## BuildingMaterial fields

| Field    | Type   | Description                   |
| -------- | ------ | ----------------------------- |
| id       | string | Game object ID (e.g. `'388'`) |
| item     | string | Material name (e.g. `'Wood'`) |
| quantity | number | Amount needed                 |

## BuildingBuilder values

`"Robin"` | `"Wizard"`
