# special-orders

Special Orders — quests posted on the Special Orders Board in town and in Mr. Qi's Walnut Room.
There are 18 town orders and 10 Qi orders.

## Usage

```ts
import { specialOrders } from "stardew-valley-data";

specialOrders().get();
specialOrders().byType("qi").get();
specialOrders().byRequester("Willy").get();
specialOrders().repeatable().get();
```

## Factory function

```ts
function specialOrders(source?: SpecialOrderData[]): SpecialOrderQuery;
```

## Filter methods

| Method            | Returns           | Description                       |
| ----------------- | ----------------- | --------------------------------- |
| byType(type)      | SpecialOrderQuery | Filter by order type (town or qi) |
| byRequester(name) | SpecialOrderQuery | Filter by requester NPC name      |
| repeatable()      | SpecialOrderQuery | Filter to repeatable orders only  |

## Sort methods

| Method             | Returns           | Description                 |
| ------------------ | ----------------- | --------------------------- |
| sortByName(order?) | SpecialOrderQuery | Sort alphabetically by name |

## Terminal methods

| Method           | Returns                       | Description                     |
| ---------------- | ----------------------------- | ------------------------------- |
| get()            | SpecialOrderData[]            | All orders in current query     |
| first()          | SpecialOrderData \| undefined | First order                     |
| find(id)         | SpecialOrderData \| undefined | Find by ID                      |
| findByName(name) | SpecialOrderData \| undefined | Find by name (case-insensitive) |
| count()          | number                        | Number of orders                |

## Examples

```ts
// All Qi orders
specialOrders().byType("qi").get();

// Orders from Willy
specialOrders().byRequester("Willy").get();

// Repeatable town orders
specialOrders().byType("town").repeatable().get();

// Find by ID
specialOrders().find("QiChallenge2");
```

## SpecialOrderData fields

| Field         | Type                 | Description                             |
| ------------- | -------------------- | --------------------------------------- |
| id            | string               | Game-internal order ID                  |
| name          | string               | Display name                            |
| requester     | string               | NPC who gives the order                 |
| type          | SpecialOrderCategory | "town" or "qi"                          |
| text          | string               | In-game quest description text          |
| prerequisites | string \| null       | Required conditions; `null` if none     |
| timeframe     | number               | Days to complete                        |
| requirements  | string               | What must be done to complete the order |
| rewards       | string               | What is received upon completion        |
| repeatable    | boolean              | Whether the order can be accepted again |

## SpecialOrderCategory values

`"town"` | `"qi"`
