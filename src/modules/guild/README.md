# guild

Query items sold at the Adventurer's Guild. Includes weapons, boots, rings, slingshots, ammo, and
decorative furniture. Most items unlock progressively as you reach deeper mine levels.

## Usage

```ts
import { guild } from "stardew-valley-data";

// All items
guild().count(); // 38

// Weapons
guild().weapons().count(); // 20
guild().weapons().byWeaponType("sword").sortByPrice().get();

// Items available at mine level 40
guild().byMineLevel(40).get();

// Galaxy weapons (special availability)
guild()
  .get()
  .filter((i) => i.availability !== undefined);

// Find specific item
guild().find("W9"); // Lava Katana
guild().findByName("Emerald Ring");
```

## Factory function

```ts
function guild(source?: GuildItem[]): GuildQuery;
```

## Filter methods

| Method             | Returns    | Description                                     |
| ------------------ | ---------- | ----------------------------------------------- |
| weapons()          | GuildQuery | Weapons only                                    |
| boots()            | GuildQuery | Boots only                                      |
| rings()            | GuildQuery | Rings only                                      |
| slingshots()       | GuildQuery | Slingshots only                                 |
| byCategory(cat)    | GuildQuery | Filter by GuildCategory                         |
| byWeaponType(type) | GuildQuery | Filter weapons by type (sword, dagger, or club) |
| byMineLevel(level) | GuildQuery | Items unlocked at or below the given mine level |
| alwaysAvailable()  | GuildQuery | Items with no special purchase condition        |

## Sort methods

| Method                  | Returns    | Description                  |
| ----------------------- | ---------- | ---------------------------- |
| sortByPrice(order?)     | GuildQuery | Sort by price (default: asc) |
| sortByName(order?)      | GuildQuery | Sort by name alphabetically  |
| sortByMineLevel(order?) | GuildQuery | Sort by mine level required  |

## Terminal methods

| Method           | Returns                | Description                      |
| ---------------- | ---------------------- | -------------------------------- |
| get()            | GuildItem[]            | All items in the current query   |
| first()          | GuildItem \| undefined | First item                       |
| find(id)         | GuildItem \| undefined | Find by item ID                  |
| findByName(name) | GuildItem \| undefined | Find by name (case-insensitive)  |
| count()          | number                 | Number of items in current query |

## Examples

```ts
// All swords sorted by price
guild().weapons().byWeaponType("sword").sortByPrice().get();

// What unlocks at mine level 80
guild().byMineLevel(80).get();

// Galaxy weapons
guild()
  .get()
  .filter((i) => i.availability === "After obtaining the Galaxy Sword");
```

## GuildItem fields

| Field        | Type             | Description                                |
| ------------ | ---------------- | ------------------------------------------ |
| id           | string           | Game item ID                               |
| name         | string           | Display name                               |
| price        | number           | Purchase price in gold                     |
| description  | string           | Item description                           |
| image        | string           | Image path                                 |
| category     | GuildCategory    | Item category                              |
| weaponType   | GuildWeaponType? | Weapon type (weapons only)                 |
| mineLevel    | number?          | Minimum mine level to unlock               |
| availability | string?          | Purchase condition if not always available |

## GuildCategory values

`"weapon"` | `"boots"` | `"ring"` | `"slingshot"` | `"ammo"` | `"furniture"`

## GuildWeaponType values

`"sword"` | `"dagger"` | `"club"`
