# calculator

Quality tier calculators for Stardew Valley sell prices and energy/health values.

## Usage

```ts
import { qualityCalculator, QualityCalculator } from "stardew-valley-data";
```

## Factory function

```ts
qualityCalculator(): QualityCalculator
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
