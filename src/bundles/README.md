# Bundles

Community Center bundles, Joja Mart community development forms, and remix variants.

---

## Types

### `BundleRoom`

```ts
type BundleRoom =
  | "crafts-room"
  | "pantry"
  | "fish-tank"
  | "boiler-room"
  | "bulletin-board"
  | "vault"
  | "abandoned-joja-mart";
```

### `BundleItem`

An item required in an `ItemBundle`.

| Field      | Type                                         | Description              |
| ---------- | -------------------------------------------- | ------------------------ |
| `name`     | `string`                                     | Item name                |
| `quantity` | `number`                                     | Amount required          |
| `quality`  | `'silver' \| 'gold' \| 'iridium'` (optional) | Minimum quality required |

### `BundleReward`

The reward granted on bundle completion.

| Field      | Type     | Description      |
| ---------- | -------- | ---------------- |
| `name`     | `string` | Reward item name |
| `quantity` | `number` | Amount rewarded  |

### `ItemBundle`

A bundle completed by donating items.

| Field               | Type           | Description                                                           |
| ------------------- | -------------- | --------------------------------------------------------------------- |
| `id`                | `string`       | Unique identifier (remix variants use `-remix` suffix)                |
| `type`              | `'items'`      | Discriminant                                                          |
| `name`              | `string`       | Bundle name                                                           |
| `room`              | `BundleRoom`   | Community Center room                                                 |
| `bundleGroup`       | `number`       | Slot group within the room (bundles sharing a group are alternatives) |
| `image`             | `string`       | Path to bundle image                                                  |
| `items`             | `BundleItem[]` | Items that can be donated                                             |
| `itemsRequired`     | `number`       | Number of items required to complete the bundle                       |
| `itemsChosenRandom` | `boolean`      | Whether the items shown are randomly selected from a larger pool      |
| `numItemsAvailable` | `number`       | Total number of items available to choose from                        |
| `reward`            | `BundleReward` | Completion reward                                                     |
| `remixBundle`       | `boolean`      | `true` for Remix Community Center variant bundles                     |

### `GoldBundle`

A bundle completed by donating gold (Vault room).

| Field         | Type           | Description                                       |
| ------------- | -------------- | ------------------------------------------------- |
| `id`          | `string`       | Unique identifier                                 |
| `type`        | `'gold'`       | Discriminant                                      |
| `name`        | `string`       | Bundle name                                       |
| `room`        | `BundleRoom`   | Community Center room (always `'vault'`)          |
| `bundleGroup` | `number`       | Slot group within the room                        |
| `image`       | `string`       | Path to bundle image                              |
| `goldCost`    | `number`       | Gold required to complete                         |
| `reward`      | `BundleReward` | Completion reward                                 |
| `remixBundle` | `boolean`      | `true` for Remix Community Center variant bundles |

### `JojaBundle`

A Joja Mart community development form (alternative to the Community Center).

| Field         | Type          | Description                  |
| ------------- | ------------- | ---------------------------- |
| `id`          | `string`      | Unique identifier            |
| `type`        | `'joja mart'` | Discriminant                 |
| `name`        | `string`      | Project name                 |
| `description` | `string`      | Project description          |
| `goldCost`    | `number`      | Gold required                |
| `unlock`      | `string`      | What is unlocked on purchase |

> `JojaBundle` has no `room`, `image`, `reward`, or `remixBundle` fields.

### `Bundle`

```ts
type Bundle = ItemBundle | GoldBundle | JojaBundle;
```

---

## Factory

```ts
import { bundles } from "stardew-valley-data";

bundles(); // all bundles
bundles(source); // wrap a pre-filtered Bundle[]
```

---

## Query methods

### Filters

#### `.byRoom(room: BundleRoom)`

Filter `ItemBundle` and `GoldBundle` entries by room. `JojaBundle` entries are excluded.

```ts
bundles().byRoom("pantry").get();
bundles().byRoom("vault").get();
```

#### `.remix()`

Returns the Remix Community Center bundle set — `ItemBundle` and `GoldBundle` only. For each
`bundleGroup` within a room, the remix variant(s) are returned if they exist; otherwise the standard
entry is returned. This eliminates duplicates so you never see both the standard and remix version
of the same slot.

```ts
bundles().remix().get();
bundles().remix().byRoom("pantry").get();
```

#### `.standard()`

Returns `ItemBundle` and `GoldBundle` entries where `remixBundle === false`. Excludes `JojaBundle`
entries.

```ts
bundles().standard().get();
bundles().standard().byRoom("crafts-room").get();
```

#### `.itemBundles()`

Only `ItemBundle` entries (type `'items'`).

```ts
bundles().itemBundles().get();
```

#### `.goldBundles()`

Only `GoldBundle` entries (type `'gold'`).

```ts
bundles().goldBundles().get();
```

#### `.jojaBundles()`

Only `JojaBundle` entries (type `'joja mart'`).

```ts
bundles().jojaBundles().get();
```

#### `.sortByName(order?: 'asc' | 'desc')`

Sort alphabetically by name. Defaults to `'asc'`.

```ts
bundles().sortByName("desc").get();
```

---

### Terminal methods

| Method              | Returns               | Description                 |
| ------------------- | --------------------- | --------------------------- |
| `.get()`            | `Bundle[]`            | All results                 |
| `.first()`          | `Bundle \| undefined` | First result                |
| `.find(id)`         | `Bundle \| undefined` | Find by `id`                |
| `.findByName(name)` | `Bundle \| undefined` | Case-insensitive name match |
| `.count()`          | `number`              | Number of results           |

---

## Examples

```ts
import { bundles } from "stardew-valley-data";
// Bundles with item quality requirements
import { ItemBundle } from "stardew-valley-data";

// All standard pantry bundles
bundles().standard().byRoom("pantry").get();

// Count of remix bundles
bundles().remix().count();

// Find a specific bundle
bundles().find("spring-crops");
bundles().findByName("Spring Crops Bundle");

// All gold bundles (vault)
bundles().goldBundles().get();

// All Joja Mart projects
bundles().jojaBundles().get();

const itemBundles = bundles().itemBundles().get() as ItemBundle[];
const qualityBundles = itemBundles.filter((b) =>
  b.items.some((item) => item.quality !== undefined),
);

// Bundles where items are randomly chosen
const randomBundles = itemBundles.filter((b) => b.itemsChosenRandom);
```
