# calculator

Calculators for Stardew Valley sell prices and energy/health values — quality tiers and artisan
goods.

## Usage

```ts
import {
  artisanCalculator,
  ArtisanCalculator,
  qualityCalculator,
  QualityCalculator,
} from "stardew-valley-data";
```

## Factory functions

```ts
qualityCalculator(): QualityCalculator
artisanCalculator(): ArtisanCalculator
```

## Methods

| Method                                 | Returns                 | Description                                        |
| -------------------------------------- | ----------------------- | -------------------------------------------------- |
| `sellPrices(basePrice)`                | `QualityPrice[]`        | Silver, Gold, and Iridium sell prices              |
| `energyHealth(baseEnergy, baseHealth)` | `QualityEnergyHealth[]` | Silver, Gold, and Iridium energy and health values |

## Examples

```ts
const calc = qualityCalculator();

// Sell price tiers for a 200g item
calc.sellPrices(200);
// [
//   { quality: 'silver', icon: 'images/misc/Silver Quality.png', value: 250 },
//   { quality: 'gold',   icon: 'images/misc/Gold Quality.png',   value: 300 },
//   { quality: 'iridium',icon: 'images/misc/Iridium Quality.png',value: 400 },
// ]

// Energy/health tiers for Parsnip (38 energy, 17 health)
calc.energyHealth(38, 17);
// [
//   { quality: 'silver',  icon: '...', energy: 53, health: 23 },
//   { quality: 'gold',    icon: '...', energy: 68, health: 30 },
//   { quality: 'iridium', icon: '...', energy: 98, health: 44 },
// ]
```

## Multipliers

### Sell price

| Quality | Multiplier | Calculation                    |
| ------- | ---------- | ------------------------------ |
| Silver  | ×1.25      | `Math.floor(basePrice * 1.25)` |
| Gold    | ×1.5       | `Math.floor(basePrice * 1.5)`  |
| Iridium | ×2         | `Math.floor(basePrice * 2)`    |

### Energy / health

The same multiplier is applied independently to the base energy and base health values.

| Quality | Multiplier | Calculation                           |
| ------- | ---------- | ------------------------------------- |
| Silver  | ×1.4       | `Math.floor(baseEnergy/Health * 1.4)` |
| Gold    | ×1.8       | `Math.floor(baseEnergy/Health * 1.8)` |
| Iridium | ×2.6       | `Math.floor(baseEnergy/Health * 2.6)` |

## Fields

### QualityPrice

| Field   | Type   | Notes                                |
| ------- | ------ | ------------------------------------ |
| quality | string | `'silver'`, `'gold'`, or `'iridium'` |
| icon    | string | Path to quality star image           |
| value   | number | Calculated sell price                |

### QualityEnergyHealth

| Field   | Type   | Notes                                |
| ------- | ------ | ------------------------------------ |
| quality | string | `'silver'`, `'gold'`, or `'iridium'` |
| icon    | string | Path to quality star image           |
| energy  | number | Calculated energy value              |
| health  | number | Calculated health value              |

## Quality icons

Icons are sourced from `images/misc/`:

| Quality | Icon path                         |
| ------- | --------------------------------- |
| Silver  | `images/misc/Silver Quality.png`  |
| Gold    | `images/misc/Gold Quality.png`    |
| Iridium | `images/misc/Iridium Quality.png` |

---

## ArtisanCalculator

Calculates sell prices and energy/health values for artisan goods. Each method accepts pre-computed
base values for the source ingredient.

### Methods

| Method                                               | Returns               | Description                                  |
| ---------------------------------------------------- | --------------------- | -------------------------------------------- |
| `roe(baseFishPrice)`                                 | `ArtisanResult`       | Roe sell price                               |
| `agedRoe(baseFishPrice)`                             | `ArtisanResult`       | Aged Roe sell price                          |
| `honey(baseFlowerPrice)`                             | `ArtisanResult`       | Honey sell price (pass `0` for wild honey)   |
| `wine(baseFruitPrice, baseEnergy, baseHealth)`       | `ArtisanEnergyResult` | Wine sell price and energy/health            |
| `juice(basePrice, baseEnergy, baseHealth)`           | `ArtisanEnergyResult` | Juice sell price and energy/health           |
| `pickles(basePrice, baseEnergy, baseHealth)`         | `ArtisanEnergyResult` | Pickles sell price and energy/health         |
| `jelly(baseFruitPrice, baseEnergy, baseHealth)`      | `ArtisanEnergyResult` | Jelly sell price and energy/health           |
| `driedMushrooms(basePrice, baseEnergy, baseHealth)`  | `ArtisanEnergyResult` | Dried Mushrooms sell price and energy/health |
| `driedFruit(baseFruitPrice, baseEnergy, baseHealth)` | `ArtisanEnergyResult` | Dried Fruit sell price and energy/health     |
| `smokedFish(baseFishPrice, baseEnergy, baseHealth)`  | `ArtisanEnergyResult` | Smoked Fish sell price and energy/health     |

### Examples

```ts
const artisan = artisanCalculator();

// Roe from a Catfish (200g)
artisan.roe(200); // { sellPrice: 130 }

// Aged Roe from a Catfish (200g)
artisan.agedRoe(200); // { sellPrice: 260 }

// Wild honey (no nearby flower)
artisan.honey(0); // { sellPrice: 100 }

// Honey near a Tulip (30g)
artisan.honey(30); // { sellPrice: 160 }

// Wine from Starfruit (750g, 98 energy, 44 health)
artisan.wine(750, 98, 44); // { sellPrice: 2250, energy: 171, health: 77 }

// Juice from Pumpkin (320g, 145 energy, 65 health)
artisan.juice(320, 145, 65); // { sellPrice: 720, energy: 290, health: 130 }

// Pickles from Pumpkin (320g, 145 energy, 65 health)
artisan.pickles(320, 145, 65); // { sellPrice: 690, energy: 253, health: 113 }

// Jelly from Strawberry (120g, 26 energy, 11 health)
artisan.jelly(120, 26, 11); // { sellPrice: 290, energy: 52, health: 22 }

// Dried Mushrooms from Morel (150g, 67 energy, 30 health)
artisan.driedMushrooms(150, 67, 30); // { sellPrice: 1150, energy: 201, health: 90 }

// Dried Fruit from Apricot (50g, 38 energy, 17 health)
artisan.driedFruit(50, 38, 17); // { sellPrice: 375, energy: 114, health: 51 }

// Smoked Fish from Tuna (100g, 50 energy, 22 health)
artisan.smokedFish(100, 50, 22); // { sellPrice: 200, energy: 75, health: 33 }
```

### Sell price formulas

| Good            | Formula                                    |
| --------------- | ------------------------------------------ |
| Roe             | `30 + Math.floor(baseFishPrice / 2)`       |
| Aged Roe        | `60 + baseFishPrice`                       |
| Honey           | `100 + (baseFlowerPrice × 2)`              |
| Wine            | `Math.floor(baseFruitPrice × 3)`           |
| Juice           | `Math.floor(basePrice × 2.25)`             |
| Pickles         | `Math.floor(basePrice × 2) + 50`           |
| Jelly           | `Math.floor(baseFruitPrice × 2) + 50`      |
| Dried Mushrooms | `Math.floor(baseMushroomPrice × 7.5) + 25` |
| Dried Fruit     | `Math.floor(baseFruitPrice × 7.5)`         |
| Smoked Fish     | `Math.floor(baseFishPrice × 2)`            |

### Energy/health multipliers

| Good            | Multiplier | Calculation               |
| --------------- | ---------- | ------------------------- |
| Wine            | ×1.75      | `Math.floor(base × 1.75)` |
| Juice           | ×2         | `Math.floor(base × 2)`    |
| Pickles         | ×1.75      | `Math.floor(base × 1.75)` |
| Jelly           | ×2         | `Math.floor(base × 2)`    |
| Dried Mushrooms | ×3         | `Math.floor(base × 3)`    |
| Dried Fruit     | ×3         | `Math.floor(base × 3)`    |
| Smoked Fish     | ×1.5       | `Math.floor(base × 1.5)`  |

### Fields

#### ArtisanResult

| Field     | Type   | Notes                 |
| --------- | ------ | --------------------- |
| sellPrice | number | Calculated sell price |

#### ArtisanEnergyResult

| Field     | Type   | Notes                   |
| --------- | ------ | ----------------------- |
| sellPrice | number | Calculated sell price   |
| energy    | number | Calculated energy value |
| health    | number | Calculated health value |
