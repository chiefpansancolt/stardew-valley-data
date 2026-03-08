# Bait

All fishing bait items in Stardew Valley. 7 bait items are included.

---

## Type

### `Bait`

| Field         | Type     | Description                        |
| ------------- | -------- | ---------------------------------- |
| `id`          | `string` | Game-internal ID from Objects.json |
| `name`        | `string` | Display name                       |
| `description` | `string` | Flavour text shown in-game         |
| `sellPrice`   | `number` | Base sell price in gold            |
| `image`       | `string` | Path to the item's icon            |

---

## Factory

```ts
import { bait } from "stardew-valley-data";

bait(); // all 7 bait items
bait(source); // wrap a pre-filtered array
```

---

## Methods

### Sorts

#### `.sortByName(order?: 'asc' | 'desc')`

Sort alphabetically by name. Defaults to `'asc'`.

#### `.sortBySellPrice(order?: 'asc' | 'desc')`

Sort by sell price. Defaults to `'desc'` (most valuable first).

---

### Terminal methods

| Method              | Returns             | Description                 |
| ------------------- | ------------------- | --------------------------- |
| `.get()`            | `Bait[]`            | All results                 |
| `.first()`          | `Bait \| undefined` | First result                |
| `.find(id)`         | `Bait \| undefined` | Find by `id`                |
| `.findByName(name)` | `Bait \| undefined` | Case-insensitive name match |
| `.count()`          | `number`            | Number of results           |

---

## Examples

```ts
import { bait } from "stardew-valley-data";

// All bait sorted by name
bait().sortByName().get();

// Most valuable bait
bait().sortBySellPrice().first();

// Look up by id
bait().find("685");
// { id: '685', name: 'Bait', sellPrice: 1, ... }

// Look up by name
bait().findByName("Wild Bait");
```
