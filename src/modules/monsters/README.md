# monsters

Monster and monster loot data for Stardew Valley.

## Usage

```ts
import { monsterLoot, monsters } from "stardew-valley-data";
```

## Factory functions

```ts
monsters(source?: Monster[]): MonsterQuery
monsterLoot(source?: MonsterLoot[]): MonsterLootQuery
```

---

## MonsterQuery

### Filter methods (chainable)

| Method              | Returns        | Description                                        |
| ------------------- | -------------- | -------------------------------------------------- |
| `byLocation(name)`  | `MonsterQuery` | Monsters found in a location (substring match)     |
| `dropsLoot(lootId)` | `MonsterQuery` | Monsters that drop a specific loot item by ID      |
| `dangerous()`       | `MonsterQuery` | Monsters exclusive to Dangerous Mines/Skull Cavern |
| `standard()`        | `MonsterQuery` | Non-dangerous monsters                             |
| `sortByXp(order?)`  | `MonsterQuery` | Sort by XP granted (`'asc'` or `'desc'`)           |
| `sortByHp(order?)`  | `MonsterQuery` | Sort by HP (`'asc'` or `'desc'`)                   |

### Terminal methods

| Method             | Returns                | Description                         |
| ------------------ | ---------------------- | ----------------------------------- |
| `get()`            | `Monster[]`            | All matching monsters               |
| `first()`          | `Monster \| undefined` | First matching monster              |
| `find(id)`         | `Monster \| undefined` | Lookup by ID (e.g. `'green-slime'`) |
| `findByName(name)` | `Monster \| undefined` | Lookup by name (case-insensitive)   |
| `count()`          | `number`               | Number of matching monsters         |

---

## MonsterLootQuery

### Filter methods (chainable)

| Method          | Returns            | Description                           |
| --------------- | ------------------ | ------------------------------------- |
| `droppedBy(id)` | `MonsterLootQuery` | Loot dropped by a specific monster ID |

### Terminal methods

| Method             | Returns                    | Description                       |
| ------------------ | -------------------------- | --------------------------------- |
| `get()`            | `MonsterLoot[]`            | All matching loot items           |
| `first()`          | `MonsterLoot \| undefined` | First matching item               |
| `find(id)`         | `MonsterLoot \| undefined` | Lookup by item ID (e.g. `'766'`)  |
| `findByName(name)` | `MonsterLoot \| undefined` | Lookup by name (case-insensitive) |
| `count()`          | `number`                   | Number of matching items          |

---

## Examples

```ts
// All monsters
monsters().get();

// Monsters in Skull Cavern
monsters().byLocation("Skull Cavern").get();

// Monsters that drop Void Essence
monsters().dropsLoot("769").get();

// Dangerous-only monsters
monsters().dangerous().get();

// Top 3 highest XP
monsters().sortByXp("desc").get().slice(0, 3);

// All monster loot
monsterLoot().get();

// Loot items dropped by the Serpent
monsterLoot().droppedBy("serpent").get();

// Find a specific loot item
monsterLoot().find("768");
// { id: '768', name: 'Solar Essence', sellPrice: 40, ... }
```

---

## Monster loot items

| ID    | Name          | Sell Price | Dropped By                                                                                |
| ----- | ------------- | ---------- | ----------------------------------------------------------------------------------------- |
| `684` | Bug Meat      | 8g         | Bug, Grub, Cave Fly, Armored Bug, Mutant Fly, Mutant Grub                                 |
| `766` | Slime         | 5g         | All slime variants                                                                        |
| `767` | Bat Wing      | 15g        | Bat, Frost Bat, Lava Bat                                                                  |
| `768` | Solar Essence | 40g        | Ghost, Squid Kid, Metal Head, Hot Head, Mummy, Iridium Bat, Blue Squid, Haunted Skull     |
| `769` | Void Essence  | 50g        | Shadow Brute, Shadow Shaman, Serpent, Royal Serpent, Spider, Shadow Sniper, Haunted Skull |

---

## Monster fields

| Field     | Type     | Notes                                                   |
| --------- | -------- | ------------------------------------------------------- |
| id        | string   | Kebab-case identifier                                   |
| name      | string   | Display name                                            |
| hp        | number   | Hit points                                              |
| damage    | number   | Damage dealt to farmer per hit                          |
| speed     | number   | Movement speed (0 = slowest)                            |
| xp        | number   | Combat XP granted on kill                               |
| image     | string   | Path to monster image                                   |
| locations | string[] | Areas where this monster can be found                   |
| lootIds   | string[] | IDs of classified monster loot this monster drops       |
| dangerous | boolean  | Only found in Dangerous Mines or Dangerous Skull Cavern |

## MonsterLoot fields

| Field     | Type     | Notes                           |
| --------- | -------- | ------------------------------- |
| id        | string   | Game object ID (e.g. `'766'`)   |
| name      | string   | Display name                    |
| sellPrice | number   | Base sell price in gold         |
| image     | string   | Path to loot item image         |
| droppedBy | string[] | Monster IDs that drop this loot |
