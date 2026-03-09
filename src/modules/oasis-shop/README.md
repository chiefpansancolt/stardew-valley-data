# oasis

Query items sold at Sandy's Oasis in the Calico Desert. Includes seeds, daily rotating food/produce,
furniture, clothing, and special items.

## Usage

```ts
import { oasis } from "stardew-valley-data";

// All items
oasis().count(); // 16

// Seeds (always available)
oasis().seeds().sortByPrice().get();

// Daily rotating items
oasis().daily().get();

// Everything available on Friday (permanent + Friday item)
oasis().byDay("Friday").get();

// Clothing items
oasis().clothing().get(); // [Farmer Pants]

// Find specific item
oasis().find("802"); // Cactus Seeds
oasis().findByName("Starfruit Seeds");
```

## Factory function

```ts
function oasis(source?: OasisItem[]): OasisQuery;
```

## Filter methods

| Method            | Returns    | Description                                                 |
| ----------------- | ---------- | ----------------------------------------------------------- |
| seeds()           | OasisQuery | Seed items only                                             |
| food()            | OasisQuery | Food items only                                             |
| clothing()        | OasisQuery | Clothing items only                                         |
| byCategory(cat)   | OasisQuery | Filter by OasisCategory                                     |
| permanent()       | OasisQuery | Always-available items only (no day restriction)            |
| daily()           | OasisQuery | Day-specific rotating items only                            |
| byDay(day)        | OasisQuery | All items available on the given day (permanent + that day) |
| alwaysAvailable() | OasisQuery | Items with no special purchase condition                    |

## Sort methods

| Method              | Returns    | Description                  |
| ------------------- | ---------- | ---------------------------- |
| sortByPrice(order?) | OasisQuery | Sort by price (default: asc) |
| sortByName(order?)  | OasisQuery | Sort by name alphabetically  |

## Terminal methods

| Method           | Returns                | Description                      |
| ---------------- | ---------------------- | -------------------------------- |
| get()            | OasisItem[]            | All items in the current query   |
| first()          | OasisItem \| undefined | First item                       |
| find(id)         | OasisItem \| undefined | Find by item ID                  |
| findByName(name) | OasisItem \| undefined | Find by name (case-insensitive)  |
| count()          | number                 | Number of items in current query |

## Examples

```ts
// What's available on Wednesday?
oasis().byDay("Wednesday").sortByPrice().get();

// Seeds sorted by price
oasis().seeds().sortByPrice().get();
// → [Beet Seeds 20g, Rhubarb Seeds 100g, Cactus Seeds 150g, Starfruit Seeds 400g]
```

## Daily Rotation

| Day       | Item                   | Price |
| --------- | ---------------------- | ----- |
| Monday    | Coconut                | 200g  |
| Tuesday   | Cactus Fruit           | 150g  |
| Wednesday | Omni Geode             | 500g  |
| Thursday  | Deluxe Speed-Gro       | 80g   |
| Friday    | Honey                  | 200g  |
| Saturday  | Quality Retaining Soil | 200g  |
| Sunday    | Ice Cream              | 240g  |

## OasisItem fields

| Field        | Type          | Description                                        |
| ------------ | ------------- | -------------------------------------------------- |
| id           | string        | Game item ID                                       |
| name         | string        | Display name                                       |
| price        | number        | Purchase price in gold                             |
| description  | string        | Item description                                   |
| image        | string        | Image path                                         |
| category     | OasisCategory | Item category                                      |
| day          | OasisDay?     | Day of week this item is available (rotating only) |
| availability | string?       | Purchase condition if not always available         |

## OasisCategory values

`"seed"` | `"food"` | `"furniture"` | `"clothing"` | `"special"`

## OasisDay values

`"Monday"` | `"Tuesday"` | `"Wednesday"` | `"Thursday"` | `"Friday"` | `"Saturday"` | `"Sunday"`
