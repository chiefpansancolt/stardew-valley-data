# seasons

Season data for Stardew Valley, including festivals per season.

## Usage

```ts
import { findFestival, seasons } from "stardew-valley-data";
```

## Factory function

```ts
seasons(source?: SeasonData[]): SeasonQuery
```

## Methods

### Filter methods (chainable)

| Method            | Returns       | Description                 |
| ----------------- | ------------- | --------------------------- |
| `withFestivals()` | `SeasonQuery` | Seasons that have festivals |

### Terminal methods

| Method             | Returns                   | Description                       |
| ------------------ | ------------------------- | --------------------------------- |
| `get()`            | `SeasonData[]`            | All seasons                       |
| `first()`          | `SeasonData \| undefined` | First season                      |
| `find(id)`         | `SeasonData \| undefined` | Lookup by id (`'spring'`, etc.)   |
| `findByName(name)` | `SeasonData \| undefined` | Lookup by name (case-insensitive) |
| `count()`          | `number`                  | Number of seasons                 |

## Helper functions

```ts
findFestival(name: string): { season: SeasonData; festival: Festival }[]
```

Case-insensitive substring search across all festivals in all seasons.

## Examples

```ts
// All seasons
seasons().get();

// Lookup by ID
seasons().find("winter");
// { id: 'winter', name: 'Winter', totalDays: 28, festivals: [...] }

// All festivals in summer
seasons().find("summer")?.festivals;

// Find a festival by name
findFestival("egg");
// [{ season: { id: 'spring', ... }, festival: { name: 'Egg Festival', startDay: 13, endDay: 13, ... } }]

findFestival("night market");
// [{ season: { id: 'winter', ... }, festival: { name: 'Night Market', startDay: 15, endDay: 17, ... } }]
```

## Festivals

### Spring

| Name            | Days  |
| --------------- | ----- |
| Egg Festival    | 13    |
| Desert Festival | 15–17 |
| Flower Dance    | 24    |

### Summer

| Name                           | Days  |
| ------------------------------ | ----- |
| Luau                           | 11    |
| Trout Derby                    | 20–21 |
| Dance of the Moonlight Jellies | 28    |

### Fall

| Name                | Days |
| ------------------- | ---- |
| Stardew Valley Fair | 16   |
| Spirit's Eve        | 27   |

### Winter

| Name                     | Days  |
| ------------------------ | ----- |
| Festival of Ice          | 8     |
| SquidFest                | 12–13 |
| Night Market             | 15–17 |
| Feast of the Winter Star | 25    |

## Fields

### SeasonData

| Field     | Type       | Notes                                           |
| --------- | ---------- | ----------------------------------------------- |
| id        | string     | `'spring'`, `'summer'`, `'fall'`, or `'winter'` |
| name      | string     | Display name                                    |
| totalDays | number     | Always 28                                       |
| image     | string     | Path to season image                            |
| festivals | Festival[] | Festivals occurring in this season              |

### Festival

| Field    | Type   | Notes                                             |
| -------- | ------ | ------------------------------------------------- |
| name     | string | Festival display name                             |
| startDay | number | First day of the festival                         |
| endDay   | number | Last day (same as startDay for single-day events) |
| image    | string | Path to festival image                            |
