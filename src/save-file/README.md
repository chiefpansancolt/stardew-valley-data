# save-file

Parser for Stardew Valley XML save files. Reads raw save game XML and returns a fully typed
`SaveData` object with structured data for player stats, collections, buildings, bundles, and more.

## Usage

```ts
import fs from "fs";
import { parseSaveFile } from "stardew-valley-data/save-file";

const xml = fs.readFileSync("path/to/SaveFile", "utf-8");
const data = parseSaveFile(xml);

data.player.name; // 'Chris'
data.farm.name; // 'PerfectRun'
data.bundles.rooms[0].name; // 'Pantry'
```

## How it works

Stardew Valley saves are XML files stored in `%AppData%/StardewValley/Saves/` (Windows) or
`~/.config/StardewValley/Saves/` (Linux/Mac). Each save contains a `<SaveGame>` root element with
the full game state.

The parser:

1. Parses the XML into a JS object using `fast-xml-parser`
2. Delegates to specialized sub-parsers in `parsers/` — one per data domain
3. Pre-computes shared lookups (mail flags, events seen) used across multiple parsers
4. Returns a flat `SaveData` object with all parsed sections

Item IDs are normalized to match the IDs used in this package's data files (stripping type prefixes
like `(O)` and `(BC)`).

## SaveData fields

| Field           | Type                   | Description                                      |
| --------------- | ---------------------- | ------------------------------------------------ |
| player          | SavePlayer             | Name, money, skills, mastery, house level        |
| farm            | SaveFarm               | Farm type and name                               |
| date            | SaveDate               | Current year, season, day, total days played     |
| inventory       | SaveItem[]             | Items in the player's inventory                  |
| fishCaught      | SaveFishEntry[]        | Unique fish caught with counts and largest sizes |
| itemsShipped    | SaveShippedEntry[]     | Unique items shipped with counts                 |
| museum          | SaveMuseum             | Donations, artifacts found, minerals found       |
| friendships     | SaveFriendship[]       | Villager friendship points, hearts, status       |
| achievements    | number[]               | Unlocked achievement IDs                         |
| activeQuests    | SaveQuest[]            | Currently active quests                          |
| stardrops       | SaveStardropEntry[]    | All 7 stardrops with collected status            |
| stats           | SaveStats              | Lifetime stats (days played, steps, fish, etc.)  |
| animals         | SaveAnimal[]           | Farm animals with friendship and happiness       |
| buildings       | SaveBuilding[]         | Farm buildings with positions                    |
| cookingRecipes  | SaveRecipeEntry[]      | Known cooking recipes with times made            |
| craftingRecipes | SaveRecipeEntry[]      | Known crafting recipes with times made           |
| bundles         | SaveBundleData         | Community Center bundles with per-item status    |
| monstersKilled  | SaveMonsterKillEntry[] | Monster types killed with counts                 |
| mail            | string[]               | All received mail flags                          |
| specialOrders   | SaveSpecialOrders      | Completed town and Qi special orders             |
| professions     | SaveProfession[]       | Chosen professions with names                    |
| booksRead       | string[]               | Power book IDs that have been read               |
| eventsSeen      | string[]               | Event IDs the player has witnessed               |
| secretNotes     | SaveSecretNotes        | Found secret notes and journal scraps            |
| walnuts         | SaveWalnuts            | Golden walnuts found count and sources           |
| islandUpgrades  | SaveIslandUpgrades     | Ginger Island unlock flags (11 upgrades)         |
| children        | SaveChild[]            | Player's children                                |
| pet             | SavePet \| null        | Player's pet (name, type, breed, friendship)     |
| powers          | SavePowers             | Special items / powers acquisition status        |
| raccoons        | SaveRaccoons           | Raccoon quest progress                           |
| perfection      | SavePerfection         | Perfection tracker (gold clock, obelisks, etc.)  |
| mineProgress    | SaveMineProgress       | Deepest mine and skull cavern levels, keys       |

## Key types

### SavePlayer

| Field             | Type           | Description                      |
| ----------------- | -------------- | -------------------------------- |
| name              | string         | Player name                      |
| farmName          | string         | Farm name                        |
| favoriteThing     | string         | Favorite thing (stardrop text)   |
| gender            | string         | Player gender                    |
| money             | number         | Current gold                     |
| totalMoneyEarned  | number         | Lifetime gold earned             |
| spouse            | string \| null | Spouse name; `null` if unmarried |
| houseUpgradeLevel | number         | House upgrade level (0-3)        |
| maxHealth         | number         | Maximum health                   |
| maxStamina        | number         | Maximum stamina                  |
| skills            | SaveSkills     | Skill levels and XP              |
| mastery           | SaveMastery    | Mastery XP, levels spent, perks  |
| gameVersion       | string         | Game version string              |

### SaveBundleData

| Field        | Type               | Description                          |
| ------------ | ------------------ | ------------------------------------ |
| bundles      | SaveBundleStatus[] | All bundles with per-item completion |
| rooms        | SaveBundleRoom[]   | Bundles grouped by CC room           |
| isJojaRoute  | boolean            | Whether Joja membership was bought   |
| isCCComplete | boolean            | Whether CC is fully completed        |

### SaveBundleStatus

| Field          | Type                     | Description                            |
| -------------- | ------------------------ | -------------------------------------- |
| bundleIndex    | number                   | Game bundle index                      |
| name           | string                   | Bundle display name                    |
| room           | string                   | Room name (e.g. "Pantry", "Fish Tank") |
| items          | SaveBundleItem[]         | Required items with completion status  |
| itemsRequired  | number                   | How many items must be donated         |
| itemsCompleted | number                   | How many items have been donated       |
| complete       | boolean                  | Whether the bundle is complete         |
| reward         | SaveBundleReward \| null | Reward for completing the bundle       |

### SaveBundleItem

| Field     | Type    | Description                                  |
| --------- | ------- | -------------------------------------------- |
| itemId    | string  | Game item ID (`-1` for gold in Vault)        |
| name      | string  | Item name (or gold amount for Vault)         |
| quantity  | number  | Required quantity                            |
| quality   | number  | Minimum quality (0=Normal, 1=Silver, 2=Gold) |
| completed | boolean | Whether this slot has been filled            |

### SaveStats

| Field            | Type                   | Description                    |
| ---------------- | ---------------------- | ------------------------------ |
| daysPlayed       | number                 | Total days played              |
| stepsTaken       | number                 | Total steps taken              |
| fishCaught       | number                 | Total fish caught              |
| itemsShipped     | number                 | Total items shipped            |
| itemsForaged     | number                 | Total items foraged            |
| itemsCrafted     | number                 | Total items crafted            |
| itemsCooked      | number                 | Total items cooked             |
| monstersKilled   | number                 | Total monsters killed          |
| questsCompleted  | number                 | Total quests completed         |
| geodesCracked    | number                 | Total geodes cracked           |
| giftsGiven       | number                 | Total gifts given              |
| timesFished      | number                 | Total times fished             |
| timesUnconscious | number                 | Times passed out or died       |
| seedsSown        | number                 | Total seeds sown               |
| treesChopped     | number                 | Total trees chopped            |
| rocksCrushed     | number                 | Total rocks crushed            |
| raw              | Record<string, number> | All raw stat entries from save |

## Parsers

Each parser in `parsers/` handles one section of the save file:

| Parser          | Reads from                              | Output                              |
| --------------- | --------------------------------------- | ----------------------------------- |
| achievements    | `player.achievements`                   | Achievement ID array                |
| animals         | `locations[].buildings[].animals`       | Farm animal details                 |
| buildings       | `locations[].buildings`                 | Building type and position          |
| bundles         | `bundleData` + CC `bundles`             | Per-item bundle progress            |
| date            | `player` + root date fields             | Structured date                     |
| events          | `player.eventsSeen`                     | Event ID array                      |
| family          | `locations[]` (FarmHouse NPCs)          | Children and pet                    |
| fish            | `player.fishCaught`                     | Fish catch records                  |
| friendships     | `player.friendshipData`                 | Villager relationships              |
| inventory       | `player.items`                          | Current inventory                   |
| island-upgrades | Mail flags                              | Island unlock booleans              |
| mail            | `player.mailReceived`                   | Mail flags + special orders + books |
| mine-progress   | `player` + root mine data               | Mine/skull depths + keys            |
| monsters        | `player.stats`                          | Kill counts by type                 |
| museum          | Locations + `player` collections        | Donation/find records               |
| perfection      | Root perfection fields                  | Perfection tracker                  |
| player          | `player` node                           | Player stats and info               |
| powers          | Mail + events                           | Special item acquisition            |
| professions     | `player.professions`                    | Profession IDs and names            |
| quests          | `player.questLog`                       | Active quest details                |
| raccoons        | Root raccoon fields                     | Raccoon quest progress              |
| recipes         | `player.cookingRecipes/craftingRecipes` | Recipe knowledge                    |
| secret-notes    | `player` note data + mail               | Found notes and scraps              |
| shipping        | `player.basicShipped`                   | Shipped item counts                 |
| stardrops       | `player.mailReceived`                   | Stardrop collection flags           |
| stats           | `player.stats`                          | Lifetime statistics                 |
| walnuts         | Root walnut fields                      | Walnut count and sources            |

## Utilities

`parsers/util.ts` provides helpers shared across all parsers:

- `normalizeItemId(raw)` — Strips type prefixes: `"(O)129"` → `"129"`
- `num(value)` — Safe numeric conversion, defaults to 0
- `str(value, fallback?)` — Safe string conversion
- `ensureArray(value)` — Wraps single items in an array (XML parser quirk)
- `extractDictItems(dict)` — Extracts key-value pairs from XML dictionary structures
