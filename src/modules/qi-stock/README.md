# qi-stock

Query items available in Qi's Walnut Room shop. Includes consumables, equipment, furniture, crafting
recipe unlocks, and the Golden Walnut → Qi Gem exchange.

## Usage

```ts
import { qiStock } from "stardew-valley-data";

// All shop entries
qiStock().count(); // 27

// Filter by currency
qiStock().byCurrency("qi-gem").count(); // 26
qiStock().byCurrency("golden-walnut").count(); // 1

// Filter by type
qiStock().recipes().get(); // recipe unlocks only
qiStock().items().get(); // non-recipe items only

// Only always-available items (no special unlock condition)
qiStock().alwaysAvailable().count();

// Sort by cost
qiStock().byCurrency("qi-gem").sortByCost().get();

// Find specific item
qiStock().find("911"); // Horse Flute by ID
qiStock().findByName("Galaxy Soul");

// Chain
qiStock().items().byCurrency("qi-gem").sortByCost().get();
```

## Factory function

```ts
function qiStock(source?: QiStockItem[]): QiStockQuery;
```

## Filter methods

| Method               | Returns      | Description                                  |
| -------------------- | ------------ | -------------------------------------------- |
| byCurrency(currency) | QiStockQuery | Filter by "qi-gem" or "golden-walnut"        |
| recipes()            | QiStockQuery | Recipe unlock entries only                   |
| items()              | QiStockQuery | Non-recipe entries only                      |
| alwaysAvailable()    | QiStockQuery | Items with no special availability condition |

## Sort methods

| Method             | Returns      | Description                 |
| ------------------ | ------------ | --------------------------- |
| sortByCost(order?) | QiStockQuery | Sort by cost (default: asc) |
| sortByName(order?) | QiStockQuery | Sort by name alphabetically |

## Terminal methods

| Method           | Returns                  | Description                      |
| ---------------- | ------------------------ | -------------------------------- |
| get()            | QiStockItem[]            | All items in the current query   |
| first()          | QiStockItem \| undefined | First item                       |
| find(id)         | QiStockItem \| undefined | Find by item ID                  |
| findByName(name) | QiStockItem \| undefined | Find by name (case-insensitive)  |
| count()          | number                   | Number of items in current query |

## Examples

```ts
// All recipe unlocks sorted by cost
const recipes = qiStock().recipes().sortByCost().get();
// → [Heavy Tapper Recipe (20), Deluxe Fertilizer Recipe (20), Magic Bait Recipe (20), ...]

// Most expensive items
qiStock().sortByCost("desc").first();
// → { name: "Golden Egg", cost: 100, currency: "qi-gem", ... }

// Items available only under special conditions
qiStock()
  .get()
  .filter((item) => item.availability !== undefined);
// → [Qi Gem (after island upgrade), Golden Egg (after perfection)]

// Horse Flute details
qiStock().find("911");
// → { id: "911", name: "Horse Flute", cost: 50, currency: "qi-gem", quantity: 1, ... }
```

## QiStockItem fields

| Field        | Type       | Description                                                  |
| ------------ | ---------- | ------------------------------------------------------------ |
| id           | string     | Game item ID or slug (e.g. "911", "recipe-heavy-tapper")     |
| name         | string     | Display name of the shop entry                               |
| cost         | number     | Cost in the given currency                                   |
| currency     | QiCurrency | "qi-gem" or "golden-walnut"                                  |
| quantity     | number     | Items received per purchase (1 unless sold in bulk)          |
| description  | string     | Item description                                             |
| image        | string     | Image path                                                   |
| isRecipe     | boolean    | True when this entry unlocks a crafting recipe               |
| availability | string?    | Condition for availability if not always present in the shop |
| note         | string?    | Extra purchase notes (e.g. first-purchase requirements)      |

## QiCurrency

```ts
type QiCurrency = "qi-gem" | "golden-walnut";
```
