# krobus

Query items sold by Krobus in the Sewers. Includes permanent year-round stock and daily rotating
items (Monday–Sunday). Note: Wednesday (random fish) and Saturday (random cooked dish) rotate from a
large random pool and are not included in this dataset.

## Usage

```ts
import { krobus } from "stardew-valley-data";

// All items
krobus().count(); // 16

// Permanent stock
krobus().permanent().count(); // 11
krobus().permanent().sortByPrice().get();

// Daily rotating items
krobus().daily().count(); // 5
krobus().daily().get(); // [Slime, Omni Geode, Mixed Seeds, Iridium Sprinkler, Bat Wing]

// Everything available on a given day (permanent + that day's item)
krobus().byDay("Friday").get();
krobus().byDay("Monday").sortByPrice().get();

// Recipe items
krobus().recipes().get(); // [Crystal Floor Recipe, Wicked Statue Recipe]

// Find specific item
krobus().find("645"); // Iridium Sprinkler
krobus().findByName("Stardrop");
```

## Factory function

```ts
function krobus(source?: KrobusItem[]): KrobusQuery;
```

## Filter methods

| Method            | Returns     | Description                                              |
| ----------------- | ----------- | -------------------------------------------------------- |
| permanent()       | KrobusQuery | Year-round permanent stock only                          |
| daily()           | KrobusQuery | Daily rotating items only                                |
| byDay(day)        | KrobusQuery | All items available on the given day (permanent + daily) |
| recipes()         | KrobusQuery | Crafting/building recipe items only                      |
| alwaysAvailable() | KrobusQuery | Items with no special purchase condition                 |

## Sort methods

| Method              | Returns     | Description                  |
| ------------------- | ----------- | ---------------------------- |
| sortByPrice(order?) | KrobusQuery | Sort by price (default: asc) |
| sortByName(order?)  | KrobusQuery | Sort by name alphabetically  |

## Terminal methods

| Method           | Returns                 | Description                      |
| ---------------- | ----------------------- | -------------------------------- |
| get()            | KrobusItem[]            | All items in the current query   |
| first()          | KrobusItem \| undefined | First item                       |
| find(id)         | KrobusItem \| undefined | Find by item ID                  |
| findByName(name) | KrobusItem \| undefined | Find by name (case-insensitive)  |
| count()          | number                  | Number of items in current query |

## Examples

```ts
// What's available on Friday?
krobus().byDay("Friday").sortByPrice().get();
// → [...permanent items..., { name: "Iridium Sprinkler", price: 10000, day: "Friday" }]

// One-time purchase items
krobus()
  .get()
  .filter((i) => i.availability === "One-time purchase");
// → [Stardrop, Return Scepter]

// Daily items by stock limit (most limited first)
krobus().daily().sortByPrice().get();
```

## Daily Rotation

| Day       | Item               | Price   | Stock |
| --------- | ------------------ | ------- | ----- |
| Monday    | Slime              | 10g     | 50    |
| Tuesday   | Omni Geode         | 300g    | 1     |
| Wednesday | Random fish        | 200g    | 5     |
| Thursday  | Mixed Seeds        | 30g     | 10    |
| Friday    | Iridium Sprinkler  | 10,000g | 1     |
| Saturday  | Random cooked dish | varies  | 5     |
| Sunday    | Bat Wing           | 30g     | 10    |

Wednesday and Saturday items are random and not included in the dataset.

## KrobusItem fields

| Field        | Type            | Description                                                           |
| ------------ | --------------- | --------------------------------------------------------------------- |
| id           | string          | Game item ID (Objects.json, BigCraftables.json, or slug)              |
| name         | string          | Display name                                                          |
| price        | number          | Purchase price in gold                                                |
| description  | string          | Item description                                                      |
| image        | string          | Image path                                                            |
| stockType    | KrobusStockType | Whether this item is permanent or daily rotating                      |
| day          | KrobusDay?      | Day of week the item is available (daily items only)                  |
| stockLimit   | number          | Max quantity per day/occurrence; -1 = unlimited                       |
| isRecipe     | boolean         | True if sold as a crafting or building recipe                         |
| availability | string?         | Purchase condition if not always available (e.g. "One-time purchase") |

## KrobusStockType values

| Value       | Description                      |
| ----------- | -------------------------------- |
| `permanent` | Always in stock year-round       |
| `daily`     | Only available on a specific day |

## KrobusDay values

`"Monday"` | `"Tuesday"` | `"Thursday"` | `"Friday"` | `"Sunday"`
