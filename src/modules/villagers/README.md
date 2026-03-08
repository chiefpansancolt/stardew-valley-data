# villagers

Villager data for Stardew Valley, including birthdays, gift preferences, and marriage eligibility.

Covers all 34 giftable villagers: 13 marriageable (12 bachelors/bachelorettes + Krobus) and 21
non-marriageable.

## Usage

```ts
import { villagers } from "stardew-valley-data";
```

## Factory function

```ts
villagers(source?: Villager[]): VillagerQuery
```

---

## VillagerQuery

### Filter methods (chainable)

| Method                     | Returns         | Description                                    |
| -------------------------- | --------------- | ---------------------------------------------- |
| `marriageable()`           | `VillagerQuery` | Marriageable villagers only                    |
| `byBirthdaySeason(season)` | `VillagerQuery` | Villagers with a birthday in `season`          |
| `sortByName(order?)`       | `VillagerQuery` | Sort alphabetically (`'asc'` or `'desc'`)      |
| `sortByBirthday()`         | `VillagerQuery` | Sort by birthday (spring → winter, day 1 → 28) |

### Terminal methods

| Method             | Returns                 | Description                       |
| ------------------ | ----------------------- | --------------------------------- |
| `get()`            | `Villager[]`            | All matching villagers            |
| `first()`          | `Villager \| undefined` | First matching villager           |
| `find(id)`         | `Villager \| undefined` | Lookup by ID (e.g. `'abigail'`)   |
| `findByName(name)` | `Villager \| undefined` | Lookup by name (case-insensitive) |
| `count()`          | `number`                | Number of matching villagers      |

---

## Examples

```ts
// All villagers
villagers().get();

// Marriageable villagers only
villagers().marriageable().get();

// Villagers with spring birthdays
villagers().byBirthdaySeason("spring").get();

// All villagers sorted by birthday
villagers().sortByBirthday().get();

// Lookup a specific villager
villagers().find("abigail");
// { id: 'abigail', name: 'Abigail', birthday: { day: 13, season: 'fall' }, ... }

// Who to gift this week (fall, week 2)
villagers()
  .byBirthdaySeason("fall")
  .get()
  .filter((v) => v.birthday.day >= 8 && v.birthday.day <= 14);
```

---

## Villager fields

| Field        | Type                                                                | Notes                                                            |
| ------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| id           | string                                                              | Kebab-case identifier (e.g. `'abigail'`)                         |
| name         | string                                                              | Display name                                                     |
| birthday     | { day: number; season: 'spring' \| 'summer' \| 'fall' \| 'winter' } | In-game birthday                                                 |
| address      | string                                                              | Where the villager lives                                         |
| occupation   | string                                                              | What they do                                                     |
| marriageable | boolean                                                             | Can become a spouse/roommate                                     |
| image        | string                                                              | Path to portrait image                                           |
| spouseImage  | string or undefined                                                 | Path to spouse portrait; present only for marriageable villagers |
| loves        | string[]                                                            | Items they love (specific, not universal loves)                  |
| likes        | string[]                                                            | Items they like beyond universal likes                           |
