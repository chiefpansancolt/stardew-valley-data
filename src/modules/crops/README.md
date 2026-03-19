# crops

Query builder for Stardew Valley crop data.

## Usage

```ts
import { crops } from "stardew-valley-data";
```

## Factory function

```ts
crops(source?: Crop[]): CropQuery
```

Passing a custom `source` array lets you operate on a pre-filtered subset.

## Filter methods

All filter methods return a new `CropQuery` and can be chained freely.

| Method                 | Description                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `bySeason(season)`     | Crops available in the given season (`spring`, `summer`, `fall`, `winter`, `ginger island`)                                                |
| `byCategory(category)` | Filter by category string (e.g. `'Vegetable'`, `'Fruit'`)                                                                                  |
| `byShop(shop)`         | Filter to crops whose seed is sold at the given shop (case-insensitive)                                                                    |
| `regrowing()`          | Crops that regrow after harvesting (have a `regrowDays` value)                                                                             |
| `giant()`              | Crops that can grow into giant crops                                                                                                       |
| `trellis()`            | Crops that require a trellis                                                                                                               |
| `multiSeason()`        | Crops available in more than one season                                                                                                    |
| `extraHarvest()`       | Crops with a variable harvest that can yield more than 1 item                                                                              |
| `availableInShop()`    | Crops whose seeds are available to purchase somewhere                                                                                      |
| `eatable()`            | Crops with energy/health values (edible when consumed)                                                                                     |
| `byArtisanUse(use)`    | Crops that can produce the given artisan good (`'honey'`, `'wine'`, `'juice'`, `'pickles'`, `'jelly'`, `'driedMushrooms'`, `'driedFruit'`) |

## Sort methods

Sort methods also return a new `CropQuery` and can be chained.

| Method                    | Description                                |
| ------------------------- | ------------------------------------------ |
| `sortBySellPrice(order?)` | Sort by crop sell price. Default: `'desc'` |
| `sortByGrowDays(order?)`  | Sort by grow days. Default: `'asc'`        |

## Terminal methods

| Method             | Returns             | Description                         |
| ------------------ | ------------------- | ----------------------------------- |
| `get()`            | `Crop[]`            | All crops in the current query      |
| `first()`          | `Crop \| undefined` | First crop in the current query     |
| `find(id)`         | `Crop \| undefined` | Find by item ID                     |
| `findByName(name)` | `Crop \| undefined` | Find by name (case-insensitive)     |
| `count()`          | `number`            | Count of crops in the current query |

## Examples

```ts
// All crops
crops().get();

// All spring crops sorted by sell price
crops().bySeason("spring").sortBySellPrice().get();

// Regrowing crops available in both spring and summer
crops().regrowing().multiSeason().get();

// Seeds sold at Pierre's, sorted by grow days
crops().byShop("Pierre's General Store").sortByGrowDays().get();

// Count of all giant-capable crops
crops().giant().count();

// Find a specific crop by ID
crops().find("24"); // Parsnip

// First crop by fastest grow time
crops().sortByGrowDays("asc").first();

// All fruit crops (can make wine, jelly, dried fruit)
crops().byArtisanUse("wine").get();

// Flowers (can influence Bee House honey)
crops().byArtisanUse("honey").get();

// Vegetables that can be juiced, sorted by sell price
crops().byArtisanUse("juice").sortBySellPrice().get();
```

## Crop fields

| Field                      | Type                               | Notes                                                                 |
| -------------------------- | ---------------------------------- | --------------------------------------------------------------------- | ----------------------------- |
| id                         | string                             | Item ID                                                               |
| name                       | string                             |                                                                       |
| category                   | string                             | e.g. 'Vegetable', 'Fruit'                                             |
| seasons                    | string[]                           | e.g. ['spring', 'summer']                                             |
| growDays                   | number                             |                                                                       |
| regrowDays                 | number                             | null                                                                  | null if non-regrowing         |
| seedId                     | string                             |                                                                       |
| seedName                   | string                             |                                                                       |
| seedBuyPrices              | { place: string; price: number }[] |                                                                       |
| seedBuyPrices[].place      | string                             |                                                                       |
| seedBuyPrices[].price      | number                             |                                                                       |
| seedSellPrice              | number                             |                                                                       |
| cropSellPrice              | number                             |                                                                       |
| harvestQuantity            | { min: number; max: number }       |                                                                       |
| harvestQuantity.min        | number                             |                                                                       |
| harvestQuantity.max        | number                             |                                                                       |
| trellis                    | boolean                            |                                                                       |
| giant                      | boolean                            |                                                                       |
| description                | string                             |                                                                       |
| image                      | string                             | Path to harvested crop image                                          |
| seedImage                  | string                             | Path to seed packet image                                             |
| giantImage                 | string                             | undefined                                                             | Only present when giant: true |
| stages                     | { name: string; image: string }[]  |                                                                       |
| stages[].name              | string                             |                                                                       |
| stages[].image             | string                             |                                                                       |
| energyHealth               | object                             | undefined                                                             | Omitted for inedible crops    |
| energyHealth.energy        | number                             | undefined                                                             |                               |
| energyHealth.health        | number                             | undefined                                                             |                               |
| energyHealth.poison        | boolean                            | undefined                                                             |                               |
| maxQuality                 | ItemQuality                        | Highest quality achievable (`'iridium'` for most; `'base'` for Fiber) |
| artisanUses                | ArtisanUses                        | Which artisan goods this crop can produce                             |
| artisanUses.honey          | boolean                            | Can influence Bee House honey (flowers only)                          |
| artisanUses.wine           | boolean                            | Can be processed in a Keg → Wine (fruits)                             |
| artisanUses.juice          | boolean                            | Can be processed in a Keg → Juice (vegetables)                        |
| artisanUses.pickles        | boolean                            | Can be processed in a Preserves Jar → Pickles (vegetables)            |
| artisanUses.jelly          | boolean                            | Can be processed in a Preserves Jar → Jelly (fruits)                  |
| artisanUses.driedMushrooms | boolean                            | Can be processed in a Dehydrator → Dried Mushrooms                    |
| artisanUses.driedFruit     | boolean                            | Can be processed in a Dehydrator → Dried Fruit (fruits)               |
| farmingXP                  | number                             |                                                                       |
