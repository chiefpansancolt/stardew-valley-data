# trinkets

Trinkets — equippable accessories unlocked after claiming Combat Mastery. One trinket can be
equipped at a time via the trinket slot in the player's inventory.

## Usage

```ts
import { trinkets } from "stardew-valley-data";

trinkets().get();
trinkets().forgeable().get();
trinkets().bySource("combat-drop").sortByName().get();
```

## Factory function

```ts
function trinkets(source?: Trinket[]): TrinketQuery;
```

## TrinketQuery — filter methods

| Method        | Returns      | Description                                           |
| ------------- | ------------ | ----------------------------------------------------- |
| bySource(src) | TrinketQuery | Filter by source (combat-drop or desert-festival)     |
| forgeable()   | TrinketQuery | Filter to trinkets that can be re-forged at the Forge |

## TrinketQuery — sort methods

| Method             | Returns      | Description                 |
| ------------------ | ------------ | --------------------------- |
| sortByName(order?) | TrinketQuery | Sort alphabetically by name |

## TrinketQuery — terminal methods

| Method           | Returns              | Description                     |
| ---------------- | -------------------- | ------------------------------- |
| get()            | Trinket[]            | All trinkets in current query   |
| first()          | Trinket \| undefined | First trinket                   |
| find(id)         | Trinket \| undefined | Find by ID                      |
| findByName(name) | Trinket \| undefined | Find by name (case-insensitive) |
| count()          | number               | Number of trinkets              |

## Examples

```ts
// All trinkets
trinkets().sortByName().get();

// Trinkets that can be re-forged
trinkets().forgeable().get();

// The one trinket from the Desert Festival
trinkets().bySource("desert-festival").first();

// Find a specific trinket
trinkets().find("parrot-egg");
```

## All Trinkets (8 total)

All trinkets require Combat Mastery and sell for 1,000g. Most drop from monster kills, crate/barrel
breaks in the Mines/Skull Cavern/Quarry Mine, and Skull Cavern treasure chests.

| Name           | Source          | Forgeable | Effect summary                                       |
| -------------- | --------------- | --------- | ---------------------------------------------------- |
| Basilisk Paw   | Combat drop     | No        | Immunity to all enemy-inflicted debuffs              |
| Fairy Box      | Combat drop     | Yes       | Fairy companion that heals you in combat (level 1–5) |
| Frog Egg       | Combat drop     | Yes       | Frog companion that eats nearby enemies (8 colors)   |
| Golden Spur    | Combat drop     | Yes       | Speed boost on critical strikes (5–10 seconds)       |
| Ice Rod        | Combat drop     | Yes       | Shoots ice orbs that freeze enemies (no damage)      |
| Magic Hair Gel | Desert Festival | No        | Prismatic hair color — cosmetic only                 |
| Magic Quiver   | Combat drop     | Yes       | Auto-shoots magic arrows at nearby enemies           |
| Parrot Egg     | Combat drop     | Yes       | Parrot companion with a chance to find gold coins    |

Note: Magic Hair Gel is purchased from Alex at the Desert Festival for 100 Calico Eggs.

## Trinket fields

| Field     | Type          | Description                                       |
| --------- | ------------- | ------------------------------------------------- |
| id        | string        | Unique kebab-case identifier                      |
| name      | string        | Display name                                      |
| effect    | string        | Description of the trinket's effect               |
| source    | TrinketSource | How the trinket is obtained                       |
| forgeable | boolean       | Whether it can be re-forged to randomise its stat |
| sellPrice | number        | Sell price in gold                                |
| image     | string        | Image path relative to package root               |

## TrinketSource values

`"combat-drop"` | `"desert-festival"`
