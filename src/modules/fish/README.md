# Fish

All catchable fish in Stardew Valley — rod fish, crab pot catches, and foraged water items. 74 fish
are included.

---

## Type

### `Fish`

| Field       | Type          | Description                                       |
| ----------- | ------------- | ------------------------------------------------- |
| id          | string        | Game-internal ID from Objects.json                |
| name        | string        | Display name                                      |
| description | string        | Flavour text shown in-game                        |
| catchType   | FishCatchType | `'rod'` or `'crab-pot'`                           |
| seasons     | Season[]      | Seasons when this fish can be caught              |
| location    | string        | Where to catch it                                 |
| weather     | FishWeather?  | `'sunny'`, `'rainy'`, or `'both'` (rod fish only) |
| time        | string?       | Time window e.g. `"6:00 AM – 8:00 PM"` (rod only) |
| difficulty  | number?       | Catch difficulty 5–110 (rod fish only)            |
| sellPrice   | number        | Base sell price in gold                           |
| usedIn      | string[]      | Cooking recipes and Community Center bundles      |
| image       | string        | Path to the item's icon                           |

`FishCatchType` is `'rod' | 'crab-pot'`.

`FishWeather` is `'sunny' | 'rainy' | 'both'`.

`Season` is `'spring' | 'summer' | 'fall' | 'winter' | 'ginger island'`.

Crab-pot fish have no `weather`, `time`, or `difficulty` fields. They are available all year.

---

## Factory

```ts
import { fish } from "stardew-valley-data";

fish(); // all 74 fish
fish(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.bySeason(season: Season)`

Filter to fish available in the given season.

```ts
fish().bySeason("summer").get();
```

#### `.byCatchType(type: FishCatchType)`

Filter to rod fish or crab-pot catches.

```ts
fish().byCatchType("rod").get();
fish().byCatchType("crab-pot").get();
```

#### `.byWeather(weather: 'sunny' | 'rainy' | 'both')`

Filter to fish that spawn in the given weather condition.

```ts
fish().byWeather("rainy").get();
```

#### `.byLocation(location: string)`

Filter to fish whose location contains the given string (case-insensitive).

```ts
fish().byLocation("ocean").get();
fish().byLocation("mines").get();
```

### Sorts

#### `.sortByName(order?: 'asc' | 'desc')`

Sort alphabetically by name. Defaults to `'asc'`.

#### `.sortBySellPrice(order?: 'asc' | 'desc')`

Sort by sell price. Defaults to `'desc'` (most valuable first).

#### `.sortByDifficulty(order?: 'asc' | 'desc')`

Sort by catch difficulty. Defaults to `'desc'` (hardest first). Crab-pot fish (no difficulty) sort
as 0.

---

### Terminal methods

| Method              | Returns             | Description                 |
| ------------------- | ------------------- | --------------------------- |
| `.get()`            | `Fish[]`            | All results                 |
| `.first()`          | `Fish \| undefined` | First result                |
| `.find(id)`         | `Fish \| undefined` | Find by `id`                |
| `.findByName(name)` | `Fish \| undefined` | Case-insensitive name match |
| `.count()`          | `number`            | Number of results           |

---

## Examples

```ts
import { fish } from "stardew-valley-data";

// All summer fish sorted by sell price
fish().bySeason("summer").sortBySellPrice().get();

// Hardest fish to catch
fish().sortByDifficulty().first();
// Legend — difficulty 110

// All rainy weather fish in spring
fish().bySeason("spring").byWeather("rainy").get();

// All crab pot catches
fish().byCatchType("crab-pot").sortByName().get();

// Fish found in the mines
fish().byLocation("mines").sortByName().get();

// Look up by id
fish().find("163");
// { id: '163', name: 'Legend', difficulty: 110, sellPrice: 5000, ... }
```
