# island-trader

Query barter trades at the Island Trader on Ginger Island. Items are traded for goods rather than
gold. Includes permanent stock and daily rotating trades (Monday–Sunday), plus special items
available on even days of the month or the last day of the season.

Note: Unlocked after spending 10 Golden Walnuts to purchase the Island Farmhouse.

## Usage

```ts
import { islandTrader } from "stardew-valley-data";

// All trades
islandTrader().count(); // 23

// Always available trades
islandTrader().permanent().sortByName().get();

// Daily rotating trades
islandTrader().daily().get();

// Everything available on Wednesday (permanent + Wednesday item)
islandTrader().byDay("Wednesday").get();

// Trades using Taro Root
islandTrader().byTradeItem("830").get();

// Recipe trades
islandTrader().recipes().get(); // [Banana Pudding, Deluxe Retaining Soil]

// Find specific trade
islandTrader().findByName("Galaxy Soul"); // costs 10 Radioactive Bars
```

## Factory function

```ts
function islandTrader(source?: IslandTraderItem[]): IslandTraderQuery;
```

## Filter methods

| Method            | Returns           | Description                                                  |
| ----------------- | ----------------- | ------------------------------------------------------------ |
| permanent()       | IslandTraderQuery | Always-available trades (no day or special availability)     |
| daily()           | IslandTraderQuery | Day-specific rotating trades only                            |
| byDay(day)        | IslandTraderQuery | All trades available on the given day (permanent + that day) |
| recipes()         | IslandTraderQuery | Recipe trades only                                           |
| byTradeItem(id)   | IslandTraderQuery | Trades that use the specified item ID as currency            |
| alwaysAvailable() | IslandTraderQuery | Trades with no special availability condition                |

## Sort methods

| Method                    | Returns           | Description                         |
| ------------------------- | ----------------- | ----------------------------------- |
| sortByTradeAmount(order?) | IslandTraderQuery | Sort by trade amount (default: asc) |
| sortByName(order?)        | IslandTraderQuery | Sort by name alphabetically         |

## Terminal methods

| Method           | Returns                       | Description                     |
| ---------------- | ----------------------------- | ------------------------------- |
| get()            | IslandTraderItem[]            | All trades in the current query |
| first()          | IslandTraderItem \| undefined | First trade                     |
| find(id)         | IslandTraderItem \| undefined | Find by item ID                 |
| findByName(name) | IslandTraderItem \| undefined | Find by name (case-insensitive) |
| count()          | number                        | Number of trades                |

## Examples

```ts
// What trades on Friday?
islandTrader().byDay("Friday").get();
// → [permanent trades..., { name: "Deluxe Cowboy Hat", tradeItemName: "Taro Root", tradeAmount: 30, day: "Friday" }]

// Most expensive trade (by quantity)
islandTrader().sortByTradeAmount("desc").first(); // Wild Double Bed — 100 Cinder Shards
```

## Daily Rotation

| Day       | Item                | Trade       | Amount |
| --------- | ------------------- | ----------- | ------ |
| Monday    | Small Cap           | Taro Root   | 30     |
| Tuesday   | Palm Wall Ornament  | Pineapple   | 1      |
| Wednesday | Bluebird Mask       | Taro Root   | 30     |
| Thursday  | 'Volcano' Photo     | Mango       | 5      |
| Friday    | Deluxe Cowboy Hat   | Taro Root   | 30     |
| Saturday  | Oceanic Rug         | Blue Discus | 3      |
| Sunday    | Tropical Double Bed | Banana      | 5      |

## Special Availability

| Item           | Trade           | Amount | Condition          |
| -------------- | --------------- | ------ | ------------------ |
| Tropical Chair | Lionfish        | 1      | Even days of month |
| Galaxy Soul    | Radioactive Bar | 10     | Last day of season |

## IslandTraderItem fields

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
| day            | IslandTraderDay? | Day of week this trade is available       |
| isRecipe       | boolean?         | True if sold as a crafting recipe         |
| availability   | string?          | Special condition if not always available |

## IslandTraderDay values

`"Monday"` | `"Tuesday"` | `"Wednesday"` | `"Thursday"` | `"Friday"` | `"Saturday"` | `"Sunday"`
