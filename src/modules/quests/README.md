# quests

Story quest data for Stardew Valley. Covers 58 story quests from the quest log.

Special orders and Mr. Qi's challenges are in the separate `special-orders` module.

## Usage

```ts
import { quests } from "stardew-valley-data";
```

## Factory function

```ts
quests(source?: Quest[]): QuestQuery
```

---

## QuestQuery

### Sort methods (chainable)

| Method               | Returns      | Description                                                |
| -------------------- | ------------ | ---------------------------------------------------------- |
| `sortByName(order?)` | `QuestQuery` | Sort alphabetically (`'asc'` or `'desc'`, default `'asc'`) |

### Terminal methods

| Method             | Returns              | Description                       |
| ------------------ | -------------------- | --------------------------------- |
| `get()`            | `Quest[]`            | All matching quests               |
| `first()`          | `Quest \| undefined` | First matching quest              |
| `find(id)`         | `Quest \| undefined` | Lookup by ID (e.g. `'9'`)         |
| `findByName(name)` | `Quest \| undefined` | Lookup by name (case-insensitive) |
| `count()`          | `number`             | Number of matching quests         |

---

## Examples

```ts
// All quests
quests().get();

// All quests sorted alphabetically
quests().sortByName().get();

// Lookup a specific quest
quests().find("9");
// { id: '9', name: 'Introductions', ... }

// Find by name
quests().findByName("Rat Problem");

// Count
quests().count(); // 58
```

---

## Types

### `Quest`

| Field        | Type   | Notes                                   |
| ------------ | ------ | --------------------------------------- |
| id           | string | Game quest ID (e.g. `'9'`, `'100'`)     |
| name         | string | Display name                            |
| text         | string | In-game quest description               |
| providedBy   | string | Who or what triggers the quest          |
| requirements | string | What must be done to complete the quest |
| rewards      | string | What is received upon completion        |
