# Weapon Stats

Reference entries for each weapon stat shown on the Weapons page, including name, description, and
icon image.

The 5 stats defined here correspond to the modifier columns in weapon data: `speed`, `defense`,
`knockback` (called "Weight" in-game), `critChance`, and `critPower`.

---

## Type

### `WeaponStat`

| Field         | Type     | Description                   |
| ------------- | -------- | ----------------------------- |
| `id`          | `string` | Unique identifier             |
| `name`        | `string` | Display name (as on the wiki) |
| `description` | `string` | What the stat does            |
| `image`       | `string` | Path to the stat's icon       |

---

## Factory

```ts
import { weaponStats } from "stardew-valley-data";

weaponStats(); // all 5 stats
weaponStats(source); // wrap a pre-filtered WeaponStat[]
```

---

## Query methods

### Filters

#### `.sortByName(order?: 'asc' | 'desc')`

Sort alphabetically by name. Defaults to `'asc'`.

```ts
weaponStats().sortByName().get();
```

---

### Terminal methods

| Method              | Returns                   | Description                 |
| ------------------- | ------------------------- | --------------------------- |
| `.get()`            | `WeaponStat[]`            | All results                 |
| `.first()`          | `WeaponStat \| undefined` | First result                |
| `.find(id)`         | `WeaponStat \| undefined` | Find by `id`                |
| `.findByName(name)` | `WeaponStat \| undefined` | Case-insensitive name match |
| `.count()`          | `number`                  | Number of results           |

---

## Stats reference

| ID            | Name         | Weapon field |
| ------------- | ------------ | ------------ |
| `speed`       | Speed        | `speed`      |
| `defense`     | Defense      | `defense`    |
| `weight`      | Weight       | `knockback`  |
| `crit-chance` | Crit. Chance | `critChance` |
| `crit-power`  | Crit. Power  | `critPower`  |

> The in-game stat name for knockback is **Weight**. The `knockback` field in `MeleeWeapon` maps to
> the `weight` stat entry.

---

## Examples

```ts
import { weaponStats } from "stardew-valley-data";

// All stat definitions
weaponStats().get();

// Look up the crit chance stat for display
const critChance = weaponStats().find("crit-chance");
// { id: 'crit-chance', name: 'Crit. Chance', description: '...', image: '...' }

// All stats sorted alphabetically
weaponStats().sortByName().get();
```
