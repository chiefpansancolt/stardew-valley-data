# saloon

Query items sold at The Stardrop Saloon by Gus. Includes food and drink items and cooking recipes.
Note: The rotating "Dish of the Day" changes daily and is not included in this dataset.

## Usage

```ts
import { saloon } from "stardew-valley-data";

// All items
saloon().count(); // 16

// Food & drink only
saloon().food().count(); // 7
saloon().food().sortByPrice().get();

// Recipes only
saloon().recipes().count(); // 9

// Always available items (no special conditions)
saloon().alwaysAvailable().count(); // 14

// Find specific item
saloon().find("346"); // Beer
saloon().findByName("Pizza");
```

## Factory function

```ts
function saloon(source?: SaloonItem[]): SaloonQuery;
```

## Filter methods

| Method               | Returns     | Description                                  |
| -------------------- | ----------- | -------------------------------------------- |
| food()               | SaloonQuery | Food and drink items only                    |
| recipes()            | SaloonQuery | Cooking recipe items only                    |
| byCategory(category) | SaloonQuery | Items matching the given category            |
| alwaysAvailable()    | SaloonQuery | Items with no special availability condition |

## Sort methods

| Method              | Returns     | Description                  |
| ------------------- | ----------- | ---------------------------- |
| sortByPrice(order?) | SaloonQuery | Sort by price (default: asc) |
| sortByName(order?)  | SaloonQuery | Sort by name alphabetically  |

## Terminal methods

| Method           | Returns                 | Description                      |
| ---------------- | ----------------------- | -------------------------------- |
| get()            | SaloonItem[]            | All items in the current query   |
| first()          | SaloonItem \| undefined | First item                       |
| find(id)         | SaloonItem \| undefined | Find by item ID                  |
| findByName(name) | SaloonItem \| undefined | Find by name (case-insensitive)  |
| count()          | number                  | Number of items in current query |

## Examples

```ts
// Cheapest food item
saloon().food().sortByPrice().first();
// → { name: "Bread", price: 120, ... }

// All recipes sorted by price
saloon().recipes().sortByPrice().get();

// Items with special availability conditions
saloon()
  .get()
  .filter((i) => i.availability !== undefined);
// → [Crab Cakes, Cookie Recipe]
```

## SaloonItem fields

| Field        | Type           | Description                                |
| ------------ | -------------- | ------------------------------------------ |
| id           | string         | Game item ID (Objects.json) or recipe slug |
| name         | string         | Display name                               |
| price        | number         | Purchase price in gold                     |
| description  | string         | Item description                           |
| image        | string         | Image path                                 |
| category     | SaloonCategory | Item category                              |
| availability | string?        | Purchase condition if not always available |

## SaloonCategory values

| Value    | Description                   |
| -------- | ----------------------------- |
| `food`   | Food and drink items          |
| `recipe` | Cooking recipes sold as items |
