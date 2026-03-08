# quests

Quest data for Stardew Valley, sourced from the in-game quest board and wiki.

Covers all 86 quests across three types: 58 Story Quests, 18 Special Orders, and 10 Mr. Qi's Special
Orders.

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

### Filter methods (chainable)

| Method               | Returns      | Description                                                     |
| -------------------- | ------------ | --------------------------------------------------------------- |
| `byType(type)`       | `QuestQuery` | Filter by `'story'`, `'special-order'`, or `'qi-special-order'` |
| `repeatable()`       | `QuestQuery` | Special Orders marked as repeatable only                        |
| `sortByName(order?)` | `QuestQuery` | Sort alphabetically (`'asc'` or `'desc'`, default `'asc'`)      |

### Terminal methods

| Method             | Returns              | Description                           |
| ------------------ | -------------------- | ------------------------------------- |
| `get()`            | `Quest[]`            | All matching quests                   |
| `first()`          | `Quest \| undefined` | First matching quest                  |
| `find(id)`         | `Quest \| undefined` | Lookup by ID (e.g. `'introductions'`) |
| `findByName(name)` | `Quest \| undefined` | Lookup by name (case-insensitive)     |
| `count()`          | `number`             | Number of matching quests             |

---

## Examples

```ts
// All quests
quests().get();

// Story quests only
quests().byType("story").get();

// Special Orders only
quests().byType("special-order").get();

// Mr. Qi's Special Orders only
quests().byType("qi-special-order").get();

// Repeatable Special Orders
quests().repeatable().get();

// All quests sorted alphabetically
quests().sortByName().get();

// Lookup a specific quest
quests().find("introductions");
// { id: 'introductions', type: 'story', name: 'Introductions', ... }

// Find by name
quests().findByName("Prismatic Jelly");
// { id: 'prismatic-jelly', type: 'special-order', ... }

// Count by type
quests().byType("story").count(); // 58
quests().byType("special-order").count(); // 18
quests().byType("qi-special-order").count(); // 10
```

---

## Types

### `Quest`

Discriminated union — narrow with `quest.type`:

```ts
type Quest = StoryQuest | SpecialOrder | QiSpecialOrder;
type QuestType = "story" | "special-order" | "qi-special-order";
```

### Common fields (all types)

| Field          | Type        | Notes                                        |
| -------------- | ----------- | -------------------------------------------- |
| `id`           | `string`    | Kebab-case identifier (e.g. `'rat-problem'`) |
| `type`         | `QuestType` | Quest category                               |
| `name`         | `string`    | Display name                                 |
| `text`         | `string`    | In-game quest description                    |
| `requirements` | `string`    | What must be done to complete the quest      |
| `rewards`      | `string`    | What is received upon completion             |

### `StoryQuest` (`type: 'story'`)

| Field        | Type     | Notes                          |
| ------------ | -------- | ------------------------------ |
| `providedBy` | `string` | Who or what triggers the quest |

### `SpecialOrder` (`type: 'special-order'`)

| Field           | Type             | Notes                                   |
| --------------- | ---------------- | --------------------------------------- |
| `providedBy`    | `string`         | NPC who posts the order                 |
| `prerequisites` | `string \| null` | Required conditions; `null` if none     |
| `timeframe`     | `number`         | Days to complete                        |
| `repeatable`    | `boolean`        | Whether the order can be accepted again |

### `QiSpecialOrder` (`type: 'qi-special-order'`)

| Field       | Type     | Notes            |
| ----------- | -------- | ---------------- |
| `timeframe` | `number` | Days to complete |
