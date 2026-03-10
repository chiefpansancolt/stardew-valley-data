# professions

Professions — skill specializations chosen at levels 5 and 10. There are 30 professions total (6 per
skill), forming a binary tree: 2 choices at level 5, each branching into 2 choices at level 10.

## Usage

```ts
import { professions } from "stardew-valley-data";

professions().get();
professions().bySkill("Farming").get();
professions().byLevel(10).get();
professions().byParent("0").get(); // Level-10 branches from Rancher
```

## Factory function

```ts
function professions(source?: Profession[]): ProfessionQuery;
```

## Filter methods

| Method         | Returns         | Description                            |
| -------------- | --------------- | -------------------------------------- |
| bySkill(skill) | ProfessionQuery | Filter by skill name                   |
| byLevel(level) | ProfessionQuery | Filter by level (5 or 10)              |
| byParent(id)   | ProfessionQuery | Filter to children of a level-5 choice |

## Sort methods

| Method             | Returns         | Description                 |
| ------------------ | --------------- | --------------------------- |
| sortByName(order?) | ProfessionQuery | Sort alphabetically by name |

## Terminal methods

| Method           | Returns                 | Description                      |
| ---------------- | ----------------------- | -------------------------------- |
| get()            | Profession[]            | All professions in current query |
| first()          | Profession \| undefined | First profession                 |
| find(id)         | Profession \| undefined | Find by ID                       |
| findByName(name) | Profession \| undefined | Find by name (case-insensitive)  |
| count()          | number                  | Number of professions            |

## Examples

```ts
// All Farming professions
professions().bySkill("Farming").get();

// Level-5 choices only
professions().byLevel(5).get();

// What branches from "Tiller" (id "1")?
professions().byParent("1").get();
// → [Artisan, Agriculturist]

// Find by numeric ID
professions().find("4"); // → Artisan
```

## Profession fields

| Field            | Type            | Description                                         |
| ---------------- | --------------- | --------------------------------------------------- |
| id               | string          | Numeric profession ID (game-internal)               |
| name             | string          | Display name                                        |
| skill            | ProfessionSkill | Which skill this profession belongs to              |
| level            | 5 \| 10         | Level at which this profession is chosen            |
| parentProfession | string \| null  | ID of the level-5 profession required (null for L5) |
| description      | string          | In-game description of the profession's effect      |

## ProfessionSkill values

`"Farming"` | `"Fishing"` | `"Foraging"` | `"Mining"` | `"Combat"`

## Profession tree

| Skill    | Level 5   | Level 10 (branch A) | Level 10 (branch B) |
| -------- | --------- | ------------------- | ------------------- |
| Farming  | Rancher   | Coopmaster          | Shepherd            |
| Farming  | Tiller    | Artisan             | Agriculturist       |
| Fishing  | Fisher    | Angler              | Pirate              |
| Fishing  | Trapper   | Mariner             | Luremaster          |
| Foraging | Forester  | Lumberjack          | Tapper              |
| Foraging | Gatherer  | Botanist            | Tracker             |
| Mining   | Miner     | Blacksmith          | Prospector          |
| Mining   | Geologist | Excavator           | Gemologist          |
| Combat   | Fighter   | Brute               | Defender            |
| Combat   | Scout     | Acrobat             | Desperado           |
