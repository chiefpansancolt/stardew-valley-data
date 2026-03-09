# volcano-shop

Query items sold at the Dwarf's shop in the Volcano Dungeon on Ginger Island. Items use mixed
currencies: most cost gold, but the Cinderclown Shoes cost Cinder Shards and The Diamond Hunter
costs Diamonds.

Note: Requires the Dwarvish Translation Guide to trade with the Dwarf.

## Usage

```ts
import { volcanoShop } from "stardew-valley-data";

// All items
volcanoShop().count(); // 10

// Gold items sorted by price
volcanoShop().goldItems().sortByPrice().get();

// Items paid with Cinder Shards
volcanoShop().cinderShardItems().get(); // [Cinderclown Shoes]

// Items paid with Diamonds
volcanoShop().diamondItems().get(); // [The Diamond Hunter]

// Food items
volcanoShop().food().get(); // [Roots Platter, Super Meal, Ginger Ale]

// Find specific item
volcanoShop().find("286"); // Cherry Bomb
volcanoShop().findByName("Pink Bow");
```

## Factory function

```ts
function volcanoShop(source?: VolcanoShopItem[]): VolcanoShopQuery;
```

## Filter methods

| Method               | Returns          | Description                              |
| -------------------- | ---------------- | ---------------------------------------- |
| byCurrency(currency) | VolcanoShopQuery | Filter by VolcanoShopCurrency            |
| goldItems()          | VolcanoShopQuery | Items purchased with gold only           |
| cinderShardItems()   | VolcanoShopQuery | Items purchased with Cinder Shards only  |
| diamondItems()       | VolcanoShopQuery | Items purchased with Diamonds only       |
| byCategory(cat)      | VolcanoShopQuery | Filter by VolcanoShopCategory            |
| consumables()        | VolcanoShopQuery | Consumable items only                    |
| food()               | VolcanoShopQuery | Food items only                          |
| alwaysAvailable()    | VolcanoShopQuery | Items with no special purchase condition |

## Sort methods

| Method              | Returns          | Description                  |
| ------------------- | ---------------- | ---------------------------- |
| sortByPrice(order?) | VolcanoShopQuery | Sort by price (default: asc) |
| sortByName(order?)  | VolcanoShopQuery | Sort by name alphabetically  |

## Terminal methods

| Method           | Returns                      | Description                      |
| ---------------- | ---------------------------- | -------------------------------- |
| get()            | VolcanoShopItem[]            | All items in the current query   |
| first()          | VolcanoShopItem \| undefined | First item                       |
| find(id)         | VolcanoShopItem \| undefined | Find by item ID                  |
| findByName(name) | VolcanoShopItem \| undefined | Find by name (case-insensitive)  |
| count()          | number                       | Number of items in current query |

## Examples

```ts
// All gold items sorted cheapest first
volcanoShop().goldItems().sortByPrice().get();

// The one-time purchase book
volcanoShop().diamondItems().first(); // The Diamond Hunter — 10 Diamonds, once per save

// Bombs only
volcanoShop()
  .consumables()
  .get()
  .filter((i) => i.name.includes("Bomb"));
```

## VolcanoShopItem fields

| Field        | Type                | Description                                |
| ------------ | ------------------- | ------------------------------------------ |
| id           | string              | Game item ID                               |
| name         | string              | Display name                               |
| price        | number              | Cost amount (in the given currency)        |
| currency     | VolcanoShopCurrency | Currency type for this item                |
| description  | string              | Item description                           |
| image        | string              | Image path                                 |
| category     | VolcanoShopCategory | Item category                              |
| availability | string?             | Purchase condition if not always available |

## VolcanoShopCurrency values

`"gold"` | `"cinder-shard"` | `"diamond"`

## VolcanoShopCategory values

`"footwear"` | `"book"` | `"consumable"` | `"hat"` | `"food"`
