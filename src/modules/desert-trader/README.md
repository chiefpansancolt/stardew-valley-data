# desert-trader

Query barter trades at the Desert Trader. Items are traded for goods rather than gold. Includes
permanent stock and daily rotating trades (Monday–Sunday).

Note: The Desert Trader is closed on Winter 15–17.

## Usage

```ts
import { desertTrader } from "stardew-valley-data";

// All trades
desertTrader().count(); // 26

// Always available trades
desertTrader().permanent().sortByName().get();

// Daily rotating trades
desertTrader().daily().get();

// Everything available on Sunday (permanent + Sunday item)
desertTrader().byDay("Sunday").get();

// Trades using Omni Geodes
desertTrader().byTradeItem("749").get();

// Recipe trades
desertTrader().recipes().get(); // [Warp Totem: Desert (Recipe)]

// Find specific trade
desertTrader().findByName("Dark Piano"); // costs 999 Coal
```

## Factory function

```ts
function desertTrader(source?: DesertTraderItem[]): DesertTraderQuery;
```

## Filter methods

| Method            | Returns           | Description                                                  |
| ----------------- | ----------------- | ------------------------------------------------------------ |
| permanent()       | DesertTraderQuery | Always-available trades only                                 |
| daily()           | DesertTraderQuery | Day-specific rotating trades only                            |
| byDay(day)        | DesertTraderQuery | All trades available on the given day (permanent + that day) |
| recipes()         | DesertTraderQuery | Recipe trades only                                           |
| byTradeItem(id)   | DesertTraderQuery | Trades that use the specified item ID as currency            |
| alwaysAvailable() | DesertTraderQuery | Trades with no special availability condition                |

## Sort methods

| Method                    | Returns           | Description                         |
| ------------------------- | ----------------- | ----------------------------------- |
| sortByTradeAmount(order?) | DesertTraderQuery | Sort by trade amount (default: asc) |
| sortByName(order?)        | DesertTraderQuery | Sort by name alphabetically         |

## Terminal methods

| Method           | Returns                       | Description                     |
| ---------------- | ----------------------------- | ------------------------------- |
| get()            | DesertTraderItem[]            | All trades in the current query |
| first()          | DesertTraderItem \| undefined | First trade                     |
| find(id)         | DesertTraderItem \| undefined | Find by item ID                 |
| findByName(name) | DesertTraderItem \| undefined | Find by name (case-insensitive) |
| count()          | number                        | Number of trades                |

## Examples

```ts
// What trades on Thursday?
desertTrader().byDay("Thursday").get();
// → [permanent trades..., { name: "Magic Rock Candy", tradeItemName: "Prismatic Shard", tradeAmount: 3, day: "Thursday" }]

// Most expensive trade (by quantity)
desertTrader().sortByTradeAmount("desc").first(); // Dark Piano — 999 Coal
```

## Daily Rotation

| Day       | Item                            | Trade           | Amount |
| --------- | ------------------------------- | --------------- | ------ |
| Monday    | Hay                             | Omni Geode      | 1      |
| Tuesday   | Fiber                           | Stone           | 5      |
| Wednesday | Cloth                           | Aquamarine      | 3      |
| Thursday  | Magic Rock Candy                | Prismatic Shard | 3      |
| Friday    | Cheese                          | Emerald         | 1      |
| Saturday  | Spring/Summer/Fall/Winter Seeds | Seasonal Seeds  | 2      |
| Sunday    | Staircase                       | Jade            | 1      |

## DesertTraderItem fields

| Field          | Type             | Description                               |
| -------------- | ---------------- | ----------------------------------------- |
| id             | string           | Game item ID of the item you receive      |
| name           | string           | Display name of the item you receive      |
| description    | string           | Description of the item you receive       |
| image          | string           | Image path of the item you receive        |
| tradeItemId    | string           | ID of the item used to trade              |
| tradeItemName  | string           | Name of the item used to trade            |
| tradeItemImage | string           | Image of the item used to trade           |
| tradeAmount    | number           | Quantity of trade item required           |
| day            | DesertTraderDay? | Day of week this trade is available       |
| isRecipe       | boolean?         | True if sold as a crafting recipe         |
| availability   | string?          | Special condition if not always available |

## DesertTraderDay values

`"Monday"` | `"Tuesday"` | `"Wednesday"` | `"Thursday"` | `"Friday"` | `"Saturday"` | `"Sunday"`
