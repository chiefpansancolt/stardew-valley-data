# stardrops

Stardrops — permanent energy-boosting items that increase the player's maximum energy by 34 points
each. There are 7 stardrops in the game, each obtained from a unique source.

## Usage

```ts
import { starDrops } from "stardew-valley-data";

starDrops().get();
starDrops().bySource("purchase").get();
starDrops().find("CF_Mines");
```

## Factory function

```ts
function starDrops(source?: StarDrop[]): StarDropQuery;
```

## Filter methods

| Method        | Returns       | Description                       |
| ------------- | ------------- | --------------------------------- |
| bySource(src) | StarDropQuery | Filter by acquisition source type |

## Sort methods

| Method             | Returns       | Description                 |
| ------------------ | ------------- | --------------------------- |
| sortByName(order?) | StarDropQuery | Sort alphabetically by name |

## Terminal methods

| Method           | Returns               | Description                     |
| ---------------- | --------------------- | ------------------------------- |
| get()            | StarDrop[]            | All stardrops in current query  |
| first()          | StarDrop \| undefined | First stardrop                  |
| find(id)         | StarDrop \| undefined | Find by ID                      |
| findByName(name) | StarDrop \| undefined | Find by name (case-insensitive) |
| count()          | number                | Number of stardrops             |

## Examples

```ts
// All stardrops
starDrops().get();

// Stardrops that can be purchased
starDrops().bySource("purchase").get();

// Find by game-internal ID
starDrops().find("museumComplete");

// Find by name
starDrops().findByName("Mines Stardrop");
```

## All StarDrops (7 total)

| ID             | Name                   | Source      |
| -------------- | ---------------------- | ----------- |
| CF_Fair        | Fair Stardrop          | purchase    |
| CF_Mines       | Mines Stardrop         | exploration |
| CF_Spouse      | Spouse Stardrop        | friendship  |
| CF_Sewer       | Sewers Stardrop        | purchase    |
| CF_Statue      | Secret Woods Stardrop  | exploration |
| CF_Fish        | Master Angler Stardrop | achievement |
| museumComplete | Museum Stardrop        | collection  |

## StarDrop fields

| Field       | Type           | Description                                      |
| ----------- | -------------- | ------------------------------------------------ |
| id          | string         | Game-internal identifier (e.g. "CF_Fair")        |
| name        | string         | Display name                                     |
| description | string         | How to obtain this stardrop                      |
| source      | StarDropSource | Broad category describing the acquisition method |
| image       | string         | Image path relative to package root              |

## StarDropSource values

`"purchase"` | `"exploration"` | `"friendship"` | `"achievement"` | `"collection"`
