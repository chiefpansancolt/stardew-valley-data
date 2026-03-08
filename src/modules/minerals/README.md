# Minerals

All minerals, ores, bars, geode containers, mining nodes, and resources in Stardew Valley — gems,
geode minerals, foraged crystals, the four geode types, smelting ores, furnace bars, breakable
mining nodes, and raw resources like Coal. 96 items are included (53 minerals + 4 geode containers

- 5 ores + 6 bars + 27 nodes + 1 resource).

---

## Types

Minerals use a discriminated union on the `kind` field.

### `MineralItem` (kind: 'mineral')

Donatable minerals that can be found in the mines, geodes, or by panning.

| Field           | Type      | Description                           |
| --------------- | --------- | ------------------------------------- |
| id              | string    | Kebab-case identifier                 |
| name            | string    | Display name                          |
| kind            | 'mineral' | Discriminant                          |
| description     | string    | Flavour text shown in-game            |
| sellPrice       | number    | Base sell price in gold               |
| gemologistPrice | number    | Sell price with Gemologist profession |
| locations       | string[]  | Where to find this mineral            |
| image           | string    | Path to the item's icon               |

### `GeodeContainer` (kind: 'geode')

The four breakable geode containers (Geode, Frozen Geode, Magma Geode, Omni Geode).

| Field       | Type     | Description                        |
| ----------- | -------- | ---------------------------------- |
| id          | string   | Kebab-case identifier              |
| name        | string   | Display name                       |
| kind        | 'geode'  | Discriminant                       |
| description | string   | Flavour text shown in-game         |
| sellPrice   | number   | Base sell price in gold            |
| locations   | string[] | Where to find this geode container |
| image       | string   | Path to the item's icon            |

### `OreItem` (kind: 'ore')

Smelting ores mined in caves and dungeons.

| Field       | Type     | Description                |
| ----------- | -------- | -------------------------- |
| id          | string   | Kebab-case identifier      |
| name        | string   | Display name               |
| kind        | 'ore'    | Discriminant               |
| description | string   | Flavour text shown in-game |
| sellPrice   | number   | Base sell price in gold    |
| locations   | string[] | Where to find this ore     |
| image       | string   | Path to the item's icon    |

### `BarItem` (kind: 'bar')

Smelted metal bars produced in a furnace from ores.

| Field        | Type          | Description                 |
| ------------ | ------------- | --------------------------- |
| id           | string        | Kebab-case identifier       |
| name         | string        | Display name                |
| kind         | 'bar'         | Discriminant                |
| description  | string        | Flavour text shown in-game  |
| sellPrice    | number        | Base sell price in gold     |
| smeltRecipes | SmeltRecipe[] | One or more furnace recipes |
| image        | string        | Path to the item's icon     |

### `SmeltRecipe`

A furnace recipe used to smelt a bar.

| Field       | Type   | Description                               |
| ----------- | ------ | ----------------------------------------- |
| ore         | string | id of the source ore or mineral           |
| oreQty      | number | Number of ore items required              |
| coalQty     | number | Number of coal items required             |
| timeMinutes | number | Smelting time in minutes                  |
| outputQty   | number | Output quantity (optional, defaults to 1) |

### `NodeItem` (kind: 'node')

Mining nodes that drop ore, gems, geodes, or other items when broken.

| Field       | Type           | Description                           |
| ----------- | -------------- | ------------------------------------- |
| id          | string         | Kebab-case identifier                 |
| name        | string         | Display name                          |
| kind        | 'node'         | Discriminant                          |
| description | string \| null | Flavour text (null for generic nodes) |
| drops       | NodeDrop[]     | Items dropped when broken             |
| miningXP    | number         | Mining XP awarded on break            |
| locations   | string[]       | Where to find this node               |
| image       | string         | Path to the node's icon               |

### `NodeDrop`

A single drop entry from a mining node.

| Field    | Type   | Description                                   |
| -------- | ------ | --------------------------------------------- |
| item     | string | Name of the dropped item                      |
| quantity | string | Drop quantity or range (e.g. `"1-3"`, `"1+"`) |
| chance   | string | Optional drop chance (e.g. `"25%"`)           |

### `ResourceItem` (kind: 'resource')

Raw mining resources such as Coal that are obtained from mining but are not ores or gems.

| Field       | Type       | Description                   |
| ----------- | ---------- | ----------------------------- |
| id          | string     | Kebab-case identifier         |
| name        | string     | Display name                  |
| kind        | 'resource' | Discriminant                  |
| description | string     | Flavour text shown in-game    |
| sellPrice   | number     | Base sell price in gold       |
| locations   | string[]   | Where to obtain this resource |
| image       | string     | Path to the item's icon       |

`Mineral` is `MineralItem | GeodeContainer | OreItem | BarItem | NodeItem | ResourceItem`.

---

## Factory

```ts
import { minerals } from "stardew-valley-data";

minerals(); // all 68 minerals, geodes, ores, and bars
minerals(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.mineralItems()`

Filter to donatable mineral items only (excludes geode containers).

```ts
minerals().mineralItems().get();
```

#### `.geodes()`

Filter to geode containers only (Geode, Frozen Geode, Magma Geode, Omni Geode).

```ts
minerals().geodes().get();
```

#### `.ores()`

Filter to ore items only (Copper Ore, Iron Ore, Gold Ore, Iridium Ore, Radioactive Ore).

```ts
minerals().ores().get();
```

#### `.bars()`

Filter to smelted bar items only (Copper Bar, Iron Bar, Gold Bar, Iridium Bar, Radioactive Bar,
Refined Quartz).

```ts
minerals().bars().get();
```

#### `.nodes()`

Filter to mining node entries only.

```ts
minerals().nodes().get();
minerals().nodes().sortByName().get();
```

#### `.resources()`

Filter to resource items (e.g. Coal).

```ts
minerals().resources().get();
// [{ id: 'coal', name: 'Coal', sellPrice: 15, ... }]
```

#### `.fromGeode(geodeType: string)`

Filter to minerals found in a specific geode type. Case-insensitive substring match on location
strings.

```ts
minerals().fromGeode("Frozen Geode").mineralItems().get();
minerals().fromGeode("Magma Geode").sortBySellPrice().get();
```

### Sorts

#### `.sortByName(order?: 'asc' | 'desc')`

Sort alphabetically by name. Defaults to `'asc'`.

#### `.sortBySellPrice(order?: 'asc' | 'desc')`

Sort by sell price. Defaults to `'desc'` (most valuable first).

---

### Terminal methods

| Method              | Returns                | Description                 |
| ------------------- | ---------------------- | --------------------------- |
| `.get()`            | `Mineral[]`            | All results                 |
| `.first()`          | `Mineral \| undefined` | First result                |
| `.find(id)`         | `Mineral \| undefined` | Find by `id`                |
| `.findByName(name)` | `Mineral \| undefined` | Case-insensitive name match |
| `.count()`          | `number`               | Number of results           |

---

## Examples

```ts
import { minerals } from "stardew-valley-data";

// All minerals sorted by sell price
minerals().mineralItems().sortBySellPrice().get();

// Most valuable gem
minerals().mineralItems().sortBySellPrice().first();
// { id: 'prismatic-shard', name: 'Prismatic Shard', sellPrice: 2000, ... }

// All minerals found in Frozen Geodes
minerals().fromGeode("Frozen Geode").mineralItems().sortByName().get();

// The four geode containers
minerals().geodes().get();

// Look up a gem by id
minerals().find("diamond");
// { id: 'diamond', name: 'Diamond', sellPrice: 750, gemologistPrice: 974, ... }

// Minerals from Magma Geodes sorted by value
minerals().fromGeode("Magma Geode").mineralItems().sortBySellPrice().get();
```
