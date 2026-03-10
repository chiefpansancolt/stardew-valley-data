# golden-walnuts

Golden Walnuts — collectible currency found on Ginger Island. There are 130 walnuts across 67
sources, tracked via three different mechanisms in the save file.

## Usage

```ts
import { goldenWalnuts } from "stardew-valley-data";

goldenWalnuts().get();
goldenWalnuts().byLocation("Volcano").get();
goldenWalnuts().byTrackingType("limited").get();
goldenWalnuts().totalAmount();
```

## Factory function

```ts
function goldenWalnuts(source?: GoldenWalnut[]): GoldenWalnutQuery;
```

## Filter methods

| Method               | Returns           | Description                                 |
| -------------------- | ----------------- | ------------------------------------------- |
| byLocation(loc)      | GoldenWalnutQuery | Filter by location (case-insensitive match) |
| byTrackingType(type) | GoldenWalnutQuery | Filter by tracking type                     |

## Sort methods

| Method                 | Returns           | Description           |
| ---------------------- | ----------------- | --------------------- |
| sortByLocation(order?) | GoldenWalnutQuery | Sort by location name |
| sortByAmount(order?)   | GoldenWalnutQuery | Sort by walnut amount |

## Terminal methods

| Method           | Returns                   | Description                            |
| ---------------- | ------------------------- | -------------------------------------- |
| get()            | GoldenWalnut[]            | All walnuts in current query           |
| first()          | GoldenWalnut \| undefined | First walnut                           |
| find(id)         | GoldenWalnut \| undefined | Find by ID                             |
| findByName(name) | GoldenWalnut \| undefined | Find by name (case-insensitive)        |
| count()          | number                    | Number of walnut sources               |
| totalAmount()    | number                    | Sum of walnut amounts in current query |

## Examples

```ts
// All walnuts on Island North
goldenWalnuts().byLocation("Island North").get();

// Walnuts tracked in collectedNutTracker (all-at-once)
goldenWalnuts().byTrackingType("all-at-once").totalAmount();

// Limited-count walnuts sorted by amount
goldenWalnuts().byTrackingType("limited").sortByAmount().get();
```

## GoldenWalnut fields

| Field        | Type                     | Description                                   |
| ------------ | ------------------------ | --------------------------------------------- |
| id           | string                   | Unique tracking identifier from the save file |
| name         | string                   | Descriptive name for this walnut source       |
| amount       | number                   | Number of walnuts from this source            |
| location     | string                   | Island area where this walnut is found        |
| hint         | string                   | Description of how to obtain this walnut      |
| trackingType | GoldenWalnutTrackingType | How the game tracks collection of this walnut |

## GoldenWalnutTrackingType values

| Value         | Description                                                      |
| ------------- | ---------------------------------------------------------------- |
| `all-at-once` | Tracked in `collectedNutTracker` — collected or not (53 sources) |
| `limited`     | Tracked in `limitedNutDrops` with a count (13 sources)           |
| `extra`       | Special tracking via `goldenCoconutCracked` boolean (1 source)   |
