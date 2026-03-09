# blacksmith

Query items sold at the Blacksmith (Clint's shop). Prices increase in Year 2 and beyond.

## Usage

```ts
import { blacksmith } from "stardew-valley-data";

// All items
blacksmith().count(); // 4
blacksmith().get();

// Find specific item
blacksmith().find("378"); // Copper Ore
blacksmith().findByName("Gold Ore");

// Sort by price
blacksmith().sortByPrice(1).get(); // Year 1 prices, ascending
blacksmith().sortByPrice(2, "desc").get(); // Year 2+ prices, descending
```

## Factory function

```ts
function blacksmith(source?: BlacksmithItem[]): BlacksmithQuery;
```

## Sort methods

| Method                     | Returns         | Description                                           |
| -------------------------- | --------------- | ----------------------------------------------------- |
| sortByPrice(year?, order?) | BlacksmithQuery | Sort by year 1 or year 2+ price (default: year 1 asc) |
| sortByName(order?)         | BlacksmithQuery | Sort by name alphabetically                           |

## Terminal methods

| Method           | Returns                     | Description                      |
| ---------------- | --------------------------- | -------------------------------- |
| get()            | BlacksmithItem[]            | All items in the current query   |
| first()          | BlacksmithItem \| undefined | First item                       |
| find(id)         | BlacksmithItem \| undefined | Find by item ID                  |
| findByName(name) | BlacksmithItem \| undefined | Find by name (case-insensitive)  |
| count()          | number                      | Number of items in current query |

## Examples

```ts
// Year 1 prices
blacksmith()
  .get()
  .map((i) => ({ name: i.name, price: i.priceYear1 }));
// → [{ name: "Copper Ore", price: 75 }, { name: "Iron Ore", price: 150 }, ...]

// Cheapest item in Year 2+
blacksmith().sortByPrice(2).first();
// → { name: "Copper Ore", priceYear2: 150, ... }
```

## Items

| Name       | ID  | Year 1 Price | Year 2+ Price |
| ---------- | --- | ------------ | ------------- |
| Copper Ore | 378 | 75g          | 150g          |
| Iron Ore   | 380 | 150g         | 250g          |
| Coal       | 382 | 150g         | 250g          |
| Gold Ore   | 384 | 400g         | 750g          |

## BlacksmithItem fields

| Field       | Type   | Description                         |
| ----------- | ------ | ----------------------------------- |
| id          | string | Game item ID from Objects.json      |
| name        | string | Display name                        |
| description | string | Item description                    |
| priceYear1  | number | Purchase price in Year 1            |
| priceYear2  | number | Purchase price in Year 2 and beyond |
| image       | string | Image path                          |
