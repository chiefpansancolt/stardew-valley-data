# Development Guide

This guide walks through the architecture, conventions, and step-by-step process for working with
this repository.

## Architecture Overview

```
src/
  index.ts                    # Re-exports all modules and types
  common/
    query-base.ts             # QueryBase<T> abstract base class
  types/
    index.ts                  # Re-exports all type files
    common.ts                 # Shared types (Season, EnergyHealth, etc.)
    <module>.ts               # Per-module type definitions
  modules/
    <module>/
      index.ts                # Query class + factory function
      README.md               # Full API documentation

data/
  <module>.json               # Flat JSON arrays of game data

images/
  <category>/                 # Bundled image assets

sample/
  index.ts                    # Master runner
  capture.ts                  # Output capture utility
  <module>/
    index.ts                  # Per-module validation script

tests/
  modules/
    <module>.test.ts          # Per-module test file
```

## Query Builder Pattern

Every data module follows the same pattern built on `QueryBase<T>`:

### QueryBase provides 5 terminal methods

```ts
abstract class QueryBase<T extends { id: string; name: string }> {
  get(): T[]; // All results as array
  first(): T | undefined; // First result
  find(id: string): T | undefined; // Exact ID match
  findByName(name: string): T | undefined; // Case-insensitive name match
  count(): number; // Result count
}
```

### Rules

1. **Filter methods** return `new XxxQuery(filteredData)` — never mutate
2. **Sort methods** return `new XxxQuery(sortedData)` — never mutate
3. **Terminal methods** return data or primitives — end the chain
4. The internal data const must not shadow the factory function name (e.g. `allBaitData`, not
   `bait`)
5. Factory functions accept an optional `source` parameter for wrapping pre-filtered arrays

## Naming Conventions

| Thing               | Convention                       | Example                           |
| ------------------- | -------------------------------- | --------------------------------- |
| Factory function    | Domain noun (camelCase)          | `bait()`, `crops()`, `fish()`     |
| Query class         | PascalCase + `Query`             | `BaitQuery`, `CropQuery`          |
| Type interface      | PascalCase domain noun           | `Bait`, `Crop`, `Fish`            |
| Data file           | kebab-case                       | `bait.json`, `artisan-goods.json` |
| Type file           | kebab-case matching data file    | `bait.ts`, `artisan-good.ts`      |
| Module folder       | kebab-case matching data file    | `bait/`, `artisan-goods/`         |
| Shop data files     | `-shop` suffix                   | `blacksmith-shop.json`            |
| Internal data const | descriptive, avoids factory name | `allBaitData`, `cropData`         |

## Import Conventions

```ts
// Within src/ — use path aliases
import { QueryBase } from "@/common/query-base";
import baitData from "@/data/bait.json";
import { Bait } from "@/types";
// Cross-module imports (e.g. search → animals) — use relative paths
import { animals } from "../animals";

// Never use @/modules/ for cross-module imports
```

## Adding a New Data Module

This walkthrough uses a hypothetical **"furniture"** module as an example.

### Step 1: Define the type

Create `src/types/furniture.ts`:

```ts
export interface Furniture {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}
```

**Rules:**

- `id` and `name` are required (QueryBase constraint)
- Use `string | null` for fields that are genuinely absent for some entries
- Use `?` optional fields only when data is genuinely missing for some entries
- Add shared types (Season, EnergyHealth, etc.) to `common.ts` if they don't already exist

Register in `src/types/index.ts`:

```ts
export * from "./furniture";
```

### Step 2: Create the data file

Create `data/furniture.json`:

```json
[
  {
    "id": "1226",
    "name": "Oak Table",
    "category": "table",
    "price": 350,
    "image": "images/furniture/Oak Table.png"
  }
]
```

**Rules:**

- Flat JSON array
- IDs come from the game's internal data files (Objects.json, etc.)
- Image paths are relative to the package root
- Game source files go in `tmp/Data/` (not committed) for validation

### Step 3: Create the query module

Create `src/modules/furniture/index.ts`:

```ts
import { QueryBase } from "@/common/query-base";
import furnitureData from "@/data/furniture.json";
import { Furniture } from "@/types";

const allFurnitureData: Furniture[] = furnitureData as Furniture[];

/** Query builder for furniture data. All filter and sort methods return a new FurnitureQuery for chaining. */
export class FurnitureQuery extends QueryBase<Furniture> {
  constructor(data: Furniture[] = allFurnitureData) {
    super(data);
  }

  /** Filter by furniture category. */
  byCategory(category: string): FurnitureQuery {
    return new FurnitureQuery(this.data.filter((f) => f.category === category));
  }

  /** Sort by price. Default: `'desc'` (most expensive first). */
  sortByPrice(order: "asc" | "desc" = "desc"): FurnitureQuery {
    return new FurnitureQuery(
      [...this.data].sort((a, b) => (order === "asc" ? a.price - b.price : b.price - a.price)),
    );
  }

  /** Sort alphabetically by name. Default: `'asc'`. */
  sortByName(order: "asc" | "desc" = "asc"): FurnitureQuery {
    return new FurnitureQuery(
      [...this.data].sort((a, b) =>
        order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }
}

/** Returns a FurnitureQuery for all furniture data. Pass `source` to wrap a pre-filtered array. */
export function furniture(source: Furniture[] = allFurnitureData): FurnitureQuery {
  return new FurnitureQuery(source);
}
```

**Key patterns:**

- Class-level JSDoc:
  `/** Query builder for X data. All filter and sort methods return a new XQuery for chaining. */`
- Factory JSDoc: `/** Returns an XQuery for all X data. Pass \`source\` to wrap a pre-filtered
  array. \*/`
- Filter/sort methods always spread `[...this.data]` before sorting
- Return `new FurnitureQuery(...)`, never `this`

### Step 4: Register the module export

Add to `src/index.ts`:

```ts
export * from "./modules/furniture";
```

### Step 5: Create the module README

Create `src/modules/furniture/README.md`:

```md
# Furniture

All furniture items in Stardew Valley. X items included.

---

## Type

### `Furniture`

| Field      | Type     | Description                        |
| ---------- | -------- | ---------------------------------- |
| `id`       | `string` | Game-internal ID from Objects.json |
| `name`     | `string` | Display name                       |
| `category` | `string` | Furniture category                 |
| `price`    | `number` | Purchase price in gold             |
| `image`    | `string` | Path to the item's icon            |

---

## Factory

\`\`\`ts import { furniture } from "stardew-valley-data";

furniture(); // all items furniture(source); // wrap a pre-filtered array \`\`\`

---

## Methods

### Filters

#### `.byCategory(category: string)`

Filter by furniture category.

### Sorts

#### `.sortByPrice(order?: 'asc' | 'desc')`

Sort by price. Defaults to `'desc'` (most expensive first).

#### `.sortByName(order?: 'asc' | 'desc')`

Sort alphabetically. Defaults to `'asc'`.

---

### Terminal methods

| Method              | Returns                  | Description                 |
| ------------------- | ------------------------ | --------------------------- |
| `.get()`            | `Furniture[]`            | All results                 |
| `.first()`          | `Furniture \| undefined` | First result                |
| `.find(id)`         | `Furniture \| undefined` | Find by `id`                |
| `.findByName(name)` | `Furniture \| undefined` | Case-insensitive name match |
| `.count()`          | `number`                 | Number of results           |

---

## Examples

\`\`\`ts import { furniture } from "stardew-valley-data";

// All tables sorted by price furniture().byCategory("table").sortByPrice().get();

// Cheapest furniture furniture().sortByPrice("asc").first();

// Look up by name furniture().findByName("Oak Table"); \`\`\`
```

### Step 6: Add images

Place image files in `images/furniture/`:

```
images/furniture/Oak Table.png
images/furniture/Birch Table.png
...
```

Image paths in the JSON must match exactly (case-sensitive).

### Step 7: Create the sample script

Create `sample/furniture/index.ts`:

```ts
import * as fs from "fs";
import * as path from "path";
import { furniture } from "@/modules/furniture";

const root = path.resolve(__dirname, "../../");

function checkImage(imagePath: string): boolean {
  return fs.existsSync(path.join(root, imagePath));
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log("\n=== FURNITURE ===\n");

  const all = furniture().sortByName().get();
  console.log(`Total: ${all.length} furniture items\n`);

  for (const item of all) {
    console.log(`  ${item.name} — ${item.price}g | ${item.category}`);
  }

  console.log("\n--- Image validation ---");

  for (const item of all) {
    if (checkImage(item.image)) {
      passed++;
    } else {
      failed++;
      console.log(`  MISSING: ${item.image}`);
    }
  }

  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log("\n" + "─".repeat(60));
  return { passed, failed };
}
```

**Rules:**

- Export `run(): { passed: number; failed: number }`
- Use `@/modules/furniture` import (not raw JSON)
- End output with `--- Image validation ---`, counts line, and separator
- Validate every image path with `fs.existsSync`

### Step 8: Register in the sample runner

In `sample/index.ts`, add the import and wrap with `captureRun`:

```ts
import { run as runFurniture } from "./furniture";

// In the results array:
results.push({ name: "furniture", ...captureRun("furniture", runFurniture) });
```

### Step 9: Add to the search module

In `src/modules/search/index.ts`, import the factory and add items to the search index:

```ts
import { furniture } from "../furniture";

// Inside the search function, add:
for (const item of furniture().get()) {
  if (matches(query, item.id, item.name)) {
    add({ kind: "furniture", ...item });
  }
}
```

If the module has nested items (e.g. a furniture piece has sub-components with their own
`id`/`name`/`image`), add those with a `parent` reference:

```ts
add({
  kind: "furniture-component",
  id: component.id,
  name: component.name,
  image: component.image,
  parent: { id: item.id, name: item.name },
});
```

Don't forget to add the new kind(s) to the `SearchResultKind` type in `src/types/search.ts`.

### Step 10: Write tests

Create `tests/modules/furniture.test.ts`:

```ts
import { furniture, FurnitureQuery } from "../../src/modules/furniture";

describe("furniture", () => {
  it("returns all furniture", () => {
    const all = furniture().get();
    expect(all.length).toBeGreaterThan(0);
  });

  it("find returns correct item", () => {
    const item = furniture().find("1226");
    expect(item).toBeDefined();
    expect(item!.name).toBe("Oak Table");
  });

  it("findByName is case-insensitive", () => {
    const item = furniture().findByName("oak table");
    expect(item).toBeDefined();
    expect(item!.id).toBe("1226");
  });

  it("byCategory filters correctly", () => {
    const tables = furniture().byCategory("table").get();
    expect(tables.every((f) => f.category === "table")).toBe(true);
  });

  it("sortByPrice sorts descending by default", () => {
    const sorted = furniture().sortByPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].price).toBeGreaterThanOrEqual(sorted[i].price);
    }
  });

  it("returns new instance on filter", () => {
    const original = furniture();
    const filtered = original.byCategory("table");
    expect(filtered).toBeInstanceOf(FurnitureQuery);
    expect(filtered).not.toBe(original);
  });
});
```

### Step 11: Format and validate

```bash
pnpm format          # Format all files
pnpm lint            # Type-check + ESLint
pnpm test            # Run test suite
pnpm sample          # Validate images + exercise queries
```

## Checklist Summary

When adding a new module, make sure you've touched all of these:

- [ ] `src/types/<module>.ts` — type interface
- [ ] `src/types/index.ts` — re-export the type
- [ ] `data/<module>.json` — data file
- [ ] `src/modules/<module>/index.ts` — query class + factory
- [ ] `src/modules/<module>/README.md` — API documentation
- [ ] `src/index.ts` — re-export the module
- [ ] `images/<category>/` — image assets
- [ ] `sample/<module>/index.ts` — sample/validation script
- [ ] `sample/index.ts` — register in master runner
- [ ] `src/modules/search/index.ts` — add to global search
- [ ] `src/types/search.ts` — add SearchResultKind (if new kind)
- [ ] `tests/modules/<module>.test.ts` — test file
- [ ] Run `pnpm format && pnpm lint && pnpm test && pnpm sample`

## Discriminated Unions

Some modules use discriminated unions for heterogeneous data:

```ts
// Tree = FruitTree | WildTree
export type Tree = FruitTree | WildTree;

interface FruitTree {
  type: "fruit-tree";
  // fruit-tree specific fields...
}

interface WildTree {
  type: "wild-tree";
  // wild-tree specific fields...
}
```

The same pattern is used for `Animal` (Pet | FarmAnimal) and `Bundle` (ItemBundle | GoldBundle |
JojaBundle).

Use type guards for narrowing:

```ts
import { isFarmAnimal, isPet } from "stardew-valley-data";

if (isPet(animal)) {
  // TypeScript knows this is a Pet
}
```

## Special Module Patterns

### Modules without QueryBase

- **universal-gifts** — returns a plain object, not a query builder
- **grandpa** — pure calculator with `evaluate()` method, no data file
- **search** — flat function `search(query, kinds?)`, not a query builder
- **save-file** — XML parser `parseSaveFile(xml)`, separate from the module system

### Modules with multiple query classes

- **monsters** — `MonsterQuery` + `MonsterLootQuery` with two factories: `monsters()` +
  `monsterLoot()`
- **farmhouse** — `HouseUpgradeQuery` + `HouseRenovationQuery`
- **field-office** — `FieldOfficeQuery` + `FieldOfficeDonationsQuery`

### Modules with utility exports

- **animals** — `isPet()`, `isFarmAnimal()` type guards
- **artisan-goods** — `calculateArtisanPrice()`, `applyPriceFormula()`
- **skills** — `getTitleScore()`, `getTitle()`, `getMasteryLevel()`, `SKILL_TITLES`,
  `MASTERY_LEVELS`

## Scripts Reference

| Command              | Description                               |
| -------------------- | ----------------------------------------- |
| `pnpm build`         | Build with tsup (ESM + CJS + .d.ts)       |
| `pnpm dev`           | Build in watch mode                       |
| `pnpm lint`          | `tsc --noEmit && eslint .`                |
| `pnpm format`        | Prettier write (_.ts, _.md, \*.json)      |
| `pnpm format:check`  | Prettier check (no write)                 |
| `pnpm test`          | Jest test suite                           |
| `pnpm test:watch`    | Jest in watch mode                        |
| `pnpm test:coverage` | Jest with coverage report                 |
| `pnpm sample`        | Run all sample scripts + image validation |
| `pnpm typecheck`     | TypeScript type-check only                |
