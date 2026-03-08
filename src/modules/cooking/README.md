# cooking

All cooked dishes in Stardew Valley. 81 dishes are included.

## Usage

```ts
import { cooking } from "stardew-valley-data";
```

## Factory function

```ts
cooking(source?: CookedDish[]): CookingQuery
```

Passing a custom `source` array lets you operate on a pre-filtered subset.

## Filter methods

| Method                         | Description                                     |
| ------------------------------ | ----------------------------------------------- |
| `withIngredient(ingredientId)` | Dishes that require a specific ingredient by ID |

## Sort methods

| Method                    | Description                                   |
| ------------------------- | --------------------------------------------- |
| `sortByName(order?)`      | Sort alphabetically by name. Default: `'asc'` |
| `sortBySellPrice(order?)` | Sort by sell price. Default: `'desc'`         |
| `sortByEnergy(order?)`    | Sort by energy restored. Default: `'desc'`    |

## Terminal methods

| Method             | Returns                   | Description                     |
| ------------------ | ------------------------- | ------------------------------- |
| `get()`            | `CookedDish[]`            | All results                     |
| `first()`          | `CookedDish \| undefined` | First result                    |
| `find(id)`         | `CookedDish \| undefined` | Find by item ID                 |
| `findByName(name)` | `CookedDish \| undefined` | Find by name (case-insensitive) |
| `count()`          | `number`                  | Count of results                |

## Examples

```ts
// All dishes sorted by name
cooking().sortByName().get();

// Most valuable dish
cooking().sortBySellPrice().first();

// Most energising dish
cooking().sortByEnergy().first();

// Dishes using Pumpkin (id "276")
cooking().withIngredient("276").get();

// Find by ID
cooking().find("194"); // Fried Egg

// Find by name
cooking().findByName("Pink Cake");
```

## CookedDish fields

| Field         | Type           | Notes                                                                       |
| ------------- | -------------- | --------------------------------------------------------------------------- |
| id            | string         | Game-internal ID from `Objects.json`                                        |
| name          | string         | Display name                                                                |
| description   | string         | Flavour text shown in-game                                                  |
| sellPrice     | number         | Base sell price in gold                                                     |
| energyHealth  | EnergyHealth   | Energy and health restored when eaten                                       |
| ingredients   | Ingredient[]   | Required ingredients                                                        |
| image         | string         | Path to the dish's icon                                                     |
| buffs         | CookingBuff[]  | Stat buffs granted when eaten (empty array if none)                         |
| buffDuration  | number \| null | Buff duration in real-world seconds; `null` if no buffs                     |
| recipeSources | RecipeSource[] | How to learn the recipe (friendship, skill, Queen of Sauce, purchase, etc.) |

## CookingBuff fields

| Field | Type   | Notes                                                             |
| ----- | ------ | ----------------------------------------------------------------- |
| stat  | string | Stat name (e.g. `'Farming'`, `'Speed'`, `'Max Energy'`, `'Luck'`) |
| value | number | Amount added to the stat                                          |

## RecipeSource variants

`RecipeSource` is a discriminated union on the `type` field:

| `type`             | Additional fields                                   | Description                                              |
| ------------------ | --------------------------------------------------- | -------------------------------------------------------- |
| `'default'`        | —                                                   | Known from the start (e.g. Fried Egg)                    |
| `'friendship'`     | `villager: string`, `hearts: number`                | Gifted by a villager at the specified heart level        |
| `'skill'`          | `skill: string`, `level: number`                    | Unlocked by reaching a skill level                       |
| `'queen-of-sauce'` | `season: Season`, `day: number`, `year: number`     | Aired on the Queen of Sauce TV show                      |
| `'purchase'`       | `from: string`, `price: number`, `currency: string` | Bought from a shop (`currency` is `'g'` or an item name) |
| `'cutscene'`       | `description: string`                               | Unlocked by a specific in-game cutscene                  |

## Ingredient fields

| Field    | Type   | Notes                                                                             |
| -------- | ------ | --------------------------------------------------------------------------------- |
| id       | string | Item ID (`"-4"` = Any Fish, `"-5"` = Any Egg, `"-6"` = Any Milk, `"Moss"` = Moss) |
| name     | string | Display name                                                                      |
| quantity | number | Amount required                                                                   |
