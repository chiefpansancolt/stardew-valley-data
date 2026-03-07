# search

Global item search across all Stardew Valley data modules.

Searches crops, crop seeds, fruit tree produce, wild tree seeds and tapper products, animals, animal
produce, artisan goods, monsters, and monster loot in a single call. Results are deduplicated by
kind + ID — items shared across multiple parents (e.g. Egg from White Chicken and Blue Chicken) are
returned as one result with a `parents` array listing all sources.

## Usage

```ts
import { search } from "stardew-valley-data";
```

## Function signature

```ts
search(query: string, kinds?: SearchResultKind[]): SearchResult[]
```

| Parameter | Type                 | Description                                                      |
| --------- | -------------------- | ---------------------------------------------------------------- |
| `query`   | `string`             | Name substring or exact ID to match (case-insensitive)           |
| `kinds`   | `SearchResultKind[]` | Optional allowlist of kinds to include; omit to return all kinds |

## Examples

```ts
// Search by name substring
search("egg");
// [
//   { kind: 'crop',           id: '272',  name: 'Eggplant',   sellPrice: 60, ... },
//   { kind: 'crop-seed',      id: '273',  name: 'Eggplant Seeds', sellPrice: 10, ... },
//   { kind: 'animal-produce', id: '176',  name: 'Egg',         sellPrice: 50,
//     parents: [{ id: 'white-chicken', name: 'White Chicken' },
//               { id: 'blue-chicken',  name: 'Blue Chicken'  }] },
//   ...
// ]

// Search by exact ID
search("176");
// [{ kind: 'animal-produce', id: '176', name: 'Egg', sellPrice: 50, parents: [...] }]

// Filter to specific kinds
search("egg", ["animal-produce"]);

// Find all tapper products
search("syrup", ["wild-tree-tapper"]);

// Look up an artisan good
search("wine");
// [{ kind: 'artisan-good', id: 'wine', name: 'Wine', sellPrice: null, ... }]
```

## Result kinds

| Kind                 | Source module | Description                                  |
| -------------------- | ------------- | -------------------------------------------- |
| `crop`               | crops         | Harvested crop item                          |
| `crop-seed`          | crops         | Seed packet for a crop                       |
| `fruit-tree`         | trees         | Fruit tree (the tree itself)                 |
| `fruit-tree-produce` | trees         | Fruit produced by a fruit tree               |
| `wild-tree`          | trees         | Wild tree (the tree itself)                  |
| `wild-tree-seed`     | trees         | Seed dropped by a wild tree                  |
| `wild-tree-tapper`   | trees         | Product from a tapper on a wild tree         |
| `animal`             | animals       | Pet or farm animal                           |
| `animal-produce`     | animals       | Produce or deluxe produce from a farm animal |
| `artisan-good`       | artisan-goods | Artisan good produced by equipment           |
| `monster`            | monsters      | Monster entity                               |
| `monster-loot`       | monsters      | Classified loot dropped by monsters          |

## Fields

| Field     | Type                                          | Notes                                                                      |
| --------- | --------------------------------------------- | -------------------------------------------------------------------------- |
| kind      | SearchResultKind                              | Which data module and entity type this result comes from                   |
| id        | string                                        | Item ID                                                                    |
| name      | string                                        | Item name                                                                  |
| image     | string                                        | Path to item image                                                         |
| sellPrice | number or null                                | Base sell price; null for formula-based artisan goods and bare animals     |
| parents   | `{ id: string; name: string }[]` or undefined | Present for nested items; lists all parent entities that produce this item |
