# maps

Query builder for Stardew Valley farm map data.

## Usage

```ts
import { maps } from "stardew-valley-data";
```

## Factory function

```ts
maps(source?: FarmMap[]): FarmMapQuery
```

Passing a custom `source` array lets you operate on a pre-filtered subset.

## Filter methods

All filter methods return a new `FarmMapQuery` and can be chained freely.

| Method           | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `bySkill(skill)` | Maps associated with the given skill (case-insensitive) |

## Terminal methods

| Method             | Returns                | Description                        |
| ------------------ | ---------------------- | ---------------------------------- |
| `get()`            | `FarmMap[]`            | All maps in the current query      |
| `first()`          | `FarmMap \| undefined` | First map in the current query     |
| `find(id)`         | `FarmMap \| undefined` | Find by farm ID                    |
| `findByName(name)` | `FarmMap \| undefined` | Find by name (case-insensitive)    |
| `count()`          | `number`               | Count of maps in the current query |

## Examples

```ts
// All farm maps
maps().get();

// Farming-skill maps
maps().bySkill("Farming").get();

// Find by game ID
maps().find("0"); // Standard
maps().find("MeadowlandsFarm");

// Find by name
maps().findByName("Beach");

// Count total farm types
maps().count();
```

## Farm IDs

| ID              | Name         |
| --------------- | ------------ |
| 0               | Standard     |
| 1               | Riverland    |
| 2               | Forest       |
| 3               | Hill-top     |
| 4               | Wilderness   |
| 5               | Four Corners |
| 6               | Beach        |
| MeadowlandsFarm | Meadowlands  |

## Farm map fields

| Field         | Type     | Notes                                     |
| ------------- | -------- | ----------------------------------------- |
| id            | string   | Game farm type ID                         |
| name          | string   |                                           |
| description   | string   |                                           |
| skills        | string[] | Associated skills (e.g. Farming, Fishing) |
| tillableTiles | number   | Total tillable tiles on the farm          |
| features      | string[] | Key unique characteristics                |
| startingItems | string[] | Items provided at farm creation           |
| image         | string   | Path to full farm map image               |
| icon          | string   | Path to farm map icon image               |
