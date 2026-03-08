# achievements

Achievement data for Stardew Valley, sourced from the wiki.

Covers all 49 achievements: 39 in-game achievements (shown in the achievement book) and 10
platform-only achievements (Steam, PlayStation, Xbox). Includes 2 secret achievements.

## Usage

```ts
import { achievements } from "stardew-valley-data";
```

## Factory function

```ts
achievements(source?: Achievement[]): AchievementQuery
```

---

## AchievementQuery

### Filter methods (chainable)

| Method               | Returns            | Description                                                |
| -------------------- | ------------------ | ---------------------------------------------------------- |
| `inGame()`           | `AchievementQuery` | In-game achievements only (those with a star icon)         |
| `secret()`           | `AchievementQuery` | Secret achievements only                                   |
| `withReward()`       | `AchievementQuery` | Achievements that grant a reward item                      |
| `sortByName(order?)` | `AchievementQuery` | Sort alphabetically (`'asc'` or `'desc'`, default `'asc'`) |

### Terminal methods

| Method             | Returns                    | Description                        |
| ------------------ | -------------------------- | ---------------------------------- |
| `get()`            | `Achievement[]`            | All matching achievements          |
| `first()`          | `Achievement \| undefined` | First matching achievement         |
| `find(id)`         | `Achievement \| undefined` | Lookup by ID (e.g. `'perfection'`) |
| `findByName(name)` | `Achievement \| undefined` | Lookup by name (case-insensitive)  |
| `count()`          | `number`                   | Number of matching achievements    |

---

## Examples

```ts
// All achievements
achievements().get();

// In-game achievements only (have a star icon)
achievements().inGame().get();

// Platform-only achievements (no star icon)
achievements()
  .get()
  .filter((a) => a.icon === null);

// Secret achievements
achievements().secret().get();

// Achievements that grant a reward
achievements().withReward().sortByName().get();

// In-game achievements with rewards, sorted
achievements().inGame().withReward().sortByName().get();

// Lookup by ID
achievements().find("perfection");
// { id: 'perfection', name: 'Perfection', icon: 'images/achievements/Achievement_Star_10.png', ... }

// Lookup by name
achievements().findByName("Legend");
// { id: 'legend', name: 'Legend', secret: true, reward: 'Sombrero', ... }

// Count breakdowns
achievements().count(); // 49
achievements().inGame().count(); // 39
achievements().secret().count(); // 2
```

---

## Achievement fields

| Field       | Type           | Notes                                                         |
| ----------- | -------------- | ------------------------------------------------------------- |
| id          | string         | Kebab-case identifier (e.g. `'master-angler'`)                |
| name        | string         | Display name                                                  |
| description | string         | Requirement text shown on the achievement                     |
| image       | string         | Path to the platform badge image (JPG); present for all       |
| icon        | string \| null | Path to the in-game star icon (PNG); `null` for platform-only |
| reward      | string \| null | Hat or item reward granted on unlock; `null` if none          |
| secret      | boolean        | Whether the achievement is hidden until unlocked              |

## Images

Two image types are stored in `images/achievements/`:

- **Platform badges** (`Achievement_*.jpg`) — the artwork shown on Steam, PlayStation, and Xbox; one
  per achievement
- **In-game star icons** (`Achievement_Star_*.png`) — the colored star icons shown in the in-game
  achievement book; shared across multiple achievements
