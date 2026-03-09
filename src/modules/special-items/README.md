# special-items

Special Items & Powers — key unlocks, power books, skill books, and mastery powers.

## Usage

```ts
import { specialItems } from "stardew-valley-data";

specialItems().byType("book").sortByName().get();
specialItems().byType("mastery").bySkill("combat").first();
```

## Factory function

```ts
function specialItems(source?: SpecialItem[]): SpecialItemQuery;
```

## Filter methods

| Method         | Returns          | Description                                                  |
| -------------- | ---------------- | ------------------------------------------------------------ |
| byType(type)   | SpecialItemQuery | Filter by "special-item", "book", "skill-book", or "mastery" |
| bySkill(skill) | SpecialItemQuery | Filter mastery items by associated skill                     |

## Sort methods

| Method             | Returns          | Description                 |
| ------------------ | ---------------- | --------------------------- |
| sortByName(order?) | SpecialItemQuery | Sort alphabetically by name |

## Terminal methods

| Method           | Returns                  | Description                     |
| ---------------- | ------------------------ | ------------------------------- |
| get()            | SpecialItem[]            | All items in current query      |
| first()          | SpecialItem \| undefined | First item                      |
| find(id)         | SpecialItem \| undefined | Find by item ID                 |
| findByName(name) | SpecialItem \| undefined | Find by name (case-insensitive) |
| count()          | number                   | Number of items                 |

## Examples

```ts
// All power books, sorted
specialItems().byType("book").sortByName().get();

// All mastery powers
specialItems().byType("mastery").get();

// Combat mastery specifically
specialItems().bySkill("combat").first();

// Find by ID
specialItems().find("skull-key");
```

## All items (41 total)

### Special Items (12)

| Name                       | Effect                                 | Obtained From                                   |
| -------------------------- | -------------------------------------- | ----------------------------------------------- |
| Forest Magic               | Unlocks Junimo language reading        | "Meet The Wizard" quest                         |
| Dwarvish Translation Guide | Unlocks Dwarf speech                   | Museum: all 4 Dwarf Scrolls                     |
| Rusty Key                  | Access to The Sewers                   | Gunther: donate 60 museum items                 |
| Club Card                  | Entry to the Casino                    | "The Mysterious Qi" quest                       |
| Special Charm              | Permanently increases daily luck       | Secret Note #20 + Rabbit's Foot (truck driver)  |
| Skull Key                  | Unlocks Skull Cavern and Junimo Kart   | Chest on Mines floor 120                        |
| Magnifying Glass           | Unlocks Secret Notes                   | "A Winter Mystery" quest                        |
| Dark Talisman              | Quest item for Witch's Swamp passage   | Mutant Bug Lair chest                           |
| Magic Ink                  | Quest item for the Wizard              | Witch's Hut table                               |
| Bear's Knowledge           | Blackberry & Salmonberry sell price ×3 | Secret Woods with Maple Syrup (Secret Note #23) |
| Spring Onion Mastery       | Spring Onion sell price ×5             | Vincent and Jas' 8-heart event                  |
| Key To The Town            | Access all buildings at any time       | Qi's Walnut Room — 20 Qi Gems                   |

### Books (19)

| Name                          | Effect                                           |
| ----------------------------- | ------------------------------------------------ |
| Animal Catalogue              | Access Marnie's shop when she's not around       |
| Book of Mysteries             | Slightly greater chance to find Mystery Boxes    |
| Dwarvish Safety Manual        | Bombs deal 25% less damage to you                |
| Friendship 101                | You become friends with people a little faster   |
| Horse: The Book               | Extra speed when riding your horse               |
| Jack Be Nimble, Jack Be Thick | +1 Defense                                       |
| Jewels Of The Sea             | Fishing treasure chests may yield roe            |
| Mapping Cave Systems          | 50% discount on Marlon's item retrieval service  |
| Monster Compendium            | Monsters have a small chance to drop double loot |
| Ol' Slitherlegs               | Run a lot faster through grass and crops         |
| Price Catalogue               | See the value of your items                      |
| The Alleyway Buffet           | Greater chance to find items in trash cans       |
| The Art O' Crabbing           | Crab pots 25% chance to yield double catch       |
| The Diamond Hunter            | Stones have a chance to drop a diamond           |
| Treasure Appraisal Guide      | Better price when selling artifacts              |
| Way Of The Wind pt. 1         | Permanently increases running speed              |
| Way Of The Wind pt. 2         | Additional running speed boost (requires pt. 1)  |
| Ways Of The Wild              | Weeds have a greater chance to yield mixed seeds |
| Woody's Secret                | Felled trees 5% chance to yield double wood      |

### Skill Books (5)

| Name                   | Effect                 |
| ---------------------- | ---------------------- |
| Bait And Bobber        | Grants 250 Fishing XP  |
| Combat Quarterly       | Grants 250 Combat XP   |
| Mining Monthly         | Grants 250 Mining XP   |
| Stardew Valley Almanac | Grants 250 Farming XP  |
| Woodcutter's Weekly    | Grants 250 Foraging XP |

### Mastery Powers (5)

| Name             | Skill    | Effect                                                            |
| ---------------- | -------- | ----------------------------------------------------------------- |
| Farming Mastery  | farming  | Golden Animal Crackers can be found (doubles farm animal produce) |
| Mining Mastery   | mining   | Gem-bearing rocks grant twice the gems                            |
| Foraging Mastery | foraging | Golden Mystery Boxes can now be found                             |
| Fishing Mastery  | fishing  | Golden Fishing Treasure Chests can now appear                     |
| Combat Mastery   | combat   | Unlocks trinket equipment slot                                    |

All mastery powers are obtained from the Mastery Cave pedestal after reaching level 10 in all five
skills.

## SpecialItem fields

| Field        | Type            | Description                                      |
| ------------ | --------------- | ------------------------------------------------ |
| id           | string          | Unique kebab-case identifier                     |
| name         | string          | Display name                                     |
| type         | SpecialItemType | Category of item                                 |
| effect       | string          | What this item does when obtained or used        |
| obtainedFrom | string          | How to obtain this item                          |
| image        | string          | Image path relative to package root              |
| skill        | MasterySkill?   | Only present for mastery type — associated skill |

## SpecialItemType values

`"special-item"` | `"book"` | `"skill-book"` | `"mastery"`

## MasterySkill values

`"farming"` | `"mining"` | `"foraging"` | `"fishing"` | `"combat"`
