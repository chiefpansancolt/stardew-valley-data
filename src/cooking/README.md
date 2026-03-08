# Cooking

All cooked dishes in Stardew Valley. 81 dishes are included.

---

## Type

### `CookedDish`

| Field          | Type           | Description                                      |
| -------------- | -------------- | ------------------------------------------------ |
| `id`           | `string`       | Game-internal ID from Objects.json               |
| `name`         | `string`       | Display name                                     |
| `description`  | `string`       | Flavour text shown in-game                       |
| `sellPrice`    | `number`       | Base sell price in gold                          |
| `energyHealth` | `EnergyHealth` | Energy and health restored when eaten            |
| `ingredients`  | `Ingredient[]` | Required ingredients with id, name, and quantity |
| `image`        | `string`       | Path to the dish's icon                          |

### `EnergyHealth`

| Field    | Type     | Description     |
| -------- | -------- | --------------- |
| `energy` | `number` | Energy restored |
| `health` | `number` | Health restored |

### `Ingredient`

| Field      | Type     | Description                                                               |
| ---------- | -------- | ------------------------------------------------------------------------- |
| `id`       | `string` | Game-internal ID (`"-4"` = Any Fish, `"-5"` = Any Egg, `"-6"` = Any Milk) |
| `name`     | `string` | Display name                                                              |
| `quantity` | `number` | Amount required                                                           |

---

## Factory

```ts
import { cooking } from "stardew-valley-data";

cooking(); // all 81 cooked dishes
cooking(source); // wrap a pre-filtered array
```

---

## Methods

### Sorts

#### `.sortByName(order?: 'asc' | 'desc')`

Sort alphabetically by name. Defaults to `'asc'`.

#### `.sortBySellPrice(order?: 'asc' | 'desc')`

Sort by sell price. Defaults to `'desc'` (most valuable first).

#### `.sortByEnergy(order?: 'asc' | 'desc')`

Sort by energy restored. Defaults to `'desc'` (most energising first).

### Filters

#### `.withIngredient(ingredientId: string)`

Filter to dishes that require a specific ingredient by ID.

---

### Terminal methods

| Method              | Returns                   | Description                 |
| ------------------- | ------------------------- | --------------------------- |
| `.get()`            | `CookedDish[]`            | All results                 |
| `.first()`          | `CookedDish \| undefined` | First result                |
| `.find(id)`         | `CookedDish \| undefined` | Find by `id`                |
| `.findByName(name)` | `CookedDish \| undefined` | Case-insensitive name match |
| `.count()`          | `number`                  | Number of results           |

---

## Examples

```ts
import { cooking } from "stardew-valley-data";

// All dishes sorted by name
cooking().sortByName().get();

// Most valuable dish
cooking().sortBySellPrice().first();

// Most energising dish
cooking().sortByEnergy().first();

// Dishes using Pumpkin (id: "276")
cooking().withIngredient("276").get();

// Look up by id
cooking().find("194");
// { id: '194', name: 'Fried Egg', sellPrice: 35, ... }

// Look up by name
cooking().findByName("Pink Cake");
```
