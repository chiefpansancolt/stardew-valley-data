# Tools

All tools in Stardew Valley including upgradeable tools, fishing rods, simple tools, and backpack
upgrades.

---

## Types

### `ToolType`

```ts
type ToolType = "upgradeable" | "fishing-rod" | "simple" | "backpack";
```

### `ToolLevel`

```ts
type ToolLevel = "basic" | "copper" | "steel" | "gold" | "iridium";
```

### `UpgradeLevel`

A single upgrade tier for an `UpgradeableTool`.

| Field            | Type           | Description                                     |
| ---------------- | -------------- | ----------------------------------------------- |
| level            | ToolLevel      | Upgrade tier                                    |
| image            | string \| null | Path to tool image (`null` for basic Trash Can) |
| upgradeCost      | number \| null | Gold cost to upgrade (`null` for starter level) |
| materialName     | string \| null | Bar type required (e.g. `"Copper Bar"`)         |
| materialQuantity | number \| null | Number of bars required (always 5, or `null`)   |
| description      | string         | What this level does                            |

### `UpgradeableTool`

Tools upgraded at the Blacksmith (Clint). Includes: Hoe, Pickaxe, Axe, Watering Can, Trash Can,
Copper Pan.

| Field       | Type           | Description                                    |
| ----------- | -------------- | ---------------------------------------------- |
| id          | string         | Unique identifier                              |
| type        | 'upgradeable'  | Discriminant                                   |
| name        | string         | Tool name                                      |
| description | string         | Tool purpose                                   |
| canEnchant  | boolean        | Whether the tool can be enchanted at the Forge |
| levels      | UpgradeLevel[] | Upgrade tiers from starter to iridium          |

> The Copper Pan starts at `'copper'` level (no basic tier). The Trash Can basic level has
> `image: null` (no distinct image).

### `FishingRod`

Fishing poles purchased from Willy or obtained via Mastery.

| Field                | Type           | Description                                          |
| -------------------- | -------------- | ---------------------------------------------------- |
| id                   | string         | Unique identifier                                    |
| type                 | 'fishing-rod'  | Discriminant                                         |
| name                 | string         | Rod name                                             |
| description          | string         | Rod description                                      |
| image                | string         | Path to rod image                                    |
| cost                 | number \| null | Purchase price (`null` for mastery reward)           |
| fishingLevelRequired | number \| null | Minimum fishing level to purchase (`null` if none)   |
| bait                 | boolean        | Whether the rod supports bait                        |
| tackleSlots          | number         | Number of tackle slots (0, 1, or 2)                  |
| canEnchant           | boolean        | Whether the rod can be enchanted (Iridium rods only) |
| obtain               | string         | How to acquire the rod                               |

### `SimpleTool`

Single-version tools that cannot be upgraded.

| Field       | Type           | Description                           |
| ----------- | -------------- | ------------------------------------- |
| id          | string         | Unique identifier                     |
| type        | 'simple'       | Discriminant                          |
| name        | string         | Tool name                             |
| description | string         | Tool description                      |
| image       | string         | Path to tool image                    |
| cost        | number \| null | Purchase price (`null` if free/found) |
| obtain      | string         | How to acquire the tool               |

### `Backpack`

Inventory upgrade packs purchased from Pierre's General Store.

| Field       | Type       | Description            |
| ----------- | ---------- | ---------------------- |
| id          | string     | Unique identifier      |
| type        | 'backpack' | Discriminant           |
| name        | string     | Pack name              |
| description | string     | Pack description       |
| image       | string     | Path to pack image     |
| cost        | number     | Purchase price in gold |
| slots       | number     | Total inventory slots  |

### `Tool`

```ts
type Tool = UpgradeableTool | FishingRod | SimpleTool | Backpack;
```

---

## Factory

```ts
import { tools } from "stardew-valley-data";

tools(); // all tools
tools(source); // wrap a pre-filtered Tool[]
```

---

## Query methods

### Filters

#### `.byType(type: ToolType)`

Filter by tool type.

```ts
tools().byType("fishing-rod").get();
```

#### `.upgradeable()`

Only `UpgradeableTool` entries (Hoe, Pickaxe, Axe, Watering Can, Trash Can, Copper Pan).

```ts
tools().upgradeable().get();
```

#### `.fishingRods()`

Only `FishingRod` entries.

```ts
tools().fishingRods().get();
```

#### `.simple()`

Only `SimpleTool` entries (Scythe variants, Milk Pail, Shears, Heater, Auto-Grabber, Auto-Petter).

```ts
tools().simple().get();
```

#### `.backpacks()`

Only `Backpack` entries.

```ts
tools().backpacks().get();
```

#### `.canEnchant()`

Only tools that can be enchanted at the Forge (all upgradeable tools + Iridium Rod + Advanced
Iridium Rod).

```ts
tools().canEnchant().get();
```

#### `.sortByName(order?: 'asc' | 'desc')`

Sort alphabetically by name. Defaults to `'asc'`.

```ts
tools().sortByName("asc").get();
```

---

### Terminal methods

| Method              | Returns             | Description                 |
| ------------------- | ------------------- | --------------------------- |
| `.get()`            | `Tool[]`            | All results                 |
| `.first()`          | `Tool \| undefined` | First result                |
| `.find(id)`         | `Tool \| undefined` | Find by `id`                |
| `.findByName(name)` | `Tool \| undefined` | Case-insensitive name match |
| `.count()`          | `number`            | Number of results           |

---

## Examples

```ts
import { FishingRod, tools, UpgradeableTool } from "stardew-valley-data";
// Simple tools that are free (found or given)
import { SimpleTool } from "stardew-valley-data";

// All upgradeable tools with their levels
const upgradeable = tools().upgradeable().get() as UpgradeableTool[];
for (const tool of upgradeable) {
  const iridiumLevel = tool.levels.find((l) => l.level === "iridium");
  console.log(`${tool.name} iridium upgrade: ${iridiumLevel?.upgradeCost}g`);
}

// Find the iridium upgrade cost for the Hoe
const hoe = tools().find("hoe") as UpgradeableTool;
const iridium = hoe.levels.find((l) => l.level === "iridium");
// { level: 'iridium', upgradeCost: 25000, materialName: 'Iridium Bar', materialQuantity: 5, ... }

// All enchantable tools
tools().canEnchant().count(); // 8

// Fishing rods that support tackle
const tackleRods = tools().fishingRods().get() as FishingRod[];
tackleRods.filter((r) => r.tackleSlots > 0);
// Iridium Rod (1 slot), Advanced Iridium Rod (2 slots)

// Fishing rods available to buy (not mastery reward)
tackleRods.filter((r) => r.cost !== null);

// Cheapest backpack
tools().backpacks().sortByName().first();

const freeTools = tools().simple().get() as SimpleTool[];
freeTools.filter((t) => t.cost === null);
// Scythe, Golden Scythe, Iridium Scythe
```
