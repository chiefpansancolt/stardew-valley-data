# lost-books

Lost Books found by digging with a Hoe or Scythe. Donating them to Gunther at the Museum unlocks
their text in the library bookcase.

## Usage

```ts
import { lostBooks } from "stardew-valley-data";

lostBooks().get();
lostBooks().find("10");
lostBooks().findByName("Brewmaster's Guide");
```

## Factory function

```ts
function lostBooks(source?: LostBook[]): LostBookQuery;
```

## LostBookQuery — terminal methods

| Method           | Returns               | Description                     |
| ---------------- | --------------------- | ------------------------------- |
| get()            | LostBook[]            | All books in current query      |
| first()          | LostBook \| undefined | First book                      |
| find(id)         | LostBook \| undefined | Find by ID                      |
| findByName(name) | LostBook \| undefined | Find by name (case-insensitive) |
| count()          | number                | Number of books                 |

## Examples

```ts
// All books in collection order
lostBooks().get();

// Find by numeric ID
lostBooks().find("15"); // The Fisherman, Act II

// Find by title
lostBooks().findByName("Mysteries of the Dwarves");
```

## All Lost Books (21 total)

| ID  | Name                             |
| --- | -------------------------------- |
| 1   | Tips on Farming                  |
| 2   | Animals                          |
| 3   | On Foraging                      |
| 4   | The Fisherman, Act I             |
| 5   | How Deep Do The Mines Go?        |
| 6   | An Old Farmer's Journal          |
| 7   | Scarecrows                       |
| 8   | The Secret of the Stardrop       |
| 9   | Journey of the Prairie King      |
| 10  | A Study on Diamond Yields        |
| 11  | Brewmaster's Guide               |
| 12  | Mysteries of the Dwarves         |
| 13  | Highlights From The Book of Yoba |
| 14  | Marriage Guide for Farmers       |
| 15  | The Fisherman, Act II            |
| 16  | Technology Report!               |
| 17  | Secrets of the Legendary Fish    |
| 18  | Gunther's Tunnel Note            |
| 19  | Note From Gunther                |
| 20  | Goblins                          |
| 21  | The Secret Book                  |

## LostBook fields

| Field       | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| id          | string | Numeric ID matching the in-game collection order |
| name        | string | Display name of the book                         |
| description | string | Full text content of the book                    |
