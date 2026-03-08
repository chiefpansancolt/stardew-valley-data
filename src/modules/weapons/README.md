# Weapons

All weapons in Stardew Valley: swords, daggers, clubs, and slingshots.

---

## Types

### `WeaponType`

```ts
type WeaponType = "sword" | "dagger" | "club" | "slingshot";
```

### `MeleeWeapon`

Covers swords, daggers, and clubs — all share the same stat structure.

| Field      | Type                          | Description                                                     |
| ---------- | ----------------------------- | --------------------------------------------------------------- |
| id         | string                        | Unique identifier (kebab-case)                                  |
| type       | 'sword' \| 'dagger' \| 'club' | Discriminant                                                    |
| name       | string                        | Weapon name                                                     |
| image      | string                        | Path to weapon image                                            |
| damageMin  | number                        | Minimum damage per hit                                          |
| damageMax  | number                        | Maximum damage per hit                                          |
| speed      | number                        | Speed modifier (positive = faster, negative = slower, 0 = none) |
| critChance | number                        | Base critical hit chance (e.g. `0.02` = 2%)                     |
| critPower  | number                        | Critical hit power bonus (0 = no modifier)                      |
| defense    | number                        | Defense bonus (0 = no bonus)                                    |
| knockback  | number                        | Knockback modifier (0 = no modifier)                            |
| level      | number                        | Recommended combat level                                        |
| obtain     | string                        | How to acquire                                                  |
| sellPrice  | number                        | Sell price in gold                                              |
| canEnchant | boolean                       | Whether the weapon can be enchanted at the Forge                |

> **Special attacks by type:** Swords parry/block. Daggers perform a rapid 4-hit combo. Clubs slam
> the ground for area-of-effect damage.

### `Slingshot`

| Field      | Type        | Description                              |
| ---------- | ----------- | ---------------------------------------- |
| id         | string      | Unique identifier                        |
| type       | 'slingshot' | Discriminant                             |
| name       | string      | Slingshot name                           |
| image      | string      | Path to image                            |
| obtain     | string      | How to acquire                           |
| sellPrice  | number      | Sell price in gold                       |
| canEnchant | boolean     | Whether it can be enchanted at the Forge |

> Slingshot damage varies by ammo type. The Master Slingshot deals double the damage of the
> Slingshot with the same ammo.

### `Weapon`

```ts
type Weapon = MeleeWeapon | Slingshot;
```

---

## Factory

```ts
import { weapons } from "stardew-valley-data";

weapons(); // all weapons
weapons(source); // wrap a pre-filtered Weapon[]
```

---

## Query methods

### Filters

#### `.byType(type: WeaponType)`

Filter by weapon type.

```ts
weapons().byType("sword").get();
```

#### `.swords()` / `.daggers()` / `.clubs()` / `.slingshots()`

Shorthand type filters.

```ts
weapons().swords().get();
weapons().daggers().get();
weapons().clubs().get();
weapons().slingshots().get();
```

#### `.melee()`

All `MeleeWeapon` entries (swords + daggers + clubs, excludes slingshots).

```ts
weapons().melee().get();
```

#### `.canEnchant()`

Only weapons that can be enchanted at the Forge. All weapons except the Rusty Sword.

```ts
weapons().canEnchant().count(); // 61
```

#### `.byMinLevel(level: number)`

Melee weapons at or above the given recommended combat level.

```ts
weapons().byMinLevel(10).get(); // end-game weapons
```

#### `.byMaxLevel(level: number)`

Melee weapons at or below the given recommended combat level.

```ts
weapons().byMaxLevel(5).get(); // early-game weapons
```

#### `.sortByDamage(order?: 'asc' | 'desc')`

Sort by max damage. Defaults to `'desc'` (highest first).

```ts
weapons().swords().sortByDamage().get();
```

#### `.sortByLevel(order?: 'asc' | 'desc')`

Sort by recommended combat level. Defaults to `'asc'`.

```ts
weapons().clubs().sortByLevel().get();
```

#### `.sortByName(order?: 'asc' | 'desc')`

Sort alphabetically. Defaults to `'asc'`.

```ts
weapons().sortByName().get();
```

---

### Terminal methods

| Method              | Returns               | Description                 |
| ------------------- | --------------------- | --------------------------- |
| `.get()`            | `Weapon[]`            | All results                 |
| `.first()`          | `Weapon \| undefined` | First result                |
| `.find(id)`         | `Weapon \| undefined` | Find by `id`                |
| `.findByName(name)` | `Weapon \| undefined` | Case-insensitive name match |
| `.count()`          | `number`              | Number of results           |

---

## Examples

```ts
import { MeleeWeapon, weapons } from "stardew-valley-data";

// Strongest sword by max damage
weapons().swords().sortByDamage().first();
// Infinity Blade — 80–100

// All Volcano Dungeon weapons
const volcanoWeapons = weapons().melee().get() as MeleeWeapon[];
volcanoWeapons.filter((w) => w.obtain.includes("Volcano"));

// Galaxy weapon set
["galaxy-sword", "galaxy-dagger", "galaxy-hammer"].map((id) => weapons().find(id));

// Infinity weapons (highest tier)
weapons().byMinLevel(17).sortByDamage().get();

// Best early-game dagger (level ≤ 4)
weapons().daggers().byMaxLevel(4).sortByDamage().first();

// Weapons with defense bonus
const melee = weapons().melee().get() as MeleeWeapon[];
melee.filter((w) => w.defense > 0).sort((a, b) => b.defense - a.defense);

// High crit weapons
melee.filter((w) => w.critChance >= 0.06);
// Wicked Kris, Abby's Planchette, Elliott's Pencil, Infinity Dagger, Iridium Needle

// Desert Festival weapons
melee.filter((w) => w.obtain.includes("Desert Festival"));
```
