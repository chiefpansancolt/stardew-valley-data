# dwarf-shop

Query items sold by the Dwarf in the Eastern Cave of The Mines. All 11 items are permanently
available in gold. Requires donating all 4 Dwarvish Scrolls to the museum to unlock the Dwarvish
language before the Dwarf can be spoken to.

## Usage

```ts
import { dwarfShop } from "stardew-valley-data";

// All items sorted cheapest first
dwarfShop().sortByPrice().get();

// Explosives only
dwarfShop().explosives().get();
// → [Cherry Bomb (450g), Bomb (1000g), Mega Bomb (1600g)]

// Crafting recipes
dwarfShop().recipes().get();
// → [Weathered Floor (500g), Big Stone Chest (5000g)]
```

## Factory function

```ts
function dwarfShop(source?: DwarfShopItem[]): DwarfShopQuery;
```

## Filter methods

| Method          | Returns        | Description                  |
| --------------- | -------------- | ---------------------------- |
| byCategory(cat) | DwarfShopQuery | Filter by category           |
| explosives()    | DwarfShopQuery | Cherry Bomb, Bomb, Mega Bomb |
| consumables()   | DwarfShopQuery | Life Elixir, Oil of Garlic   |
| recipes()       | DwarfShopQuery | Crafting recipe items        |

## Sort methods

| Method              | Returns        | Description                  |
| ------------------- | -------------- | ---------------------------- |
| sortByPrice(order?) | DwarfShopQuery | Sort by price (default: asc) |
| sortByName(order?)  | DwarfShopQuery | Sort by name alphabetically  |

## Terminal methods

| Method           | Returns                    | Description                     |
| ---------------- | -------------------------- | ------------------------------- |
| get()            | DwarfShopItem[]            | All items in the current query  |
| first()          | DwarfShopItem \| undefined | First item                      |
| find(id)         | DwarfShopItem \| undefined | Find by item ID                 |
| findByName(name) | DwarfShopItem \| undefined | Find by name (case-insensitive) |
| count()          | number                     | Number of items                 |

## Examples

```ts
// All items sorted cheapest first
dwarfShop().sortByPrice().get();

// Explosives only
dwarfShop().explosives().get();

// Most expensive item
dwarfShop().sortByPrice("desc").first();
// → Big Stone Chest (Recipe) — 5,000g
```

## Stock (11 items — all permanent)

| Name                   | Price  | Category   |
| ---------------------- | ------ | ---------- |
| Stone Cairn            | 200g   | decoration |
| Cherry Bomb            | 450g   | explosive  |
| Weathered Floor        | 500g   | recipe     |
| Miner's Treat          | 1,000g | food       |
| Bomb                   | 1,000g | explosive  |
| Mega Bomb              | 1,600g | explosive  |
| Life Elixir            | 2,000g | consumable |
| Rarecrow #6            | 2,500g | scarecrow  |
| Oil of Garlic          | 3,000g | consumable |
| Dwarvish Safety Manual | 4,000g | book       |
| Big Stone Chest        | 5,000g | recipe     |

## DwarfShopItem fields

| Field       | Type              | Description      |
| ----------- | ----------------- | ---------------- |
| id          | string            | Game item ID     |
| name        | string            | Display name     |
| description | string            | Item description |
| price       | number            | Price in gold    |
| image       | string            | Image path       |
| category    | DwarfShopCategory | Item category    |

## DwarfShopCategory values

`"explosive"` | `"food"` | `"consumable"` | `"recipe"` | `"decoration"` | `"scarecrow"` | `"book"`
