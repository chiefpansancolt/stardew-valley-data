# concessions

Movie Theater concession stand items. Sold by the snack stand inside the Movie Theater for Qi coins.

## Usage

```ts
import { concessions } from "stardew-valley-data";

concessions().sortByPrice().get();
concessions().byTag("healthy").sortByName().get();
concessions().find("stardrop-sorbet");
```

## Factory function

```ts
function concessions(source?: Concession[]): ConcessionQuery;
```

## ConcessionQuery — filter methods

| Method     | Returns         | Description              |
| ---------- | --------------- | ------------------------ |
| byTag(tag) | ConcessionQuery | Filter by concession tag |

## ConcessionQuery — sort methods

| Method              | Returns         | Description                 |
| ------------------- | --------------- | --------------------------- |
| sortByPrice(order?) | ConcessionQuery | Sort by price               |
| sortByName(order?)  | ConcessionQuery | Sort alphabetically by name |

## ConcessionQuery — terminal methods

| Method           | Returns                 | Description                     |
| ---------------- | ----------------------- | ------------------------------- |
| get()            | Concession[]            | All items in current query      |
| first()          | Concession \| undefined | First item                      |
| find(id)         | Concession \| undefined | Find by item ID                 |
| findByName(name) | Concession \| undefined | Find by name (case-insensitive) |
| count()          | number                  | Number of items                 |

## Examples

```ts
// Cheapest items first
concessions().sortByPrice().get();

// Healthy snacks
concessions().byTag("healthy").sortByName().get();

// Gourmet items sorted by price descending
concessions().byTag("gourmet").sortByPrice("desc").get();

// Drinks
concessions().byTag("drink").get();
```

## All items (24 total)

| Name                   | Price  | Tags                  |
| ---------------------- | ------ | --------------------- |
| JojaCorn               | 10g    | joja                  |
| Black Licorice         | 25g    | —                     |
| Joja Cola              | 40g    | drink, cold, joja     |
| Cotton Candy           | 50g    | sweet, candy          |
| Jasmine Tea            | 50g    | drink, hot, healthy   |
| Sour Slimes            | 80g    | sour, candy           |
| Hummus Snack Pack      | 90g    | healthy               |
| Rock Candy             | 90g    | sweet, candy          |
| Fries                  | 100g   | hot, salty, fatty     |
| Nachos                 | 100g   | hot, salty, fatty     |
| Apple Slices           | 100g   | sweet, healthy        |
| Popcorn                | 120g   | hot, salty            |
| Salted Peanuts         | 120g   | salty                 |
| Kale Smoothie          | 120g   | drink, healthy        |
| Chocolate Popcorn      | 130g   | hot, sweet            |
| Star Cookie            | 150g   | sweet                 |
| Personal Pizza         | 150g   | hot, fatty            |
| Salmon Burger          | 150g   | sandwich, burger      |
| Ice Cream Sandwich     | 150g   | sandwich, sweet, cold |
| Truffle Popcorn        | 180g   | gourmet, salty        |
| Panzanella Salad       | 200g   | gourmet, healthy      |
| Cappuccino Mousse Cake | 220g   | sweet, gourmet        |
| Jawbreaker             | 250g   | sweet, candy          |
| Stardrop Sorbet        | 1,250g | sweet, gourmet        |

## Concession fields

| Field | Type            | Description                         |
| ----- | --------------- | ----------------------------------- |
| id    | string          | Unique kebab-case identifier        |
| name  | string          | Display name                        |
| price | number          | Price in Qi coins                   |
| tags  | ConcessionTag[] | Flavor/category tags                |
| image | string          | Image path relative to package root |

## ConcessionTag values

`"sweet"` | `"candy"` | `"drink"` | `"hot"` | `"healthy"` | `"sour"` | `"fatty"` | `"sandwich"` |
`"burger"` | `"cold"` | `"salty"` | `"gourmet"` | `"joja"`
