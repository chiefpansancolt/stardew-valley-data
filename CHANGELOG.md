# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.5.0] - 2026-03-18

### Breaking Changes

- Change Fishing Rod structure to show in an array over individual items.

### Added

- Added new text for Skill unlocks of Additional for Fishing and Foraging details.

### Fix

- Fix Skills showing wrong item unlocks per level
- Fix Trash can showing as enchantable
- Fix Copper Pan text to Pan name
- Add missing millisecondsPlayed to parser

## [v0.4.0] - 2026-03-15

### Breaking Changes

- Change many of the output modules for parsing the file.

## [v0.3.0] - 2026-03-15

### Fix

- Add missing Villager Events

## [v0.2.0] - 2026-03-10

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
