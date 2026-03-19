# Forageables

Items found while foraging across Stardew Valley — seasonal ground spawns, beach items, cave items,
and special location finds. 32 forageables are included.

> Note: Tapper products (Maple Syrup, Oak Resin, Pine Tar, Mystic Syrup) are covered by the `trees`
> module rather than here.

---

## Type

### `Forageable`

| Field                      | Type          | Description                                                       |
| -------------------------- | ------------- | ----------------------------------------------------------------- |
| id                         | string        | Unique identifier (kebab-case)                                    |
| name                       | string        | Display name                                                      |
| description                | string        | Flavour text shown in-game                                        |
| seasons                    | Season[]      | Seasons when this item can be found                               |
| locations                  | string        | Where to find it                                                  |
| sellPrice                  | number        | Base sell price in gold                                           |
| energyHealth               | EnergyHealth? | Energy and health restored when eaten; omitted for inedible items |
| maxQuality                 | ItemQuality   | Highest quality tier achievable (`'base'` or `'iridium'`)         |
| artisanUses                | ArtisanUses   | Which artisan goods this forageable can produce                   |
| artisanUses.honey          | boolean       | Can influence Bee House honey                                     |
| artisanUses.wine           | boolean       | Can be processed in a Keg → Wine (fruits)                         |
| artisanUses.juice          | boolean       | Can be processed in a Keg → Juice (vegetables)                    |
| artisanUses.pickles        | boolean       | Can be processed in a Preserves Jar → Pickles (vegetables)        |
| artisanUses.jelly          | boolean       | Can be processed in a Preserves Jar → Jelly (fruits)              |
| artisanUses.driedMushrooms | boolean       | Can be processed in a Dehydrator → Dried Mushrooms (mushrooms)    |
| artisanUses.driedFruit     | boolean       | Can be processed in a Dehydrator → Dried Fruit (fruits)           |
| image                      | string        | Path to the item's icon                                           |

`Season` is `'spring' | 'summer' | 'fall' | 'winter' | 'ginger island'`.

Year-round items (Cave Carrot, Sap, Coconut, Ginger, Magma Cap) have all four regular seasons
listed.

---

## Factory

```ts
import { forageables } from "stardew-valley-data";

forageables(); // all 32 forageables
forageables(source); // wrap a pre-filtered Forageable[]
```

---

## Query methods

### Filters

#### `.bySeason(season: Season)`

Filter to items available in the given season.

```ts
forageables().bySeason("spring").get();
```

#### `.byArtisanUse(use: keyof ArtisanUses)`

Filter to forageables that can be used to produce the given artisan good.

Valid keys: `'honey'`, `'wine'`, `'juice'`, `'pickles'`, `'jelly'`, `'driedMushrooms'`,
`'driedFruit'`

```ts
forageables().byArtisanUse("wine").get();
// Blackberry, Coconut, Crystal Fruit, Grape, Ginger, Hazelnut, Salmonberry, Spice Berry, Wild Plum

forageables().byArtisanUse("driedMushrooms").get();
// Chanterelle, Common Mushroom, Magma Cap, Morel, Purple Mushroom, Red Mushroom
```

### Sorts

#### `.sortByName(order?: 'asc' | 'desc')`

Sort alphabetically by name. Defaults to `'asc'`.

```ts
forageables().sortByName().get();
```

#### `.sortBySellPrice(order?: 'asc' | 'desc')`

Sort by base sell price. Defaults to `'desc'` (highest first).

```ts
forageables().sortBySellPrice().get();
```

---

### Terminal methods

| Method              | Returns                   | Description                 |
| ------------------- | ------------------------- | --------------------------- |
| `.get()`            | `Forageable[]`            | All results                 |
| `.first()`          | `Forageable \| undefined` | First result                |
| `.find(id)`         | `Forageable \| undefined` | Find by `id`                |
| `.findByName(name)` | `Forageable \| undefined` | Case-insensitive name match |
| `.count()`          | `number`                  | Number of results           |

---

## Examples

```ts
import { forageables } from "stardew-valley-data";

// All spring forageables sorted by sell price
forageables().bySeason("spring").sortBySellPrice().get();
// Morel (150g), Wild Horseradish (50g), Leek (60g), ...

// Most valuable forageable overall
forageables().sortBySellPrice().first();
// Magma Cap — 400g

// All winter forageables
forageables().bySeason("winter").sortByName().get();

// Look up by id
forageables().find("259");
// { id: 'fiddlehead-fern', name: 'Fiddlehead Fern', seasons: ['summer'], ... }
```
