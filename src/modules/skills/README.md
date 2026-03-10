# skills

Query builder and utilities for Stardew Valley skill data.

Covers all five skills (Farming, Mining, Foraging, Fishing, Combat), including XP progression,
recipes unlocked per level, mastery unlocks, and player title calculation.

Profession data is in the separate `professions` module. The `getProfessionOptions()` helper bridges
the two modules.

## Usage

```ts
import {
  getMasteryLevel,
  getProfessionOptions,
  getTitle,
  MASTERY_LEVELS,
  SKILL_TITLES,
  skills,
} from "stardew-valley-data";
```

## Factory function

```ts
skills(source?: Skill[]): SkillQuery
```

## Terminal methods

| Method             | Returns              | Description                          |
| ------------------ | -------------------- | ------------------------------------ |
| `get()`            | `Skill[]`            | All skills in the current query      |
| `first()`          | `Skill \| undefined` | First skill in the current query     |
| `find(id)`         | `Skill \| undefined` | Find by skill ID                     |
| `findByName(name)` | `Skill \| undefined` | Find by name (case-insensitive)      |
| `count()`          | `number`             | Count of skills in the current query |

## Examples

```ts
// All skills
skills().get();

// Find farming skill
skills().find("farming");
skills().findByName("Fishing");

// Get all crafting recipes unlocked at farming level 6
const farming = skills().find("farming");
farming?.levels[5].recipes.crafting; // ['Cheese Press', 'Hardwood Fence', 'Quality Sprinkler']

// Get mastery unlocks for a skill
skills().find("combat")?.mastery.unlocks;
// [{ name: 'Anvil', description: '...' }, ...]
```

## getProfessionOptions

Returns the level 10 profession options available based on a skill name and the chosen level 5
profession. Uses the `professions` module internally. Both arguments are case-insensitive. Returns
an empty array if the skill or profession is not found.

```ts
getProfessionOptions(skillName: string, level5Profession: string): ProfessionData[]
```

```ts
getProfessionOptions("Farming", "Tiller");
// [
//   { id: '4', name: 'Artisan', skill: 'Farming', level: 10, parentProfession: '1', ... },
//   { id: '5', name: 'Agriculturist', skill: 'Farming', level: 10, parentProfession: '1', ... }
// ]

getProfessionOptions("Combat", "Scout");
// [{ id: '28', name: 'Acrobat', ... }, { id: '29', name: 'Desperado', ... }]
```

### All profession paths

| Skill    | Level 5   | Level 10 options       |
| -------- | --------- | ---------------------- |
| Farming  | Rancher   | Coopmaster, Shepherd   |
| Farming  | Tiller    | Artisan, Agriculturist |
| Mining   | Miner     | Blacksmith, Prospector |
| Mining   | Geologist | Excavator, Gemologist  |
| Foraging | Forester  | Lumberjack, Tapper     |
| Foraging | Gatherer  | Botanist, Tracker      |
| Fishing  | Fisher    | Angler, Pirate         |
| Fishing  | Trapper   | Mariner, Luremaster    |
| Combat   | Fighter   | Brute, Defender        |
| Combat   | Scout     | Acrobat, Desperado     |

## Title calculation

The player's title is derived from the sum of all five skill levels divided by 2. Luck is not
implemented in the game so the maximum achievable score is 25 (all skills at 10).

```ts
import { getTitle, getTitleScore } from "stardew-valley-data";

getTitle(10, 8, 6, 7, 9); // 'Farmer'
getTitleScore(10, 8, 6, 7, 9); // 20
```

### Title thresholds

| Min score | Title              |
| --------- | ------------------ |
| 30        | Farm King          |
| 29        | Cropmaster         |
| 27        | Agriculturist      |
| 25        | Farmer             |
| 23        | Rancher            |
| 21        | Planter            |
| 19        | Granger            |
| 17        | Farmgirl / Farmboy |
| 15        | Sodbuster          |
| 13        | Smallholder        |
| 11        | Tiller             |
| 9         | Farmhand           |
| 7         | Cowpoke            |
| 5         | Bumpkin            |
| 3         | Greenhorn          |
| 0         | Newcomer           |

## Mastery

Mastery becomes available once all five skills reach level 10. Mastery XP conversion rate is 50% for
Farming, 100% for all other skills.

```ts
import { getMasteryLevel, MASTERY_LEVELS } from "stardew-valley-data";

getMasteryLevel(45000); // 3
getMasteryLevel(500); // 0 (not yet reached level 1)

MASTERY_LEVELS; // [{ level: 1, xpRequired: 10000, totalXp: 10000 }, ...]
```

### Mastery XP table

| Level | XP to next | Total XP |
| ----- | ---------- | -------- |
| 1     | 10,000     | 10,000   |
| 2     | 15,000     | 25,000   |
| 3     | 20,000     | 45,000   |
| 4     | 25,000     | 70,000   |
| 5     | 30,000     | 100,000  |

## Skill fields

| Field                         | Type            | Notes                                       |
| ----------------------------- | --------------- | ------------------------------------------- |
| id                            | string          | farming, mining, foraging, fishing, combat  |
| name                          | string          |                                             |
| description                   | string          |                                             |
| toolBonus                     | string          | Bonus applied per level to associated tool  |
| image                         | string          | Path to skill icon image                    |
| levels                        | SkillLevel[]    | 10 entries, one per level                   |
| levels[].level                | number          | 1–10                                        |
| levels[].xpRequired           | number          | XP needed to reach this level from previous |
| levels[].totalXp              | number          | Cumulative XP required                      |
| levels[].recipes.crafting     | string[]        | Crafting recipes unlocked at this level     |
| levels[].recipes.cooking      | string[]        | Cooking recipes unlocked at this level      |
| mastery.unlocks               | MasteryUnlock[] | Rewards unlocked when mastery is claimed    |
| mastery.unlocks[].name        | string          | Item or feature name                        |
| mastery.unlocks[].description | string          | What it does                                |
