# trees

Query builder for Stardew Valley tree data. Covers both fruit trees and wild (tappable) trees.

## Usage

```ts
import { trees } from "stardew-valley-data";
import type { FruitTree, WildTree } from "stardew-valley-data";
```

## Factory function

```ts
trees(source?: Tree[]): TreeQuery
```

Passing a custom `source` array lets you operate on a pre-filtered subset.

## Filter methods

All filter methods return a new `TreeQuery` and can be chained freely.

| Method             | Description                                  |
| ------------------ | -------------------------------------------- |
| `fruitTrees()`     | Only fruit trees (`type === 'fruit-tree'`)   |
| `wildTrees()`      | Only wild trees (`type === 'wild-tree'`)     |
| `bySeason(season)` | Fruit trees that produce in the given season |
| `tappable()`       | Wild trees that have a tapper product        |

## Sort methods

| Method                           | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `sortByProduceSellPrice(order?)` | Sort by produce/tapper sell price. Default: `'desc'` |

## Terminal methods

| Method             | Returns             | Description                         |
| ------------------ | ------------------- | ----------------------------------- |
| `get()`            | `Tree[]`            | All trees in the current query      |
| `first()`          | `Tree \| undefined` | First tree in the current query     |
| `find(id)`         | `Tree \| undefined` | Find by ID                          |
| `findByName(name)` | `Tree \| undefined` | Find by name (case-insensitive)     |
| `count()`          | `number`            | Count of trees in the current query |

## Examples

```ts
// All trees
trees().get();

// All fruit trees, sorted by produce sell price
trees().fruitTrees().sortByProduceSellPrice().get();

// Fruit trees in spring
trees().bySeason("spring").get();

// All tappable wild trees
trees().tappable().get();

// Wild trees with tapper, sorted by tapper sell price descending
trees().tappable().sortByProduceSellPrice().get();

// Find a specific tree by ID
trees().find("629"); // Apricot Tree (sapling ID)

// Count all fruit trees
trees().fruitTrees().count();
```

## Working with the union type

`Tree` is a discriminated union. Use `type` to narrow:

```ts
import type { FruitTree, WildTree } from "stardew-valley-data";

for (const tree of trees().get()) {
  if (tree.type === "fruit-tree") {
    console.log(tree.produce.name, tree.produce.sellPrice);
  } else {
    console.log(tree.tapper?.name);
  }
}
```

## Fruit tree fields

| Field                       | Type                               | Notes                           |
| --------------------------- | ---------------------------------- | ------------------------------- |
| type                        | 'fruit-tree'                       | Discriminant for type narrowing |
| id                          | string                             | Sapling item ID                 |
| name                        | string                             |                                 |
| saplingId                   | string                             |                                 |
| saplingName                 | string                             |                                 |
| saplingBuyPrices            | { place: string; price: number }[] |                                 |
| saplingBuyPrices[].place    | string                             |                                 |
| saplingBuyPrices[].price    | number                             |                                 |
| saplingSellPrice            | number                             |                                 |
| seasons                     | string[]                           | Seasons the tree produces fruit |
| daysToMature                | number                             |                                 |
| description                 | string                             |                                 |
| image                       | string                             | Path to tree-with-fruit image   |
| saplingImage                | string                             | Path to sapling image           |
| stages                      | { name: string; image: string }[]  |                                 |
| stages[].name               | string                             |                                 |
| stages[].image              | string                             |                                 |
| produce.id                  | string                             | Fruit item ID                   |
| produce.name                | string                             |                                 |
| produce.sellPrice           | number                             |                                 |
| produce.image               | string                             | Path to fruit item image        |
| produce.energyHealth        | object | undefined                 | Omitted for inedible fruit      |
| produce.energyHealth.energy | number | undefined                 |                                 |
| produce.energyHealth.health | number | undefined                 |                                 |

## Wild tree fields

| Field                      | Type                              | Notes                               |
| -------------------------- | --------------------------------- | ----------------------------------- |
| type                       | 'wild-tree'                       | Discriminant for type narrowing     |
| id                         | string                            | Tree type ID                        |
| name                       | string                            |                                     |
| seedId                     | string                            |                                     |
| seedName                   | string                            |                                     |
| description                | string                            |                                     |
| image                      | string                            | Path to mature tree (stage 5) image |
| seedImage                  | string                            | Path to seed item image             |
| stages                     | { name: string; image: string }[] |                                     |
| stages[].name              | string                            |                                     |
| stages[].image             | string                            |                                     |
| tapper                     | object | undefined                | Only present for tappable trees     |
| tapper.id                  | string                            |                                     |
| tapper.name                | string                            |                                     |
| tapper.sellPrice           | number                            |                                     |
| tapper.image               | string                            | Path to tapper product image        |
| tapper.energyHealth        | object | undefined                | Omitted for inedible products       |
| tapper.energyHealth.energy | number | undefined                |                                     |
| tapper.energyHealth.health | number | undefined                |                                     |
