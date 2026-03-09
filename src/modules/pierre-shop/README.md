# pierre

Query items sold at Pierre's General Store. Includes seeds (seasonal, some Year 2+), cooking
ingredients, farming supplies, fruit tree saplings, recipes, and special items. Note: Wallpaper and
Flooring rotate randomly each day and are not included in this dataset.

## Usage

```ts
import { pierre } from "stardew-valley-data";

// All items
pierre().count(); // 54

// Seeds only
pierre().seeds().count(); // 30

// Stock available in spring (permanent + spring seeds)
pierre().bySeason("spring").get();

// Year-round items
pierre().permanent().count();

// Only unconditionally available items (no special conditions)
pierre().alwaysAvailable().count();

// Cheapest spring seed
pierre().seeds().bySeason("spring").sortByPrice().first();
// → { name: "Parsnip Seeds", price: 20, seasons: ["spring"], ... }

// Find specific item
pierre().find("479"); // Melon Seeds
pierre().findByName("Blueberry Seeds");
```

## Factory function

```ts
function pierre(source?: PierreItem[]): PierreQuery;
```

## Filter methods

| Method               | Returns     | Description                                                |
| -------------------- | ----------- | ---------------------------------------------------------- |
| bySeason(season)     | PierreQuery | Items available in the given season (permanent + seasonal) |
| permanent()          | PierreQuery | Year-round stock only (no seasonal seeds)                  |
| seeds()              | PierreQuery | Seasonal seed stock only                                   |
| saplings()           | PierreQuery | Fruit tree saplings only                                   |
| ingredients()        | PierreQuery | Cooking ingredients only                                   |
| fertilizers()        | PierreQuery | Fertilizers and farming supplies only                      |
| recipes()            | PierreQuery | Recipe items only                                          |
| byCategory(category) | PierreQuery | Items matching the given category                          |
| alwaysAvailable()    | PierreQuery | Items with no special availability condition               |

## Sort methods

| Method              | Returns     | Description                  |
| ------------------- | ----------- | ---------------------------- |
| sortByPrice(order?) | PierreQuery | Sort by price (default: asc) |
| sortByName(order?)  | PierreQuery | Sort by name alphabetically  |

## Terminal methods

| Method           | Returns                 | Description                      |
| ---------------- | ----------------------- | -------------------------------- |
| get()            | PierreItem[]            | All items in the current query   |
| first()          | PierreItem \| undefined | First item                       |
| find(id)         | PierreItem \| undefined | Find by item ID                  |
| findByName(name) | PierreItem \| undefined | Find by name (case-insensitive)  |
| count()          | number                  | Number of items in current query |

## Examples

```ts
// All summer seeds sorted by price
pierre().seeds().bySeason("summer").sortByPrice().get();

// Multi-season seeds
pierre()
  .seeds()
  .get()
  .filter((i) => i.seasons.length > 1);
// → [Wheat Seeds (summer+fall), Corn Seeds (summer+fall), Sunflower Seeds (summer+fall)]

// Year 2+ items only
pierre()
  .get()
  .filter((i) => i.availability === "Year 2+");

// Most expensive saplings
pierre().saplings().sortByPrice("desc").get();
// → [Peach Sapling (6000g), Pomegranate Sapling (6000g), ...]
```

## PierreItem fields

| Field        | Type           | Description                                                    |
| ------------ | -------------- | -------------------------------------------------------------- |
| id           | string         | Game item ID (Objects.json, BigCraftables.json, or slug)       |
| name         | string         | Display name                                                   |
| price        | number         | Purchase price in gold                                         |
| description  | string         | Item description                                               |
| image        | string         | Image path                                                     |
| seasons      | Season[]       | Seasons when available; empty array means permanent/year-round |
| category     | PierreCategory | Item category                                                  |
| availability | string?        | Purchase condition if not always available                     |

## PierreCategory values

| Value        | Description                            |
| ------------ | -------------------------------------- |
| `seed`       | Seasonal crop seeds                    |
| `sapling`    | Fruit tree saplings                    |
| `ingredient` | Cooking ingredients (Sugar, Oil, etc.) |
| `fertilizer` | Fertilizers, retaining soil, speed-gro |
| `recipe`     | Craftable recipes sold as items        |
| `special`    | Catalogue, Bouquet, backpack upgrades  |
