# events

Heart events — cutscenes triggered when you reach specific friendship levels with villagers.
Marriage candidates have events at 2, 4, 6, 8, 10, and 14 hearts. Non-marriage NPCs have events at
various heart levels.

## Usage

```ts
import { events } from "stardew-valley-data";

events().get();
events().byVillager("Abigail").get();
events().byHearts(14).get();
events().marriageEvents().get();
```

## Factory function

```ts
function events(source?: GameEvent[]): EventQuery;
```

## Filter methods

| Method           | Returns    | Description                               |
| ---------------- | ---------- | ----------------------------------------- |
| byVillager(name) | EventQuery | Filter by villager name                   |
| byHearts(n)      | EventQuery | Filter by heart level                     |
| marriageEvents() | EventQuery | Filter to marriage candidate heart levels |

## Sort methods

| Method                 | Returns    | Description           |
| ---------------------- | ---------- | --------------------- |
| sortByHearts(order?)   | EventQuery | Sort by heart level   |
| sortByVillager(order?) | EventQuery | Sort by villager name |

## Terminal methods

| Method           | Returns                | Description                     |
| ---------------- | ---------------------- | ------------------------------- |
| get()            | GameEvent[]            | All events in current query     |
| first()          | GameEvent \| undefined | First event                     |
| find(id)         | GameEvent \| undefined | Find by event ID                |
| findByName(name) | GameEvent \| undefined | Find by name (case-insensitive) |
| count()          | number                 | Number of events                |

## Examples

```ts
// All of Abigail's heart events
events().byVillager("Abigail").sortByHearts().get();

// All 14-heart events
events().byHearts(14).get();

// Check if a specific event ID has been seen
events().find("2481135"); // Abigail 2-heart
```

## GameEvent fields

| Field       | Type   | Description                          |
| ----------- | ------ | ------------------------------------ |
| id          | string | Numeric event ID from the game       |
| villager    | string | Name of the associated villager      |
| hearts      | number | Friendship level required to trigger |
| description | string | Brief description of the event       |
| name        | string | Generated label ("Villager N-Heart") |
