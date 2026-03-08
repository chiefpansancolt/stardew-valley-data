# Footwear

Boots and shoes worn by the player, providing defense and immunity bonuses. 18 footwear items are
included, sourced from the Stardew Valley wiki.

---

## Type

### `Footwear`

| Field         | Type     | Description                                      |
| ------------- | -------- | ------------------------------------------------ |
| `id`          | `string` | Unique identifier (kebab-case)                   |
| `name`        | `string` | Display name                                     |
| `description` | `string` | Flavour text shown in-game                       |
| `defense`     | `number` | Defense bonus added to the player's defense stat |
| `immunity`    | `number` | Immunity bonus reducing debuff duration          |
| `obtain`      | `string` | How to acquire the footwear                      |
| `image`       | `string` | Path to the footwear's icon                      |

---

## Factory

```ts
import { footwear } from "stardew-valley-data";

footwear(); // all 18 footwear items
footwear(source); // wrap a pre-filtered Footwear[]
```

---

## Query methods

### Sorts

#### `.sortByName(order?: 'asc' | 'desc')`

Sort alphabetically by name. Defaults to `'asc'`.

```ts
footwear().sortByName().get();
```

#### `.sortByDefense(order?: 'asc' | 'desc')`

Sort by defense bonus. Defaults to `'desc'` (highest first).

```ts
footwear().sortByDefense().get();
```

#### `.sortByImmunity(order?: 'asc' | 'desc')`

Sort by immunity bonus. Defaults to `'desc'` (highest first).

```ts
footwear().sortByImmunity().get();
```

---

### Terminal methods

| Method              | Returns                 | Description                 |
| ------------------- | ----------------------- | --------------------------- |
| `.get()`            | `Footwear[]`            | All results                 |
| `.first()`          | `Footwear \| undefined` | First result                |
| `.find(id)`         | `Footwear \| undefined` | Find by `id`                |
| `.findByName(name)` | `Footwear \| undefined` | Case-insensitive name match |
| `.count()`          | `number`                | Number of results           |

---

## Examples

```ts
import { footwear } from "stardew-valley-data";

// Total count
footwear().count(); // 18

// Best defense
footwear().sortByDefense().first();
// Dragonscale Boots — defense 7

// Best immunity
footwear().sortByImmunity().first();
// Mermaid Boots — immunity 8

// All sorted alphabetically
footwear().sortByName().get();

// Look up by id
footwear().find("space-boots");
// { id: 'space-boots', name: 'Space Boots', defense: 4, immunity: 4, ... }
```
