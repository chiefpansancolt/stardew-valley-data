# locations

Query all 37 Stardew Valley locations, including buildings, shops, dungeons, and natural areas. Each
location includes operating hours, closed days, occupants, and a link to its shop data file.

## Usage

```ts
import { locations } from "stardew-valley-data";

// All Pelican Town locations
locations().byCategory("Pelican Town").get();

// Locations with shops
locations().withShop().sortByName().get();

// Where is Willy?
locations().byOccupant("Willy").first();
// → Fish Shop

// Places closed on Wednesday
locations().closedOn("Wednesday").get();
// → [Pierre's General Store]
```

## Factory function

```ts
function locations(source?: GameLocation[]): LocationQuery;
```

## Filter methods

| Method           | Returns       | Description                                     |
| ---------------- | ------------- | ----------------------------------------------- |
| byType(type)     | LocationQuery | Filter by "location" or "building"              |
| byCategory(cat)  | LocationQuery | Filter by location category                     |
| withShop()       | LocationQuery | Only locations with a linked shop file          |
| alwaysOpen()     | LocationQuery | Locations with no operating hours               |
| closedOn(day)    | LocationQuery | Locations closed on the given day               |
| byOccupant(name) | LocationQuery | Locations with the given NPC (case-insensitive) |

## Sort methods

| Method             | Returns       | Description                 |
| ------------------ | ------------- | --------------------------- |
| sortByName(order?) | LocationQuery | Sort alphabetically by name |

## Terminal methods

| Method           | Returns                   | Description                     |
| ---------------- | ------------------------- | ------------------------------- |
| get()            | GameLocation[]            | All locations in current query  |
| first()          | GameLocation \| undefined | First location                  |
| find(id)         | GameLocation \| undefined | Find by location ID             |
| findByName(name) | GameLocation \| undefined | Find by name (case-insensitive) |
| count()          | number                    | Number of locations             |

## Examples

```ts
// All shops in Pelican Town
locations().byCategory("Pelican Town").withShop().get();

// All Ginger Island locations
locations().byCategory("Ginger Island").get();

// Locations always open (no hours restriction)
locations().alwaysOpen().count();

// Find the Adventurer's Guild
locations().find("adventurers-guild");

// All buildings only
locations().byType("building").get();

// All named geographic areas
locations().byType("location").get();
```

## All locations (37 total)

### The Valley

| Name                   | Category         | Hours           | Closed       | Shop                  |
| ---------------------- | ---------------- | --------------- | ------------ | --------------------- |
| Pelican Town           | The Valley       | Always open     | —            | —                     |
| Blacksmith             | Pelican Town     | 9:00am–4:00pm   | Friday       | blacksmith-shop       |
| Community Center       | Pelican Town     | Always open     | —            | —                     |
| Harvey's Clinic        | Pelican Town     | 9:00am–3:00pm   | —            | medical-supplies-shop |
| JojaMart               | Pelican Town     | 9:00am–11:00pm  | —            | joja-shop             |
| Museum                 | Pelican Town     | 8:00am–6:00pm   | —            | —                     |
| Pierre's General Store | Pelican Town     | 9:00am–5:00pm   | Wednesday    | pierre-shop           |
| The Stardrop Saloon    | Pelican Town     | 12:00pm–12:00am | —            | saloon-shop           |
| The Sewers             | Pelican Town     | Always open     | —            | krobus-shop           |
| Cindersap Forest       | The Valley       | Always open     | —            | —                     |
| Marnie's Ranch         | Cindersap Forest | 9:00am–4:00pm   | Mon, Tue     | marnie-shop           |
| Abandoned House        | Cindersap Forest | Always open     | —            | hats                  |
| Secret Woods           | Cindersap Forest | Always open     | —            | —                     |
| Traveling Cart         | Cindersap Forest | 6:00am–8:00pm   | Mon–Thu, Sat | —                     |
| Wizard's Tower         | Cindersap Forest | 6:00am–11:00pm  | —            | wizard-shop           |

### Beyond the Valley

| Name                | Category          | Hours          | Closed   | Shop               |
| ------------------- | ----------------- | -------------- | -------- | ------------------ |
| The Beach           | Beyond the Valley | Always open    | —        | —                  |
| Fish Shop           | The Beach         | 9:00am–5:00pm  | Saturday | willy-shop         |
| The Mountain        | Beyond the Valley | Always open    | —        | —                  |
| Adventurer's Guild  | The Mountain      | 2:00pm–2:00am  | —        | guild-shop         |
| Carpenter's Shop    | The Mountain      | 9:00am–5:00pm  | Tuesday  | carpenter-shop     |
| The Mines           | The Mountain      | Always open    | —        | dwarf-shop         |
| Railroad            | Beyond the Valley | Always open    | —        | —                  |
| Spa                 | Railroad          | Always open    | —        | —                  |
| Quarry              | The Mountain      | Always open    | —        | —                  |
| Quarry Mine         | Quarry            | Always open    | —        | —                  |
| Mutant Bug Lair     | The Sewers        | Always open    | —        | —                  |
| Witch's Hut         | Railroad          | Always open    | —        | —                  |
| The Desert          | Beyond the Valley | Always open    | —        | —                  |
| Casino              | The Desert        | 9:00am–11:50pm | —        | casino-shop        |
| Desert Trader       | The Desert        | Always open    | —        | desert-trader-shop |
| Oasis               | The Desert        | 9:00am–11:50pm | —        | oasis-shop         |
| Skull Cavern        | The Desert        | Always open    | —        | —                  |
| Ginger Island       | Beyond the Valley | Always open    | —        | —                  |
| Island Field Office | Ginger Island     | Always open    | —        | field-office       |
| Island Trader       | Ginger Island     | Always open    | —        | island-trader-shop |
| Qi's Walnut Room    | Ginger Island     | Always open    | —        | qi-shop            |
| Volcano Dungeon     | Ginger Island     | Always open    | —        | volcano-shop       |

## GameLocation fields

| Field     | Type                  | Description                                     |
| --------- | --------------------- | ----------------------------------------------- |
| id        | string                | Unique kebab-case identifier                    |
| name      | string                | Display name                                    |
| type      | LocationType          | `"location"` (area) or `"building"` (structure) |
| category  | LocationCategory      | Geographic area this location belongs to        |
| image     | string                | Image path relative to package root             |
| openHours | LocationHours \| null | Operating hours, or null if always accessible   |
| closed    | LocationDay[]         | Days of the week this location is closed        |
| address   | string \| null        | In-game address or description                  |
| occupants | string[]              | NPCs who live or work here                      |
| shop      | string \| null        | Base name of the linked shop data file          |

## LocationType values

`"location"` | `"building"`

## LocationCategory values

`"The Valley"` | `"Beyond the Valley"` | `"Pelican Town"` | `"Cindersap Forest"` | `"The Sewers"` |
`"The Beach"` | `"The Mountain"` | `"Railroad"` | `"Quarry"` | `"The Desert"` | `"Ginger Island"`

## LocationDay values

`"Monday"` | `"Tuesday"` | `"Wednesday"` | `"Thursday"` | `"Friday"` | `"Saturday"` | `"Sunday"`

## LocationHours fields

| Field | Type   | Description                         |
| ----- | ------ | ----------------------------------- |
| open  | string | Opening time (e.g. "9:00")          |
| close | string | Closing time (e.g. "4:00", "11:50") |
