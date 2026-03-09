# carpenter

Query items sold at Robin's Carpenter Shop. Includes building materials (Wood and Stone), crafting
recipes for floors, paths, lighting, and storage.

Note: The Carpenter Shop also sells rotating furniture sets (Oak/Walnut/Birch on
Monday/Tuesday/Wednesday) and random furniture on other days, which are not included in this dataset
due to their dynamic nature.

## Usage

```ts
import { carpenter } from "stardew-valley-data";

// All items
carpenter().count(); // 21

// Materials only
carpenter().materials().get(); // [Wood, Stone]

// Recipes only
carpenter().recipes().sortByPrice().get();

// Floor recipes
carpenter()
  .recipes()
  .get()
  .filter((i) => i.name.toLowerCase().includes("floor"));

// Find specific item
carpenter().find("BC152"); // Wood Lamp-post recipe
carpenter().findByName("Marble Brazier");
```

## Factory function

```ts
function carpenter(source?: CarpenterItem[]): CarpenterQuery;
```

## Filter methods

| Method            | Returns        | Description                                                         |
| ----------------- | -------------- | ------------------------------------------------------------------- |
| materials()       | CarpenterQuery | Wood and Stone only                                                 |
| recipes()         | CarpenterQuery | Crafting recipe items only                                          |
| byCategory(cat)   | CarpenterQuery | Filter by CarpenterCategory                                         |
| byDay(day)        | CarpenterQuery | Items available on the given day (permanent + that day's furniture) |
| permanent()       | CarpenterQuery | Always-available items (no day restriction)                         |
| alwaysAvailable() | CarpenterQuery | Items with no special purchase condition                            |

## Sort methods

| Method              | Returns        | Description                  |
| ------------------- | -------------- | ---------------------------- |
| sortByPrice(order?) | CarpenterQuery | Sort by price (default: asc) |
| sortByName(order?)  | CarpenterQuery | Sort by name alphabetically  |

## Terminal methods

| Method           | Returns                    | Description                      |
| ---------------- | -------------------------- | -------------------------------- |
| get()            | CarpenterItem[]            | All items in the current query   |
| first()          | CarpenterItem \| undefined | First item                       |
| find(id)         | CarpenterItem \| undefined | Find by item ID                  |
| findByName(name) | CarpenterItem \| undefined | Find by name (case-insensitive)  |
| count()          | number                     | Number of items in current query |

## Examples

```ts
// All lighting recipes sorted by price
carpenter()
  .recipes()
  .get()
  .filter((i) => i.name.includes("Brazier") || i.name.includes("Lamp"));

// Cheapest recipe
carpenter().recipes().sortByPrice().first(); // Wooden Brazier — 25g
```

## CarpenterItem fields

| Field        | Type              | Description                                |
| ------------ | ----------------- | ------------------------------------------ |
| id           | string            | Game item ID                               |
| name         | string            | Display name                               |
| price        | number            | Purchase price in gold                     |
| description  | string            | Item description                           |
| image        | string            | Image path                                 |
| category     | CarpenterCategory | Item category                              |
| day          | CarpenterDay?     | Day of week (rotating furniture only)      |
| isRecipe     | boolean           | Whether sold as a crafting recipe          |
| availability | string?           | Purchase condition if not always available |

## CarpenterCategory values

`"material"` | `"recipe"` | `"furniture"` | `"craftable"`

## CarpenterDay values

`"Monday"` | `"Tuesday"` | `"Wednesday"` | `"Thursday"` | `"Friday"` | `"Saturday"` | `"Sunday"`
