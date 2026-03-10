# monster-slayer-goals

Monster Eradication Goals tracked at the Adventurer's Guild. Complete each goal to earn a reward
from Gil.

## Usage

```ts
import { monsterSlayerGoals } from "stardew-valley-data";

monsterSlayerGoals().get();
```

## Factory function

```ts
function monsterSlayerGoals(source?: MonsterSlayerGoal[]): MonsterSlayerGoalQuery;
```

## Sort methods

| Method                   | Returns                | Description                        |
| ------------------------ | ---------------------- | ---------------------------------- |
| sortByKillTarget(order?) | MonsterSlayerGoalQuery | Sort by kill target (default: asc) |

## Terminal methods

| Method           | Returns                        | Description                     |
| ---------------- | ------------------------------ | ------------------------------- |
| get()            | MonsterSlayerGoal[]            | All goals in current query      |
| first()          | MonsterSlayerGoal \| undefined | First goal                      |
| find(id)         | MonsterSlayerGoal \| undefined | Find by game ID                 |
| findByName(name) | MonsterSlayerGoal \| undefined | Find by name (case-insensitive) |
| count()          | number                         | Number of goals                 |

## Examples

```ts
// All goals sorted easiest first
monsterSlayerGoals().sortByKillTarget().get();

// Find a specific goal
monsterSlayerGoals().find("Slimes");

// Find by display name
monsterSlayerGoals().findByName("Void Spirits");
```

## All Monster Slayer Goals (12 total)

| ID           | Name          | Kill Target | Reward                |
| ------------ | ------------- | ----------- | --------------------- |
| Slimes       | Slime         | 1,000       | Slime Charmer Ring    |
| Shadows      | Void Spirits  | 150         | Savage Ring           |
| Bats         | Bats          | 200         | Vampire Ring          |
| Skeletons    | Skeletons     | 50          | Skeleton Mask         |
| Insects      | Cave Insects  | 80          | Insect Head           |
| Duggy        | Duggies       | 30          | Hard Hat              |
| DustSpirits  | Dust Sprites  | 500         | Burglar's Ring        |
| Crabs        | Rock Crabs    | 60          | Crabshell Ring        |
| Mummies      | Mummies       | 100         | Arcane Hat            |
| Dinos        | Pepper Rex    | 50          | Knight's Helmet       |
| Serpents     | Serpents      | 250         | Napalm Ring           |
| FlameSpirits | Magma Sprites | 150         | Marlon's Phone Number |

## MonsterSlayerGoal fields

| Field      | Type         | Description                                       |
| ---------- | ------------ | ------------------------------------------------- |
| id         | string       | Game-internal key (e.g. "Slimes", "FlameSpirits") |
| name       | string       | Display name shown in the Adventurer's Guild      |
| killTarget | number       | Number of kills required to complete the goal     |
| monsters   | string[]     | Names of monsters that count toward this goal     |
| reward     | SlayerReward | Reward granted upon completion                    |

## SlayerReward fields

| Field  | Type           | Description                                              |
| ------ | -------------- | -------------------------------------------------------- |
| name   | string         | Display name of the reward item                          |
| itemId | string \| null | Game item ID with type prefix (e.g. "(O)520", "(H)8")    |
| image  | string \| null | Image path relative to package root. Null for non-items. |
