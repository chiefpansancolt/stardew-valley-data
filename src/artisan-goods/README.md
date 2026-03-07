# artisan-goods

Query builder and utilities for Stardew Valley artisan good data.

Covers all 26 artisan goods across 8 pieces of equipment (Bee House, Keg, Preserves Jar, Cheese
Press, Loom, Oil Maker, Mayonnaise Machine, Dehydrator, Fish Smoker), including ingredients,
processing times, sell prices, quality levels, and cask aging timelines for items that support it.

## Usage

```ts
import { applyPriceFormula, artisanGoods, calculateArtisanPrice } from "stardew-valley-data";
```

## Factory function

```ts
artisanGoods(source?: ArtisanGood[]): ArtisanGoodQuery
```

## Filter methods

| Method                | Returns            | Description                                       |
| --------------------- | ------------------ | ------------------------------------------------- |
| `byEquipment(name)`   | `ArtisanGoodQuery` | Goods produced by the given equipment             |
| `caskAgeable()`       | `ArtisanGoodQuery` | Goods that can be aged in a Cask                  |
| `withQualityLevels()` | `ArtisanGoodQuery` | Goods that have Silver/Gold/Iridium quality tiers |
| `fixedPrice()`        | `ArtisanGoodQuery` | Goods with a fixed sell price                     |
| `formulaPrice()`      | `ArtisanGoodQuery` | Goods whose price is calculated from the input    |

## Terminal methods

| Method             | Returns                    | Description                         |
| ------------------ | -------------------------- | ----------------------------------- |
| `get()`            | `ArtisanGood[]`            | All goods in the current query      |
| `first()`          | `ArtisanGood \| undefined` | First good in the current query     |
| `find(id)`         | `ArtisanGood \| undefined` | Find by ID                          |
| `findByName(name)` | `ArtisanGood \| undefined` | Find by name (case-insensitive)     |
| `count()`          | `number`                   | Count of goods in the current query |

## Utility functions

```ts
calculateArtisanPrice(good: ArtisanGood, ingredientBasePrice: number): number | null
```

Returns the sell price for a formula-based artisan good given the ingredient's base sell price.
Returns `null` for fixed-price items that have no formula.

```ts
applyPriceFormula(formula: PriceFormula, ingredientBasePrice: number): number
```

Applies a `PriceFormula` directly. Useful when you already have the formula object. Calculation:
`Math.floor(ingredientBasePrice * multiplier) + addend`

## Examples

```ts
// All artisan goods
artisanGoods().get();

// All Keg products
artisanGoods().byEquipment("Keg").get();

// All goods that can be aged in a Cask
artisanGoods().caskAgeable().get();
// [{ id: 'wine', cask: { silverDays: 14, goldDays: 28, iridiumDays: 56 }, ... }, ...]

// Goods with formula-based pricing
artisanGoods().formulaPrice().get();

// Look up a specific good
const wine = artisanGoods().find("wine");
wine?.processingMinutes; // 10000
wine?.processingDays; // 6.25
wine?.priceFormula; // { multiplier: 3, addend: 0 }
wine?.cask?.iridiumDays; // 56

// Calculate wine price from a fruit that sells for 200g
calculateArtisanPrice(wine!, 200); // 600

// Calculate jelly price from a fruit that sells for 120g
const jelly = artisanGoods().find("jelly")!;
calculateArtisanPrice(jelly, 120); // Math.floor(120 * 2) + 50 = 290

// Apply a formula directly
applyPriceFormula({ multiplier: 2.25, addend: 0 }, 400); // 900 (Cauliflower juice)

// Cheese Press items
artisanGoods().byEquipment("Cheese Press").get();
// [{ id: 'cheese', ... }, { id: 'goat-cheese', ... }]

// All fixed-price goods sorted by sell price
artisanGoods()
  .fixedPrice()
  .get()
  .sort((a, b) => (b.sellPrice ?? 0) - (a.sellPrice ?? 0));
```

## Fields

| Field                   | Type                 | Notes                                                 |
| ----------------------- | -------------------- | ----------------------------------------------------- |
| id                      | string               |                                                       |
| name                    | string               |                                                       |
| description             | string               |                                                       |
| equipment               | string               | Equipment used to produce this good                   |
| ingredients             | ArtisanIngredient[]  |                                                       |
| ingredients[].name      | string               | Ingredient name or category (e.g. "Any Fruit")        |
| ingredients[].id        | string or null       | Object ID; null for category-based inputs             |
| ingredients[].quantity  | number or null       | Required quantity; null if variable                   |
| processingMinutes       | number               | In-game minutes to process (1 day = 1600 min)         |
| processingDays          | number               | processingMinutes ÷ 1600, rounded to 2 decimal places |
| sellPrice               | number or null       | Base sell price; null if formula-based                |
| sellPriceFormula        | string or null       | Human-readable formula description                    |
| priceFormula            | PriceFormula or null | Structured formula for price calculation              |
| priceFormula.multiplier | number               | Factor applied to ingredient base price               |
| priceFormula.addend     | number               | Flat amount added after multiplication                |
| qualityLevels           | boolean              | True if Silver/Gold/Iridium quality variants exist    |
| cask                    | CaskAging or null    | Aging timeline; null if item cannot be cask-aged      |
| cask.silverDays         | number               | Days in Cask to reach Silver quality                  |
| cask.goldDays           | number               | Days in Cask to reach Gold quality                    |
| cask.iridiumDays        | number               | Days in Cask to reach Iridium quality                 |
| image                   | string               | Path to item image                                    |

## All artisan goods

| ID                  | Equipment          | Sell Price                        | Cask          |
| ------------------- | ------------------ | --------------------------------- | ------------- |
| honey               | Bee House          | 100g (wild); formula near flowers | —             |
| wine                | Keg                | 3× fruit price                    | 14 / 28 / 56d |
| juice               | Keg                | 2.25× vegetable price             | 14 / 28 / 56d |
| pale-ale            | Keg                | 300g                              | 9 / 18 / 36d  |
| beer                | Keg                | 200g                              | 7 / 14 / 28d  |
| mead                | Keg                | 300g                              | 7 / 14 / 28d  |
| coffee              | Keg                | 150g                              | —             |
| vinegar             | Keg                | 100g                              | —             |
| green-tea           | Keg                | 100g                              | —             |
| jelly               | Preserves Jar      | 50 + 2× fruit price               | —             |
| pickles             | Preserves Jar      | 50 + 2× vegetable price           | —             |
| aged-roe            | Preserves Jar      | 2× roe price                      | —             |
| caviar              | Preserves Jar      | 500g                              | —             |
| cheese              | Cheese Press       | 230g (Gold from Large Milk: 345g) | 7 / 14 / 28d  |
| goat-cheese         | Cheese Press       | 400g (Gold from Large Goat: 600g) | 7 / 14 / 28d  |
| cloth               | Loom               | 470g                              | —             |
| truffle-oil         | Oil Maker          | 1,065g                            | —             |
| oil                 | Oil Maker          | 100g                              | —             |
| mayonnaise          | Mayonnaise Machine | 190g                              | —             |
| duck-mayonnaise     | Mayonnaise Machine | 375g                              | —             |
| void-mayonnaise     | Mayonnaise Machine | 275g                              | —             |
| dinosaur-mayonnaise | Mayonnaise Machine | 800g                              | —             |
| raisins             | Dehydrator         | 600g                              | —             |
| dried-fruit         | Dehydrator         | formula                           | —             |
| dried-mushrooms     | Dehydrator         | formula                           | —             |
| smoked-fish         | Fish Smoker        | formula                           | —             |

### Cask quality price multipliers

| Quality | Multiplier |
| ------- | ---------- |
| Silver  | ×1.25      |
| Gold    | ×1.5       |
| Iridium | ×2         |
