# casino

Query items sold at Mr. Qi's Casino. All prices are in Qi Coins, not gold.

## Usage

```ts
import { casino } from "stardew-valley-data";

// All items
casino().count(); // 13

// Furniture items
casino().furniture().sortByPrice().get();

// Consumables
casino().consumables().get();

// Sorted by price (cheapest first)
casino().sortByPrice().get();

// Find specific item
casino().find("H2"); // Top Hat
casino().findByName("Rarecrow");
```

## Factory function

```ts
function casino(source?: CasinoItem[]): CasinoQuery;
```

## Filter methods

| Method          | Returns     | Description                         |
| --------------- | ----------- | ----------------------------------- |
| furniture()     | CasinoQuery | Furniture and decoration items only |
| consumables()   | CasinoQuery | Consumable items only               |
| byCategory(cat) | CasinoQuery | Filter by CasinoCategory            |

## Sort methods

| Method              | Returns     | Description                          |
| ------------------- | ----------- | ------------------------------------ |
| sortByPrice(order?) | CasinoQuery | Sort by Qi Coin price (default: asc) |
| sortByName(order?)  | CasinoQuery | Sort by name alphabetically          |

## Terminal methods

| Method           | Returns                 | Description                      |
| ---------------- | ----------------------- | -------------------------------- |
| get()            | CasinoItem[]            | All items in the current query   |
| first()          | CasinoItem \| undefined | First item                       |
| find(id)         | CasinoItem \| undefined | Find by item ID                  |
| findByName(name) | CasinoItem \| undefined | Find by name (case-insensitive)  |
| count()          | number                  | Number of items in current query |

## Examples

```ts
// Most expensive items first
casino().sortByPrice("desc").get();

// Cheapest items (fireworks, hardwood fence)
casino().sortByPrice().get().slice(0, 3);
```

## CasinoItem fields

| Field       | Type           | Description       |
| ----------- | -------------- | ----------------- |
| id          | string         | Game item ID      |
| name        | string         | Display name      |
| price       | number         | Price in Qi Coins |
| description | string         | Item description  |
| image       | string         | Image path        |
| category    | CasinoCategory | Item category     |

## CasinoCategory values

`"furniture"` | `"hat"` | `"scarecrow"` | `"consumable"` | `"decoration"`
