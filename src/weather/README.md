# weather

Weather types for Stardew Valley.

## Usage

```ts
import { weather } from "stardew-valley-data";
```

## Factory function

```ts
weather(source?: Weather[]): WeatherQuery
```

## Methods

### Filter methods (chainable)

| Method             | Returns        | Description                                           |
| ------------------ | -------------- | ----------------------------------------------------- |
| `bySeason(season)` | `WeatherQuery` | Weather that can occur in a given season              |
| `watersCrops()`    | `WeatherQuery` | Weather that automatically waters crops               |
| `special()`        | `WeatherQuery` | Special/event weather (festival, wedding, green rain) |

### Terminal methods

| Method             | Returns                | Description                       |
| ------------------ | ---------------------- | --------------------------------- |
| `get()`            | `Weather[]`            | All matching weather entries      |
| `first()`          | `Weather \| undefined` | First matching entry              |
| `find(id)`         | `Weather \| undefined` | Lookup by exact ID                |
| `findByName(name)` | `Weather \| undefined` | Lookup by name (case-insensitive) |
| `count()`          | `number`               | Total number of matching entries  |

## Examples

```ts
// All weather types
weather().get();

// Weather that can occur in summer
weather().bySeason("summer").get();

// Weather that waters crops
weather().watersCrops().get();
// [Rain, Storm, Green Rain]

// Special/event weather only
weather().special().get();
// [Green Rain, Festival, Wedding]

// Lookup by ID
weather().find("storm");
// { id: 'storm', name: 'Storm', ... }
```

## Weather types

| ID            | Name          | Seasons              | Waters Crops | Special |
| ------------- | ------------- | -------------------- | ------------ | ------- |
| `sunny`       | Sunny         | All                  | No           | No      |
| `rain`        | Rain          | Spring, Summer, Fall | Yes          | No      |
| `storm`       | Storm         | Spring, Summer, Fall | Yes          | No      |
| `snow`        | Snow          | Winter               | No           | No      |
| `wind-spring` | Wind (Spring) | Spring               | No           | No      |
| `wind-fall`   | Wind (Fall)   | Fall                 | No           | No      |
| `green-rain`  | Green Rain    | Summer               | Yes          | Yes     |
| `festival`    | Festival      | All                  | No           | Yes     |
| `wedding`     | Wedding       | All                  | No           | Yes     |

## Fields

| Field       | Type       | Notes                                               |
| ----------- | ---------- | --------------------------------------------------- |
| id          | string     | Kebab-case identifier                               |
| name        | string     | Display name                                        |
| description | string     | In-game TV forecast text                            |
| seasons     | `Season[]` | Seasons in which this weather can occur             |
| image       | string     | Path to weather icon image                          |
| watersCrops | boolean    | Whether this weather automatically waters all crops |
| special     | boolean    | Whether this is a special/event weather type        |
