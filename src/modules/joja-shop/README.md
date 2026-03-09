# joja

Query items sold at JojaMart. Includes permanent stock (year-round) and seasonal seed stock. Note:
Wallpaper and Flooring rotate randomly each day and are not included in this dataset.

## Usage

```ts
import { joja } from "stardew-valley-data";

// All items
joja().count(); // 34

// Permanent stock (year-round)
joja().permanent().count(); // 9
joja().permanent().sortByPrice().get();

// Seeds only
joja().seeds().count(); // 25

// Stock available in a given season (permanent + that season's seeds)
joja().bySeason("spring").get();
joja().bySeason("summer").sortByPrice().get();

// Only unconditionally available items
joja().alwaysAvailable().count(); // 33 (excludes Auto-Petter)

// Find specific item
joja().find("167"); // Joja Cola
joja().findByName("Melon Seeds");
```

## Factory function

```ts
function joja(source?: JojaItem[]): JojaQuery;
```

## Filter methods

| Method            | Returns   | Description                                                |
| ----------------- | --------- | ---------------------------------------------------------- |
| bySeason(season)  | JojaQuery | Items available in the given season (permanent + seasonal) |
| permanent()       | JojaQuery | Year-round stock only (no seasonal seeds)                  |
| seeds()           | JojaQuery | Seasonal seed stock only                                   |
| alwaysAvailable() | JojaQuery | Items with no special availability condition               |

## Sort methods

| Method              | Returns   | Description                  |
| ------------------- | --------- | ---------------------------- |
| sortByPrice(order?) | JojaQuery | Sort by price (default: asc) |
| sortByName(order?)  | JojaQuery | Sort by name alphabetically  |

## Terminal methods

| Method           | Returns               | Description                      |
| ---------------- | --------------------- | -------------------------------- |
| get()            | JojaItem[]            | All items in the current query   |
| first()          | JojaItem \| undefined | First item                       |
| find(id)         | JojaItem \| undefined | Find by item ID                  |
| findByName(name) | JojaItem \| undefined | Find by name (case-insensitive)  |
| count()          | number                | Number of items in current query |

## Examples

```ts
// Cheapest spring seed
joja().seeds().bySeason("spring").sortByPrice().first();
// → { name: "Parsnip Seeds", price: 25, seasons: ["spring"], ... }

// All items available in summer (permanent + summer seeds)
joja().bySeason("summer").count(); // 9 permanent + summer seeds

// Multi-season seeds
joja()
  .seeds()
  .get()
  .filter((i) => i.seasons.length > 1);
// → [Wheat Seeds (summer+fall), Sunflower Seeds (summer+fall), Corn Seeds (summer+fall)]
```

## Permanent Stock

| Name                     | Price   | Notes                            |
| ------------------------ | ------- | -------------------------------- |
| Joja Wallpaper           | 20g     |                                  |
| Joja Cola                | 75g     |                                  |
| J. Cola Light            | 500g    | Furniture item                   |
| Grass Starter            | 125g    |                                  |
| Sugar                    | 125g    |                                  |
| Wheat Flour              | 125g    |                                  |
| Rice                     | 250g    |                                  |
| Joja Furniture Catalogue | 25,000g | Unlocks 40 Joja furniture pieces |
| Auto-Petter              | 50,000g | Requires Joja Warehouse route    |

## JojaItem fields

| Field        | Type     | Description                                                    |
| ------------ | -------- | -------------------------------------------------------------- |
| id           | string   | Game item ID (Objects, BigCraftables, or wallpaper index)      |
| name         | string   | Display name                                                   |
| price        | number   | Purchase price in gold                                         |
| description  | string   | Item description                                               |
| image        | string   | Image path                                                     |
| seasons      | Season[] | Seasons when available; empty array means permanent/year-round |
| availability | string?  | Purchase condition if not always available                     |
