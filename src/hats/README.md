# Hats

Cosmetic hats that can be worn by the player (and placed on pets in v1.6+). Hats have no gameplay
effect and cannot be sold. 122 hats are included, sourced from the Stardew Valley wiki.

---

## Type

### `Hat`

| Field         | Type     | Description                    |
| ------------- | -------- | ------------------------------ |
| `id`          | `string` | Unique identifier (kebab-case) |
| `name`        | `string` | Display name                   |
| `description` | `string` | Flavour text shown in-game     |
| `obtain`      | `string` | How to acquire the hat         |
| `image`       | `string` | Path to the hat's icon         |

---

## Factory

```ts
import { hats } from "stardew-valley-data";

hats(); // all 122 hats
hats(source); // wrap a pre-filtered Hat[]
```

---

## Query methods

### Filters

#### `.sortByName(order?: 'asc' | 'desc')`

Sort alphabetically by name. Defaults to `'asc'`.

```ts
hats().sortByName().get();
```

---

### Terminal methods

| Method              | Returns            | Description                 |
| ------------------- | ------------------ | --------------------------- |
| `.get()`            | `Hat[]`            | All results                 |
| `.first()`          | `Hat \| undefined` | First result                |
| `.find(id)`         | `Hat \| undefined` | Find by `id`                |
| `.findByName(name)` | `Hat \| undefined` | Case-insensitive name match |
| `.count()`          | `number`           | Number of results           |

---

## Examples

```ts
import { hats } from "stardew-valley-data";

// Total hat count
hats().count(); // 122

// All hats sorted alphabetically
hats().sortByName().get();

// Look up a specific hat
hats().find("living-hat");
// { id: 'living-hat', name: 'Living Hat', description: '...', obtain: '...', image: '...' }

// Case-insensitive name lookup
hats().findByName("fedora");

// First hat alphabetically
hats().sortByName().first();
```
