# bookseller-shop

Bookseller shop — books for sale and trade-in offers. The Bookseller (Marcello) visits Pelican Town
twice per season on randomly selected dates.

## Usage

```ts
import { booksellerShop, booksellerTrades } from "stardew-valley-data";

booksellerShop().alwaysAvailable().get();
booksellerShop().byAvailability("rotating-year3").sortByName().get();
booksellerTrades().findByBookId("jewels-of-the-sea");
```

## Factory functions

```ts
function booksellerShop(source?: BooksellerItem[]): BooksellerItemQuery;
function booksellerTrades(source?: BooksellerTrade[]): BooksellerTradeQuery;
```

## BooksellerItemQuery — filter methods

| Method                | Returns             | Description                            |
| --------------------- | ------------------- | -------------------------------------- |
| byAvailability(avail) | BooksellerItemQuery | Filter by availability type            |
| alwaysAvailable()     | BooksellerItemQuery | Shorthand for byAvailability("always") |

## BooksellerItemQuery — sort methods

| Method              | Returns             | Description                 |
| ------------------- | ------------------- | --------------------------- |
| sortByPrice(order?) | BooksellerItemQuery | Sort by price               |
| sortByName(order?)  | BooksellerItemQuery | Sort alphabetically by name |

## BooksellerItemQuery — terminal methods

| Method           | Returns                     | Description                     |
| ---------------- | --------------------------- | ------------------------------- |
| get()            | BooksellerItem[]            | All items in current query      |
| first()          | BooksellerItem \| undefined | First item                      |
| find(id)         | BooksellerItem \| undefined | Find by item ID                 |
| findByName(name) | BooksellerItem \| undefined | Find by name (case-insensitive) |
| count()          | number                      | Number of items                 |

## BooksellerTradeQuery — terminal methods

| Method           | Returns                      | Description                 |
| ---------------- | ---------------------------- | --------------------------- |
| get()            | BooksellerTrade[]            | All trade-in offers         |
| count()          | number                       | Number of trade-in offers   |
| findByBookId(id) | BooksellerTrade \| undefined | Find trade offer by book ID |

## Examples

```ts
// Always-available books
booksellerShop().alwaysAvailable().sortByPrice().get();

// Skill books (rotating, one per visit)
booksellerShop().byAvailability("rotating-skill").get();

// Year 3+ rotating pool
booksellerShop().byAvailability("rotating-year3").sortByName().get();

// What do you get for trading in Jewels Of The Sea?
booksellerTrades().findByBookId("jewels-of-the-sea");
```

## All items (23 total)

### Always Available (5)

| Name                  | Price   |
| --------------------- | ------- |
| Price Catalogue       | 3,000g  |
| Way Of The Wind pt. 1 | 15,000g |
| Horse: The Book       | 25,000g |
| Ol' Slitherlegs       | 25,000g |
| Way Of The Wind pt. 2 | 35,000g |

Note: Way Of The Wind pt. 2 only appears after pt. 1 has been obtained.

### Rotating Skill Books (5, one per visit)

| Name                   | Price (tiered)            |
| ---------------------- | ------------------------- |
| Stardew Valley Almanac | 10,000g / 8,000g / 5,000g |
| Bait And Bobber        | 10,000g / 8,000g / 5,000g |
| Mining Monthly         | 10,000g / 8,000g / 5,000g |
| Combat Quarterly       | 10,000g / 8,000g / 5,000g |
| Woodcutter's Weekly    | 10,000g / 8,000g / 5,000g |

Price decreases each time the book has already been read.

### 25% Chance (1)

| Name          | Price   |
| ------------- | ------- |
| Book Of Stars | 15,000g |

### Rotating Year 3+ (11, one per visit)

| Name                          | Price   |
| ----------------------------- | ------- |
| Dwarvish Safety Manual        | 20,000g |
| Friendship 101                | 20,000g |
| Jack Be Nimble, Jack Be Thick | 20,000g |
| Jewels Of The Sea             | 20,000g |
| Mapping Cave Systems          | 20,000g |
| Monster Compendium            | 20,000g |
| The Alleyway Buffet           | 20,000g |
| The Art O' Crabbing           | 20,000g |
| Treasure Appraisal Guide      | 20,000g |
| Ways Of The Wild              | 20,000g |
| Woody's Secret                | 20,000g |

### Requires 100 Golden Walnuts (1)

| Name                    | Price   |
| ----------------------- | ------- |
| Queen Of Sauce Cookbook | 50,000g |

## Trade-ins (12)

Trade a read book back to Marcello in exchange for items.

| Book Traded                   | Items Received                         | Qty |
| ----------------------------- | -------------------------------------- | --- |
| Book Of Stars                 | Fairy Dust                             | 8   |
| Stardew Valley Almanac        | Pepper Poppers                         | 2   |
| Bait And Bobber               | Deluxe Bait                            | 30  |
| Woodcutter's Weekly           | Wood                                   | 100 |
| Mining Monthly                | Coal                                   | 20  |
| Combat Quarterly              | Monster Musk                           | 1   |
| Jewels Of The Sea             | Cave Jelly or River Jelly or Sea Jelly | 3   |
| Woody's Secret                | Hardwood                               | 20  |
| Jack Be Nimble, Jack Be Thick | Stuffing                               | 3   |
| Monster Compendium            | Slime Egg-Press or Slime Incubator     | 1   |
| Book of Mysteries             | Mystery Box                            | 7   |
| Treasure Appraisal Guide      | Spicy Eel or Artifact Trove            | 3   |

## BooksellerItem fields

| Field        | Type                      | Description                                   |
| ------------ | ------------------------- | --------------------------------------------- |
| id           | string                    | Unique kebab-case identifier                  |
| name         | string                    | Display name                                  |
| availability | BooksellerAvailability    | When this item is available for purchase      |
| price        | number                    | Price in gold (highest tier for tiered items) |
| priceTiers   | [number, number, number]? | Tiered prices for skill books [max, mid, min] |
| image        | string                    | Image path relative to package root           |

## BooksellerTrade fields

| Field           | Type     | Description                                |
| --------------- | -------- | ------------------------------------------ |
| bookId          | string   | ID of the book being traded in             |
| bookName        | string   | Display name of the book                   |
| bookImage       | string   | Image path of the book being traded in     |
| receiveItems    | string[] | Name(s) of item(s) received (random if >1) |
| receiveQuantity | number   | Quantity received                          |

## BooksellerAvailability values

`"always"` | `"rotating-skill"` | `"rotating-year3"` | `"chance"` | `"golden-walnut"`
