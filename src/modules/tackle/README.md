# Tackle

All fishing tackle items in Stardew Valley. 10 tackle items are included.

---

## Type

### `Tackle`

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
import { tackle } from "stardew-valley-data";

tackle(); // all 10 tackle items
tackle(source); // wrap a pre-filtered array
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

| Method              | Returns               | Description                 |
| ------------------- | --------------------- | --------------------------- |
| `.get()`            | `Tackle[]`            | All results                 |
| `.first()`          | `Tackle \| undefined` | First result                |
| `.find(id)`         | `Tackle \| undefined` | Find by `id`                |
| `.findByName(name)` | `Tackle \| undefined` | Case-insensitive name match |
| `.count()`          | `number`              | Number of results           |

---

## Examples

```ts
import { tackle } from "stardew-valley-data";

// All tackle sorted by name
tackle().sortByName().get();

// Most valuable tackle
tackle().sortBySellPrice().first();

// Look up by id
tackle().find("695");
// { id: '695', name: 'Cork Bobber', sellPrice: 250, ... }

// Look up by name
tackle().findByName("Trap Bobber");
```
