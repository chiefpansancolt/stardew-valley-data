# stardew-valley-data

<div align="center">
  <h3>A comprehensive, fully-typed dataset for Stardew Valley</h3>
  <p>Structured JSON data, 1,900+ image assets, and a chainable query builder API for game items, crops, fish, villagers, shops, and more.</p>

![Codecov](https://img.shields.io/codecov/c/github/chiefpansancolt/stardew-valley-data?style=flat-square&logo=%3Csvg%20role%3D%22img%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3ECodecov%3C%2Ftitle%3E%3Cpath%20d%3D%22M12.006.481C5.391.486.005%205.831%200%2012.399v.03l2.042%201.19.028-.018a5.82%205.82%200%20013.308-1.02c.37%200%20.733.034%201.085.1l-.036-.006a5.69%205.69%200%20012.874%201.43l-.004-.002.35.326.198-.434c.192-.42.414-.814.66-1.173.1-.144.208-.29.332-.446l.205-.257-.252-.211a8.33%208.33%200%2000-3.836-1.807l-.052-.008a8.565%208.565%200%2000-4.08.251l.06-.016c.972-4.256%204.714-7.223%209.133-7.226a9.31%209.31%200%20016.6%202.713%209.196%209.196%200%20012.508%204.498%208.385%208.385%200%2000-2.498-.379h-.154c-.356.006-.7.033-1.036.078l.045-.005-.042.006a8.103%208.103%200%2000-.39.06c-.057.01-.114.022-.17.033a8.102%208.102%200%2000-.392.09l-.138.034a9.21%209.21%200%2000-.483.144l-.03.01c-.354.12-.708.268-1.05.44l-.027.013c-.152.076-.305.16-.47.256l-.035.022a8.216%208.216%200%2000-2.108%201.8l-.011.014-.075.092a8.345%208.345%200%2000-.378.503c-.088.13-.177.269-.288.452l-.06.104a8.985%208.985%200%2000-.234.432l-.016.029c-.17.34-.317.698-.44%201.063l-.017.053a8.052%208.052%200%2000-.41%202.716v-.007.112a12%2012%200%2000.023.431l-.002-.037a11.676%2011.676%200%2000.042.412l.005.042.013.103c.018.127.038.252.062.378.241%201.266.845%202.532%201.745%203.66l.041.051.042-.05c.359-.424%201.249-1.77%201.325-2.577v-.015l-.006-.013a5.56%205.56%200%2001-.64-2.595c0-3.016%202.37-5.521%205.396-5.702l.2-.007a5.93%205.93%200%20013.47%201.025l.027.019L24%2012.416v-.03a11.77%2011.77%200%2000-3.51-8.423A11.962%2011.962%200%200012.007.48z%22%2F%3E%3C%2Fsvg%3E&logoColor=%23F01F7A)
![NPM Downloads](https://img.shields.io/npm/d18m/stardew-valley-data?style=flat-square&logo=%3Csvg%20role%3D%22img%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3Enpm%3C%2Ftitle%3E%3Cpath%20d%3D%22M1.763%200C.786%200%200%20.786%200%201.763v20.474C0%2023.214.786%2024%201.763%2024h20.474c.977%200%201.763-.786%201.763-1.763V1.763C24%20.786%2023.214%200%2022.237%200zM5.13%205.323l13.837.019-.009%2013.836h-3.464l.01-10.382h-3.456L12.04%2019.17H5.113z%22%2F%3E%3C%2Fsvg%3E&logoColor=%23CB3837)
![GitHub Release](https://img.shields.io/github/v/release/chiefpansancolt/stardew-valley-data?style=flat-square)

</div>

---

## 📦 Installation

```bash
npm install stardew-valley-data
# or
pnpm add stardew-valley-data
# or
yarn add stardew-valley-data
```

---

## 🚀 Quick Start

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

---

## ⚙️ How It Works

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

---

## 📚 Modules

### 🗡️ Items & Equipment

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

### 🌾 Farming & Nature

| Module                                               | Factory          | Items | Description                              |
| ---------------------------------------------------- | ---------------- | ----- | ---------------------------------------- |
| [crops](src/modules/crops/README.md)                 | `crops()`        | 46    | Crops with seasons, growth stages, seeds |
| [trees](src/modules/trees/README.md)                 | `trees()`        | 14    | Fruit trees and wild trees               |
| [animals](src/modules/animals/README.md)             | `animals()`      | 27    | Farm animals and pets                    |
| [artisan-goods](src/modules/artisan-goods/README.md) | `artisanGoods()` | 27    | Wine, cheese, jelly, etc.                |
| [mixed-seeds](src/modules/mixed-seeds/README.md)     | `mixedSeeds()`   | 2     | Mixed seed drop tables by season         |
| [seasons](src/modules/seasons/README.md)             | `seasons()`      | 4     | Season metadata                          |

### 🐟 Fishing

| Module                             | Factory  | Items | Description                              |
| ---------------------------------- | -------- | ----- | ---------------------------------------- |
| [fish](src/modules/fish/README.md) | `fish()` | 77    | All fish with location, time, difficulty |

### ⛏️ Foraging & Mining

| Module                                           | Factory         | Items | Description                |
| ------------------------------------------------ | --------------- | ----- | -------------------------- |
| [forageables](src/modules/forageables/README.md) | `forageables()` | 48    | Forageable items by season |
| [minerals](src/modules/minerals/README.md)       | `minerals()`    | 97    | Ores, gems, geodes, nodes  |
| [artifacts](src/modules/artifacts/README.md)     | `artifacts()`   | 42    | Museum artifacts           |

### 🍳 Cooking & Crafting

| Module                                     | Factory      | Items | Description              |
| ------------------------------------------ | ------------ | ----- | ------------------------ |
| [cooking](src/modules/cooking/README.md)   | `cooking()`  | 81    | Recipes with ingredients |
| [crafting](src/modules/crafting/README.md) | `crafting()` | 150   | Crafting recipes         |

### ⚔️ Combat

| Module                                                             | Factory                | Items | Description                          |
| ------------------------------------------------------------------ | ---------------------- | ----- | ------------------------------------ |
| [monsters](src/modules/monsters/README.md)                         | `monsters()`           | 44    | Monster stats, drops, locations      |
| [monsters](src/modules/monsters/README.md)                         | `monsterLoot()`        | 5     | Loot table categories                |
| [monster-slayer-goals](src/modules/monster-slayer-goals/README.md) | `monsterSlayerGoals()` | 12    | Adventurer's Guild eradication goals |
| [weapon-stats](src/modules/weapon-stats/README.md)                 | `weaponStats()`        | 5     | Weapon type stat ranges              |

### 💬 NPCs & Social

| Module                                                   | Factory            | Items | Description                     |
| -------------------------------------------------------- | ------------------ | ----- | ------------------------------- |
| [villagers](src/modules/villagers/README.md)             | `villagers()`      | 34    | Villagers with gifts, schedules |
| [universal-gifts](src/modules/universal-gifts/README.md) | `universalGifts()` | —     | Universal gift preferences      |
| [events](src/modules/events/README.md)                   | `events()`         | 100   | Heart events, festivals         |
| [quests](src/modules/quests/README.md)                   | `quests()`         | 58    | Quest details                   |
| [special-orders](src/modules/special-orders/README.md)   | `specialOrders()`  | 28    | Town + Qi special orders        |

### 🏆 Progression

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

### 🛒 Shops (18 modules)

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

### 🗺️ World & Locations

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

### 🧮 Calculators

| Module                                         | Factory               | Description                                      |
| ---------------------------------------------- | --------------------- | ------------------------------------------------ |
| [calculator](src/modules/calculator/README.md) | `qualityCalculator()` | Quality-scaled sell prices and energy/health     |
| [grandpa](src/modules/grandpa/README.md)       | `grandpaEvaluator()`  | Grandpa's evaluation scoring (0–21, 1–4 candles) |

### 🔍 Search

```ts
import { search } from "stardew-valley-data";

// Search across all modules by name or ID
search("parsnip");
// Returns matches from crops, seeds, cooking ingredients, etc.

// Filter by kind
search("diamond", ["mineral", "ring"]);
```

### 💾 Save File Parser

```ts
import { parseSaveFile } from "stardew-valley-data";

const xml = fs.readFileSync("MyFarm_123456", "utf-8");
const save = parseSaveFile(xml);
// Extracts player data, inventory, friendships, progress, etc.
```

---

## 🔧 Utility Functions

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

---

## 📖 Module Documentation

Each module has a detailed README in its source directory with complete method signatures, type
definitions, field descriptions, and usage examples:

```
src/modules/<module-name>/README.md
```

---

## 🖼️ Image Assets

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

---

## 📋 Raw Data Access

JSON data files can be imported directly:

```ts
import bait from "stardew-valley-data/data/bait.json";
```

---

## 📈 Change Log

Check out the [Change Log](CHANGELOG.md) for new breaking changes/features/bug fixes per release of
a new version.

---

## 🤝 Contributing

Bug Reports, Feature Requests, and Pull Requests are welcome on GitHub at
[https://github.com/chiefpansancolt/stardew-valley-data](https://github.com/chiefpansancolt/stardew-valley-data).
This project is intended to be a safe, welcoming space for collaboration, and contributors are
expected to adhere to the [Contributor Covenant](https://www.contributor-covenant.org/) code of
conduct.

To see more about Contributing check out this [document](.github/CONTRIBUTING.md).

1. Fork Repo and create new branch
2. Once all is changed and committed create a pull request.
3. Ensure all merge conflicts are fixed and CI is passing.

---

## 🛠️ Development

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

---

## 💖 Support the Project

If you find this project helpful, consider supporting its development:

<div align="center">

[![GitHub Sponsors](https://img.shields.io/badge/GitHub-Sponsor-pink?style=for-the-badge&logo=github)](https://github.com/sponsors/chiefpansancolt)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/chiefpansancolt)
[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://patreon.com/chiefpansancolt)

</div>

---

## 📄 License

stardew-valley-data is available as open source under the terms of the [MIT License](LICENSE).

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/chiefpansancolt">chiefpansancolt</a></p>
</div>
