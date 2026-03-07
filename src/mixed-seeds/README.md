# mixed-seeds

Query builder for Stardew Valley mixed seed data.

Mixed Seeds are craftable seeds that randomly produce a crop appropriate for the current season.
Each Mixed Seed variant (Spring, Summer, Fall) maps to a set of crop IDs it can produce.

## Usage

```ts
import { mixedSeeds } from "stardew-valley-data";
```

## Factory function

```ts
mixedSeeds(source?: MixedSeed[]): MixedSeedQuery
```

Passing a custom `source` array lets you operate on a pre-filtered subset.

## Filter methods

All filter methods return a new `MixedSeedQuery` and can be chained freely.

| Method               | Description                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| `byProduces(season)` | Seeds that can produce crops in the given season (`spring`, `summer`, `fall`, `winter`, `ginger island`) |
| `withBuyPrices()`    | Seeds that have at least one shop buy price                                                              |

## Terminal methods

| Method             | Returns                  | Description                         |
| ------------------ | ------------------------ | ----------------------------------- |
| `get()`            | `MixedSeed[]`            | All seeds in the current query      |
| `first()`          | `MixedSeed \| undefined` | First seed in the current query     |
| `find(id)`         | `MixedSeed \| undefined` | Find by item ID                     |
| `findByName(name)` | `MixedSeed \| undefined` | Find by name (case-insensitive)     |
| `count()`          | `number`                 | Count of seeds in the current query |

## Examples

```ts
// All mixed seeds
mixedSeeds().get();

// Mixed seeds that produce spring crops
mixedSeeds().byProduces("spring").get();

// Mixed seeds that produce island crops
mixedSeeds().byProduces("ginger island").get();

// Seeds available for purchase
mixedSeeds().withBuyPrices().get();

// Find a specific seed by ID
mixedSeeds().find("770");

// Count total mixed seed variants
mixedSeeds().count();
```

## Mixed seed fields

| Field                     | Type                               | Notes                                                |
| ------------------------- | ---------------------------------- | ---------------------------------------------------- | --- |
| id                        | string                             | Item ID                                              |
| name                      | string                             |                                                      |
| sellPrice                 | number                             |                                                      |
| description               | string                             |                                                      |
| image                     | string                             | Path to seed image                                   |
| buyPrices                 | { place: string; price: number }[] |                                                      |
| buyPrices[].place         | string                             |                                                      |
| buyPrices[].price         | number                             |                                                      |
| produces                  | Partial<Record<Season, string[]>>  | Keys are seasons, values are arrays of crop item IDs |
| produces.spring           | string[]                           | undefined                                            |     |
| produces.summer           | string[]                           | undefined                                            |     |
| produces.fall             | string[]                           | undefined                                            |     |
| produces['ginger island'] | string[]                           | undefined                                            |     |
