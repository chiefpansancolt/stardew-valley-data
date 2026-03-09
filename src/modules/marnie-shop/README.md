# marnie

Query items sold at Marnie's Ranch. Includes animal supplies, tools, furniture, and special items.

## Usage

```ts
import { marnie } from "stardew-valley-data";

// All items
marnie().count(); // 14

// Animal supply items
marnie().animalSupplies().sortByPrice().get(); // [Hay, Heater, Auto-Grabber]

// Tools (one-time purchases)
marnie().tools().get(); // [Milk Pail, Shears]

// Furniture and decor
marnie().furniture().count(); // 7

// Always available (no conditions)
marnie().alwaysAvailable().sortByPrice().get();

// Find specific item
marnie().find("928"); // Golden Egg
marnie().findByName("Auto-Grabber");
```

## Factory function

```ts
function marnie(source?: MarnieItem[]): MarnieQuery;
```

## Filter methods

| Method            | Returns     | Description                              |
| ----------------- | ----------- | ---------------------------------------- |
| animalSupplies()  | MarnieQuery | Hay, Heater, and Auto-Grabber only       |
| tools()           | MarnieQuery | Milk Pail and Shears only                |
| furniture()       | MarnieQuery | Furniture and decor items only           |
| byCategory(cat)   | MarnieQuery | Filter by MarnieCategory                 |
| alwaysAvailable() | MarnieQuery | Items with no special purchase condition |

## Sort methods

| Method              | Returns     | Description                  |
| ------------------- | ----------- | ---------------------------- |
| sortByPrice(order?) | MarnieQuery | Sort by price (default: asc) |
| sortByName(order?)  | MarnieQuery | Sort by name alphabetically  |

## Terminal methods

| Method           | Returns                 | Description                      |
| ---------------- | ----------------------- | -------------------------------- |
| get()            | MarnieItem[]            | All items in the current query   |
| first()          | MarnieItem \| undefined | First item                       |
| find(id)         | MarnieItem \| undefined | Find by item ID                  |
| findByName(name) | MarnieItem \| undefined | Find by name (case-insensitive)  |
| count()          | number                  | Number of items in current query |

## Examples

```ts
// Items that require conditions to purchase
marnie()
  .get()
  .filter((i) => i.availability !== undefined);
// → [Milk Pail, Shears, Auto-Grabber, Animal Catalogue, Cow Decal, Golden Egg]

// Furniture sorted by price
marnie().furniture().sortByPrice().get();
```

## MarnieItem fields

| Field        | Type           | Description                                |
| ------------ | -------------- | ------------------------------------------ |
| id           | string         | Game item ID                               |
| name         | string         | Display name                               |
| price        | number         | Purchase price in gold                     |
| description  | string         | Item description                           |
| image        | string         | Image path                                 |
| category     | MarnieCategory | Item category                              |
| availability | string?        | Purchase condition if not always available |

## MarnieCategory values

`"animal-supply"` | `"tool"` | `"furniture"` | `"catalogue"` | `"special"`
