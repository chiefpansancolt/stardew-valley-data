# stardew-valley-data

A comprehensive, fully-typed dataset for Stardew Valley — structured JSON data, 1,900+ image assets,
and a chainable query builder API for game items, crops, fish, villagers, shops, and more.

## Installation

```bash
npm install stardew-valley-data
# or
pnpm add stardew-valley-data
# or
yarn add stardew-valley-data
```

## Quick Start

Every module exports a **factory function** that returns a chainable query builder.

```ts
import { crops, fish, search, villagers } from "stardew-valley-data";

// Get all spring crops sorted by sell price
crops().bySeason("spring").sortBySellPrice().get();

// Find a specific fish
fish().findByName("Sturgeon");

// Get marriageable villagers
villagers().marriageable().sortByName().get();

// Search across all modules
search("diamond");
```

## How It Works

All modules follow the same **query builder pattern** built on a shared `QueryBase<T>` class:

```ts
factory() // Start with all data
  .filterMethod() // Chain filters (returns new query)
  .sortMethod() // Chain sorts (returns new query)
  .terminalMethod(); // Get results
```

### Terminal Methods

Every query builder provides these 5 terminal methods:

| Method           | Returns          | Description                     |
| ---------------- | ---------------- | ------------------------------- |
| `.get()`         | `T[]`            | All results as an array         |
| `.first()`       | `T \| undefined` | First result                    |
| `.find(id)`      | `T \| undefined` | Find by exact ID                |
| `.findByName(n)` | `T \| undefined` | Find by name (case-insensitive) |
| `.count()`       | `number`         | Number of results               |

### Chaining

Filter and sort methods always return a **new query instance**, so you can chain freely without
mutation:

```ts
const springCrops = crops().bySeason("spring");
const cheapest = springCrops.sortBySellPrice("asc").first();
const count = springCrops.count();
```

## Modules

### Items & Equipment

| Module                                     | Factory      | Items | Description                        |
| ------------------------------------------ | ------------ | ----- | ---------------------------------- |
| [bait](src/modules/bait/README.md)         | `bait()`     | 7     | Fishing bait items                 |
| [tackle](src/modules/tackle/README.md)     | `tackle()`   | 10    | Fishing tackle attachments         |
| [footwear](src/modules/footwear/README.md) | `footwear()` | 18    | Boots and shoes                    |
| [hats](src/modules/hats/README.md)         | `hats()`     | 122   | Hats and headwear                  |
| [rings](src/modules/rings/README.md)       | `rings()`    | 30    | Rings and accessories              |
| [tools](src/modules/tools/README.md)       | `tools()`    | 21    | Tools with upgrade tiers           |
| [weapons](src/modules/weapons/README.md)   | `weapons()`  | 62    | Swords, daggers, clubs, slingshots |
| [trinkets](src/modules/trinkets/README.md) | `trinkets()` | 8     | Trinket accessories                |

### Farming & Nature

| Module                                               | Factory          | Items | Description                              |
| ---------------------------------------------------- | ---------------- | ----- | ---------------------------------------- |
| [crops](src/modules/crops/README.md)                 | `crops()`        | 46    | Crops with seasons, growth stages, seeds |
| [trees](src/modules/trees/README.md)                 | `trees()`        | 14    | Fruit trees and wild trees               |
| [animals](src/modules/animals/README.md)             | `animals()`      | 27    | Farm animals and pets                    |
| [artisan-goods](src/modules/artisan-goods/README.md) | `artisanGoods()` | 27    | Wine, cheese, jelly, etc.                |
| [mixed-seeds](src/modules/mixed-seeds/README.md)     | `mixedSeeds()`   | 2     | Mixed seed drop tables by season         |
| [seasons](src/modules/seasons/README.md)             | `seasons()`      | 4     | Season metadata                          |

### Fishing

| Module                             | Factory  | Items | Description                              |
| ---------------------------------- | -------- | ----- | ---------------------------------------- |
| [fish](src/modules/fish/README.md) | `fish()` | 77    | All fish with location, time, difficulty |

### Foraging & Mining

| Module                                           | Factory         | Items | Description                |
| ------------------------------------------------ | --------------- | ----- | -------------------------- |
| [forageables](src/modules/forageables/README.md) | `forageables()` | 48    | Forageable items by season |
| [minerals](src/modules/minerals/README.md)       | `minerals()`    | 97    | Ores, gems, geodes, nodes  |
| [artifacts](src/modules/artifacts/README.md)     | `artifacts()`   | 42    | Museum artifacts           |

### Cooking & Crafting

| Module                                     | Factory      | Items | Description              |
| ------------------------------------------ | ------------ | ----- | ------------------------ |
| [cooking](src/modules/cooking/README.md)   | `cooking()`  | 81    | Recipes with ingredients |
| [crafting](src/modules/crafting/README.md) | `crafting()` | 150   | Crafting recipes         |

### Combat

| Module                                                             | Factory                | Items | Description                          |
| ------------------------------------------------------------------ | ---------------------- | ----- | ------------------------------------ |
| [monsters](src/modules/monsters/README.md)                         | `monsters()`           | 44    | Monster stats, drops, locations      |
| [monsters](src/modules/monsters/README.md)                         | `monsterLoot()`        | 5     | Loot table categories                |
| [monster-slayer-goals](src/modules/monster-slayer-goals/README.md) | `monsterSlayerGoals()` | 12    | Adventurer's Guild eradication goals |
| [weapon-stats](src/modules/weapon-stats/README.md)                 | `weaponStats()`        | 5     | Weapon type stat ranges              |

### NPCs & Social

| Module                                                   | Factory            | Items | Description                     |
| -------------------------------------------------------- | ------------------ | ----- | ------------------------------- |
| [villagers](src/modules/villagers/README.md)             | `villagers()`      | 34    | Villagers with gifts, schedules |
| [universal-gifts](src/modules/universal-gifts/README.md) | `universalGifts()` | —     | Universal gift preferences      |
| [events](src/modules/events/README.md)                   | `events()`         | 100   | Heart events, festivals         |
| [quests](src/modules/quests/README.md)                   | `quests()`         | 58    | Quest details                   |
| [special-orders](src/modules/special-orders/README.md)   | `specialOrders()`  | 28    | Town + Qi special orders        |

### Progression

| Module                                                 | Factory           | Items | Description                        |
| ------------------------------------------------------ | ----------------- | ----- | ---------------------------------- |
| [achievements](src/modules/achievements/README.md)     | `achievements()`  | 49    | Steam/game achievements            |
| [skills](src/modules/skills/README.md)                 | `skills()`        | 5     | Skill levels + title calculations  |
| [professions](src/modules/professions/README.md)       | `professions()`   | 30    | Profession trees per skill         |
| [bundles](src/modules/bundles/README.md)               | `bundles()`       | 61    | Community Center bundles (+ remix) |
| [perfection](src/modules/perfection/README.md)         | `perfection()`    | 11    | Perfection tracker categories      |
| [stardrops](src/modules/stardrops/README.md)           | `stardrops()`     | 7     | Stardrop locations                 |
| [golden-walnuts](src/modules/golden-walnuts/README.md) | `goldenWalnuts()` | 69    | Golden Walnut sources              |
| [secret-notes](src/modules/secret-notes/README.md)     | `secretNotes()`   | 38    | Secret note contents               |
| [lost-books](src/modules/lost-books/README.md)         | `lostBooks()`     | 21    | Lost book contents                 |
| [collections](src/modules/collections/README.md)       | `collections()`   | —     | Collection tab tracking            |
| [special-items](src/modules/special-items/README.md)   | `specialItems()`  | 41    | Books, powers, mastery items       |

### Shops (18 modules)

| Module                                                          | Factory          | Items | Description                                |
| --------------------------------------------------------------- | ---------------- | ----- | ------------------------------------------ |
| [pierre](src/modules/pierre-shop/README.md)                     | `pierre()`       | 54    | Seeds, saplings, ingredients, fertilizer   |
| [saloon](src/modules/saloon-shop/README.md)                     | `saloon()`       | 16    | Food and recipes                           |
| [blacksmith](src/modules/blacksmith-shop/README.md)             | `blacksmith()`   | 4     | Tool upgrades and sharpening               |
| [carpenter](src/modules/carpenter-shop/README.md)               | `carpenter()`    | 21    | Materials, recipes, rotating furniture     |
| [marnie](src/modules/marnie-shop/README.md)                     | `marnie()`       | 14    | Animal supplies, tools                     |
| [willy](src/modules/willy-shop/README.md)                       | `willy()`        | 24    | Rods, bait, tackle (level-gated)           |
| [krobus](src/modules/krobus-shop/README.md)                     | `krobus()`       | 16    | Permanent + daily rotating stock           |
| [guild](src/modules/guild-shop/README.md)                       | `guild()`        | 38    | Weapons, boots, rings, ammo                |
| [casino](src/modules/casino-shop/README.md)                     | `casino()`       | 13    | Qi Coin purchases                          |
| [desert-trader](src/modules/desert-trader-shop/README.md)       | `desertTrader()` | 26    | Barter items with day rotation             |
| [oasis](src/modules/oasis-shop/README.md)                       | `oasis()`        | 16    | Seeds, food, daily rotating items          |
| [volcano](src/modules/volcano-shop/README.md)                   | `volcanoShop()`  | 10    | Mixed currency (gold/cinder shard/diamond) |
| [island-trader](src/modules/island-trader-shop/README.md)       | `islandTrader()` | 23    | Barter with day/special availability       |
| [dwarf](src/modules/dwarf-shop/README.md)                       | `dwarf()`        | 11    | Explosives, food, consumables              |
| [joja](src/modules/joja-shop/README.md)                         | `joja()`         | 34    | JojaMart inventory                         |
| [qi](src/modules/qi-shop/README.md)                             | `qi()`           | 27    | Qi Gem shop                                |
| [bookseller](src/modules/bookseller-shop/README.md)             | `bookseller()`   | —     | Book shop inventory                        |
| [medical-supplies](src/modules/medical-supplies-shop/README.md) | `medical()`      | 2     | Harvey's Clinic items                      |

### World & Locations

| Module                                             | Factory              | Items | Description                     |
| -------------------------------------------------- | -------------------- | ----- | ------------------------------- |
| [locations](src/modules/locations/README.md)       | `locations()`        | 38    | Game locations with shops, NPCs |
| [maps](src/modules/maps/README.md)                 | `maps()`             | 8     | Farm map types                  |
| [buildings](src/modules/buildings/README.md)       | `buildings()`        | 23    | Farm buildings (Robin + Wizard) |
| [weather](src/modules/weather/README.md)           | `weather()`          | 9     | Weather types and effects       |
| [farmhouse](src/modules/farmhouse/README.md)       | `houseUpgrades()`    | —     | House upgrade tiers             |
|                                                    | `houseRenovations()` | —     | Interior renovations            |
| [field-office](src/modules/field-office/README.md) | `fieldOffice()`      | 4     | Island Field Office collections |
| [concessions](src/modules/concessions/README.md)   | `concessions()`      | 24    | Movie theater snacks            |

### Calculators

| Module                                         | Factory               | Description                                      |
| ---------------------------------------------- | --------------------- | ------------------------------------------------ |
| [calculator](src/modules/calculator/README.md) | `qualityCalculator()` | Quality-scaled sell prices and energy/health     |
| [grandpa](src/modules/grandpa/README.md)       | `grandpaEvaluator()`  | Grandpa's evaluation scoring (0–21, 1–4 candles) |

### Search

```ts
import { search } from "stardew-valley-data";

// Search across all modules by name or ID
search("parsnip");
// Returns matches from crops, seeds, cooking ingredients, etc.

// Filter by kind
search("diamond", ["mineral", "ring"]);
```

### Save File Parser

```ts
import { parseSaveFile } from "stardew-valley-data";

const xml = fs.readFileSync("MyFarm_123456", "utf-8");
const save = parseSaveFile(xml);
// Extracts player data, inventory, friendships, progress, etc.
```

## Utility Functions

```ts
import {
  calculateArtisanPrice,
  getMasteryLevel,
  getTitle,
  getTitleScore,
  isFarmAnimal,
  isPet,
} from "stardew-valley-data";

// Type guards for Animal discriminated union
const animal = animals().find("Cat");
if (isPet(animal)) {
  /* TypeScript narrows to Pet */
}

// Artisan good pricing
calculateArtisanPrice(good, ingredientBasePrice);

// Skill progression
getTitleScore(10, 10, 10, 10, 10); // → 25
getTitle(10, 10, 10, 10, 10); // → "Farm King"
getMasteryLevel(25000); // → 3
```

## Module Documentation

Each module has a detailed README in its source directory with complete method signatures, type
definitions, field descriptions, and usage examples:

```
src/modules/<module-name>/README.md
```

## Image Assets

1,900+ images bundled under `images/`, organized by category:

| Folder           | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `achievements/`  | Achievement icons                                     |
| `animals/`       | Farm animals, pets, and produce                       |
| `artifacts/`     | Museum artifacts and Field Office donations           |
| `artisan-goods/` | Artisan products                                      |
| `buildings/`     | Farm buildings including obelisks                     |
| `bundles/`       | Community Center bundle icons                         |
| `cooking/`       | Cooked dish icons                                     |
| `craftable/`     | Craftable items (sprinklers, bombs, fertilizer, etc.) |
| `crops/`         | Seeds, growth stages, harvested crops, giant variants |
| `fish/`          | Fish, bait, tackle, jelly, and other catchables       |
| `footwear/`      | Boots and shoes                                       |
| `forageables/`   | Forageable items by season                            |
| `hats/`          | Hats and headwear                                     |
| `locations/`     | Location images                                       |
| `maps/`          | Farm map icons and full maps                          |
| `minerals/`      | Ores, bars, gems, geodes, nodes                       |
| `monsters/`      | Monster sprites                                       |
| `rings/`         | Rings                                                 |
| `scarecrows/`    | Scarecrow and Rarecrow variants                       |
| `seasons/`       | Season icons                                          |
| `shop/`          | Misc shop items                                       |
| `skills/`        | Skill icons                                           |
| `special-items/` | Books, powers, mastery items                          |
| `tools/`         | Tools by type                                         |
| `trees/`         | Fruit trees and wild trees with growth stages         |
| `trinkets/`      | Trinket icons                                         |
| `villagers/`     | Villager and spouse portraits                         |
| `weapons/`       | Swords, daggers, clubs, slingshots                    |
| `weather/`       | Weather icons                                         |

### Crop & Tree Folder Structure

```
crops/parsnip/
  seed.png          # Seed packet
  stage-1.png       # Growth stages
  stage-2.png
  ...
  crop.png          # Harvested crop
  giant.png         # Giant variant (if applicable)

trees/apple/
  seed.png          # Sapling
  stage-1.png       # Growth stages
  ...
  stage-5.png
  harvest.png       # Tree with fruit
  crop.png          # Fruit item
```

### Using Images in Your Project

Images are available via the `stardew-valley-data/images/*` subpath export.

**Static import:**

```ts
import parsnipImg from "stardew-valley-data/images/crops/parsnip/crop.png";
import sturgeon from "stardew-valley-data/images/fish/Sturgeon.png";
```

**Dynamic resolution from query results:**

Every data item with an `image` field stores a path relative to the package root. Prefix with the
package name to resolve it:

```ts
import { crops } from "stardew-valley-data";

const crop = crops().findByName("Parsnip");
const imgPath = `stardew-valley-data/${crop.image}`;
// → "stardew-valley-data/images/crops/parsnip/crop.png"
```

**Next.js example:**

```tsx
import Image from "next/image";
import parsnipImg from "stardew-valley-data/images/crops/parsnip/crop.png";

export default function CropCard() {
  return <Image src={parsnipImg} alt="Parsnip" width={48} height={48} />;
}
```

## Raw Data Access

JSON data files can be imported directly:

```ts
import bait from "stardew-valley-data/data/bait.json";
```

## Development

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for setup instructions and
[DEVELOPMENT.md](.github/DEVELOPMENT.md) for the full guide on adding new modules.

```bash
pnpm install        # Install dependencies
pnpm build          # Build with tsup
pnpm test           # Run tests
pnpm lint           # Type-check + ESLint
pnpm format         # Format with Prettier
pnpm sample         # Validate image paths + exercise queries
```

## License

[MIT](LICENSE)
