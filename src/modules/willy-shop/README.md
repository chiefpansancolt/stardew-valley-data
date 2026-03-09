# willy

Query items sold at Willy's Fish Shop. Includes fishing rods, bait, tackle, equipment, recipes, and
furniture. Many items unlock at specific fishing levels.

Note: Seasonal specific bait (a random fish-specific bait rotating by season) is not included in
this dataset as it is drawn from a dynamic pool of 9–18 fish per season.

## Usage

```ts
import { willy } from "stardew-valley-data";

// All items
willy().count(); // 24

// Fishing rods
willy().rods().sortByPrice().get();

// Tackle items
willy().tackle().count(); // 9

// Items available at fishing level 6
willy().byFishingLevel(6).get();

// Find specific item
willy().find("TIridiumRod"); // Iridium Rod
willy().findByName("Copper Pan");
```

## Factory function

```ts
function willy(source?: WillyItem[]): WillyQuery;
```

## Filter methods

| Method                | Returns    | Description                                         |
| --------------------- | ---------- | --------------------------------------------------- |
| rods()                | WillyQuery | Fishing rods only                                   |
| bait()                | WillyQuery | Bait items only                                     |
| tackle()              | WillyQuery | Tackle items only                                   |
| byCategory(cat)       | WillyQuery | Filter by WillyCategory                             |
| byFishingLevel(level) | WillyQuery | Items available at or below the given fishing level |
| alwaysAvailable()     | WillyQuery | Items with no special purchase condition            |

## Sort methods

| Method                     | Returns    | Description                    |
| -------------------------- | ---------- | ------------------------------ |
| sortByPrice(order?)        | WillyQuery | Sort by price (default: asc)   |
| sortByName(order?)         | WillyQuery | Sort by name alphabetically    |
| sortByFishingLevel(order?) | WillyQuery | Sort by fishing level required |

## Terminal methods

| Method           | Returns                | Description                      |
| ---------------- | ---------------------- | -------------------------------- |
| get()            | WillyItem[]            | All items in the current query   |
| first()          | WillyItem \| undefined | First item                       |
| find(id)         | WillyItem \| undefined | Find by item ID                  |
| findByName(name) | WillyItem \| undefined | Find by name (case-insensitive)  |
| count()          | number                 | Number of items in current query |

## Examples

```ts
// All tackle sorted by price
willy().tackle().sortByPrice().get();

// What's available at fishing level 6
willy().byFishingLevel(6).sortByFishingLevel().get();

// Furniture items
willy().byCategory("furniture").get();
```

## WillyItem fields

| Field                | Type          | Description                                |
| -------------------- | ------------- | ------------------------------------------ |
| id                   | string        | Game item ID                               |
| name                 | string        | Display name                               |
| price                | number        | Purchase price in gold                     |
| description          | string        | Item description                           |
| image                | string        | Image path                                 |
| category             | WillyCategory | Item category                              |
| fishingLevelRequired | number?       | Minimum fishing level to purchase          |
| availability         | string?       | Purchase condition if not always available |

## WillyCategory values

`"rod"` | `"bait"` | `"tackle"` | `"equipment"` | `"recipe"` | `"furniture"`
