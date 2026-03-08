# Artifacts

All donatable artifacts in Stardew Valley — prehistoric fossils, dwarven relics, and ancient
curiosities. 42 artifacts are included.

---

## Type

### `Artifact`

| Field         | Type           | Description                                     |
| ------------- | -------------- | ----------------------------------------------- |
| id            | string         | Kebab-case identifier                           |
| name          | string         | Display name                                    |
| description   | string         | Flavour text shown in-game                      |
| sellPrice     | number         | Base sell price in gold                         |
| locations     | string[]       | Where to find this artifact (dig spots, drops)  |
| donationNotes | string \| null | Extra notes for museum donation reward, or null |
| image         | string         | Path to the item's icon                         |

---

## Factory

```ts
import { artifacts } from "stardew-valley-data";

artifacts(); // all 42 artifacts
artifacts(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.withDonationNotes()`

Filter to artifacts that have special museum donation rewards (e.g. unlocks a recipe or item).

```ts
artifacts().withDonationNotes().get();
```

#### `.fromFishing()`

Filter to artifacts that can be found in fishing treasure chests.

```ts
artifacts().fromFishing().get();
```

### Sorts

#### `.sortByName(order?: 'asc' | 'desc')`

Sort alphabetically by name. Defaults to `'asc'`.

#### `.sortBySellPrice(order?: 'asc' | 'desc')`

Sort by sell price. Defaults to `'desc'` (most valuable first).

---

### Terminal methods

| Method              | Returns                 | Description                 |
| ------------------- | ----------------------- | --------------------------- |
| `.get()`            | `Artifact[]`            | All results                 |
| `.first()`          | `Artifact \| undefined` | First result                |
| `.find(id)`         | `Artifact \| undefined` | Find by `id`                |
| `.findByName(name)` | `Artifact \| undefined` | Case-insensitive name match |
| `.count()`          | `number`                | Number of results           |

---

## Examples

```ts
import { artifacts } from "stardew-valley-data";

// All artifacts sorted alphabetically
artifacts().sortByName().get();

// Most valuable artifacts
artifacts().sortBySellPrice().get();

// Artifacts with special donation rewards
artifacts().withDonationNotes().get();

// Artifacts obtainable from fishing
artifacts().fromFishing().sortByName().get();

// Look up by id
artifacts().find("dinosaur-egg");
// { id: 'dinosaur-egg', name: 'Dinosaur Egg', sellPrice: 350, ... }

// Look up by name
artifacts().findByName("Ancient Seed");
// { id: 'ancient-seed', donationNotes: 'Donating grants Ancient Seed crafting recipe...', ... }
```
