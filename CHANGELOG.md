# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.0] - 2026-03-19

### Added

- `ArtisanCalculator` class and `artisanCalculator()` factory added to the `calculator` module —
  covers Roe, Aged Roe, Honey, Wine, Juice, Pickles, Jelly, Dried Mushrooms, Dried Fruit, and Smoked
  Fish; returns sell price and (where applicable) energy/health values
- `ArtisanResult` and `ArtisanEnergyResult` types added to `src/types/calculator.ts`
- `ArtisanUses` interface added to `src/types/common.ts` —
  `{ honey, wine, juice, pickles, jelly, driedMushrooms, driedFruit: boolean }`
- `artisanUses: ArtisanUses` field added to all crops (`data/crops.json`, `Crop` type), all
  forageables (`data/forageables.json`, `Forageable` type), and all fruit tree produce
  (`data/trees.json`, `FruitTreeProduce` type)
- `canSmoke: boolean` field added to all 77 fish in `data/fish.json` and `Fish` type — `true` for
  all rod-caught fish except Seaweed, Green Algae, and White Algae
- `byArtisanUse(use: keyof ArtisanUses)` filter method added to `CropQuery`, `ForageableQuery`, and
  `TreeQuery`
- `sample/artisan-uses/` — new cross-module sample showing all items grouped by artisan use across
  crops, forageables, and fruit trees
- Cactus Fruit added to `data/forageables.json` (id `90`; fruit — wine, jelly, driedFruit)
- Tea Leaves moved from `data/forageables.json` to `data/crops.json` — vegetable,
  spring/summer/fall, 20-day grow / 1-day regrow, juice and pickles artisan uses; growth stage
  images added to `images/crops/tea-leaves/`
- Added `Energy.png`, `Health.png`, and `Poison.png` icon images (20×20) to `images/misc/`
- `maxQuality` field (`ItemQuality`) added to all farm animal produce and deluxe produce in
  `data/animals.json` and `AnimalProduce` type
- `maxQuality` field added to all artisan goods in `data/artisan-goods.json` and `ArtisanGood` type
  — `'iridium'` for cask-ageable goods, `'base'` for all others
- `maxQuality` field added to all forageables in `data/forageables.json` and `Forageable` type —
  `'iridium'` for foraged items, `'base'` for resources (Wood, Stone, Sap, etc.)
- `maxQuality` field added to all crops in `data/crops.json` and `Crop` type — `'iridium'` for all
  crops except Fiber (`'base'`)
- `ItemQuality` shared type (`'base' | 'silver' | 'gold' | 'iridium'`) added to
  `src/types/common.ts`; used across `AnimalProduce`, `ArtisanGood`, `Crop`, `Forageable`, and
  `Fish` types
- `data/fish.json` — `maxQuality` field added to all fish entries (already typed, now present in
  data)

### Changed

- Tea Leaves removed from `data/forageables.json`; consolidated to `data/crops.json`
- `images/forageables/Tea Leaves.png` and `images/craftable/seeds/Tea Sapling.png` removed —
  replaced by unified images under `images/crops/tea-leaves/`; `data/crafting.json` reference
  updated accordingly
- `FishQuality` type removed from `src/types/fish.ts`; `maxQuality` now uses the shared
  `ItemQuality` type
- `tsconfig.json` — enabled `noUnusedLocals` and `noUnusedParameters` for stricter compile-time
  checks

### Documentation

- `src/modules/calculator/README.md` — added `ArtisanCalculator` methods, formulas, and examples
- `src/modules/crops/README.md` — added `byArtisanUse` filter and `artisanUses` fields table rows
- `src/modules/forageables/README.md` — added `byArtisanUse` filter and `artisanUses` fields table
  rows
- `src/modules/trees/README.md` — added `byArtisanUse` filter and `produce.artisanUses` fields table
  rows; added example usage
- `src/modules/fish/README.md` — added `canSmoke` row to fish fields table
- `src/modules/animals/README.md` — added `produce.maxQuality` and `deluxeProduce.maxQuality` rows
  to farm animal fields table
- `src/modules/artisan-goods/README.md` — added `energyHealth` and `maxQuality` rows to fields table
- `src/modules/crops/README.md` — added `maxQuality` row to crop fields table
- `src/modules/fish/README.md` — added `energyHealth` and `maxQuality` rows to fish fields table
- `src/modules/forageables/README.md` — added `energyHealth` and `maxQuality` rows to forageable
  fields table

### Chore

- Renamed internal data constants from `all*Data` to `*Data` pattern across 7 modules (`fish`,
  `forageables`, `cooking`, `bait`, `footwear`, `tackle`, `pierre-shop`) per naming conventions
- Fixed sort methods in `bait`, `tackle`, and `cooking` modules to use inline
  `return new XxxQuery([...this.data].sort(...))` style for consistency
- Moved filter methods before sort methods in `cooking` module to match ordering convention
- Added JSDoc to filter/sort methods in `hats`, `footwear`, `weather`, `maps`, `weapon-stats`,
  `bait`, and `tackle` modules
- Added `DayOfWeek` and `TraderShopItem` shared types to `src/types/common.ts`; five duplicate
  day-of-week unions (`CarpenterDay`, `DesertTraderDay`, `IslandTraderDay`, `OasisDay`,
  `LocationDay`) are now type aliases
- `DesertTraderItem` and `IslandTraderItem` are now aliases for the shared `TraderShopItem` type,
  removing an identical 11-field interface duplicated across two files
- `CraftingIngredient` is now a type alias for the existing `Ingredient` type in `common.ts`,
  removing a structurally identical duplicate interface

## [0.8.0] - 2026-03-18

### Fix

- Fix Parser of Cooking Recipes to properly show cooked count

## [0.7.0] - 2026-03-18

### Fix

- Fix Collection lists using wrong Ids

## [0.6.0] - 2026-03-18

### Added

- Added FishingPole Level to Parser tool

## [0.5.1] - 2026-03-18

### Fix

- Fix Typo in Wild Seed names to use abbreviated name over full

## [0.5.0] - 2026-03-18

### Breaking Changes

- Change Fishing Rod structure to show in an array over individual items.

### Added

- Added new text for Skill unlocks of Additional for Fishing and Foraging details.

### Fix

- Fix Skills showing wrong item unlocks per level
- Fix Trash can showing as enchantable
- Fix Copper Pan text to Pan name
- Add missing millisecondsPlayed to parser

### Chore

- Bump Dependencies

## [0.4.0] - 2026-03-15

### Breaking Changes

- Change many of the output modules for parsing the file.

## [0.3.0] - 2026-03-15

### Fix

- Add missing Villager Events

## [0.2.0] - 2026-03-10

### Added

#### Core Architecture

- Query builder pattern with `QueryBase<T>` abstract base class providing 5 terminal methods:
  `get()`, `first()`, `find()`, `findByName()`, `count()`
- All query classes return new instances on filter/sort for immutable chaining
- Dual module output (ESM + CommonJS) with TypeScript declarations via tsup
- Path alias system (`@/types`, `@/common/*`, `@/data/*`, `@/modules/*`)
- 1,912 bundled image assets organized across 37 subfolders
- 67 structured JSON data files with ~1,870 total entries

#### Data Modules (68 total)

- **Items & Equipment**: bait (7), tackle (10), footwear (18), hats (122), rings (30), tools (21),
  weapons (62), weapon-stats (5), trinkets (8), special-items (41)
- **Farming & Nature**: crops (46), trees (14 — fruit + wild via discriminated union), artisan-goods
  (27), animals (27 — pets + farm animals via discriminated union), mixed-seeds (2), seasons (4)
- **Fishing**: fish (77)
- **Foraging & Mining**: forageables (48), minerals (97), artifacts (42)
- **Cooking & Crafting**: cooking (81), crafting (150)
- **Combat**: monsters (44), monster-loot (5), monster-slayer-goals (12 — with validated monster
  target lists)
- **NPCs & Social**: villagers (34), universal-gifts, events (100), quests (58), special-orders (28)
- **Progression**: achievements (49), skills (5), professions (30), perfection (11), stardrops (7),
  golden-walnuts (69), secret-notes (38), lost-books (21), collections, bundles (61 — standard +
  remix variants)
- **Shops** (18 modules): pierre (54), saloon (16), blacksmith (4), carpenter (21), marnie (14),
  willy (24), krobus (16), guild (38), casino (13), desert-trader (26), oasis (16), volcano (10),
  island-trader (23), dwarf (11), joja (34), qi (27), bookseller, medical-supplies (2)
- **World & Locations**: locations (38), maps (8), buildings (23), weather (9), farmhouse
  (upgrades + renovations), field-office (4 collections, 9 donations), concessions (24)
- **Calculators**: quality calculator (sell price and energy/health scaling by quality tier),
  grandpa evaluator (score 0–21 across 7 categories, candles 1–4)
- **Search**: global `search(query, kinds?)` function across all modules with deduplication and
  parent tracking
- **Save File**: `parseSaveFile(xml)` parser with versioned parser sets for extracting player data
  from XML save files

#### Utility Functions

- `isPet()` / `isFarmAnimal()` type guards for the Animal discriminated union
- `calculateArtisanPrice()` / `applyPriceFormula()` for artisan good pricing
- `getTitleScore()` / `getTitle()` / `getMasteryLevel()` for skill progression calculations

#### Testing & Validation

- 98 test files with ~8,700 lines of test code covering all modules
- Sample runner system with 68 sub-runners validating image paths and exercising query logic
- Sample output capture to `sample/output/` with per-module `.txt` files and `summary.txt`
