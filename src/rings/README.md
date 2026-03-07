# rings

Ring data for Stardew Valley.

## Usage

```ts
import { rings } from "stardew-valley-data";
```

## Factory function

```ts
rings(source?: Ring[]): RingQuery
```

---

## RingQuery

### Filter methods (chainable)

| Method                    | Returns     | Description                              |
| ------------------------- | ----------- | ---------------------------------------- |
| `craftable()`             | `RingQuery` | Rings that have crafting recipes         |
| `purchasable()`           | `RingQuery` | Rings available to buy from a shop       |
| `sortBySellPrice(order?)` | `RingQuery` | Sort by sell price (`'asc'` or `'desc'`) |

### Terminal methods

| Method             | Returns             | Description                       |
| ------------------ | ------------------- | --------------------------------- |
| `get()`            | `Ring[]`            | All matching rings                |
| `first()`          | `Ring \| undefined` | First matching ring               |
| `find(id)`         | `Ring \| undefined` | Lookup by ID (e.g. `'527'`)       |
| `findByName(name)` | `Ring \| undefined` | Lookup by name (case-insensitive) |
| `count()`          | `number`            | Number of matching rings          |

---

## Examples

```ts
// All rings
rings().get();

// Craftable rings only
rings().craftable().get();

// Rings purchasable from Adventurer's Guild
rings().purchasable().get();

// Most valuable ring
rings().sortBySellPrice("desc").first();

// Look up a specific ring
rings().find("527");
// { id: '527', name: 'Iridium Band', sellPrice: 1000, ... }

rings().findByName("ruby ring");
// { id: '534', name: 'Ruby Ring', sellPrice: 300, ... }

// Count craftable rings
rings().craftable().count();
```

---

## Ring fields

| Field         | Type                           | Notes                                                             |
| ------------- | ------------------------------ | ----------------------------------------------------------------- |
| id            | string                         | Game object ID                                                    |
| name          | string                         | Display name                                                      |
| description   | string                         | Effect description                                                |
| sellPrice     | number                         | Base sell price in gold                                           |
| image         | string                         | Path to ring image                                                |
| craftingLevel | number or null                 | Skill level required to craft; null if not craftable via leveling |
| craftingSkill | `'combat' \| 'mining' \| null` | Which skill unlocks the recipe                                    |
| ingredients   | `Ingredient[]`                 | Crafting ingredients; empty if not craftable                      |
| purchasePrice | number or null                 | Shop purchase price; null if not sold in shops                    |
| sources       | `string[]`                     | Where to obtain the ring                                          |
