# rarecrows

Query builder for the 8 rarecrows in Stardew Valley. Collecting all 8 unlocks the Deluxe Scarecrow
recipe.

## Usage

```ts
import { rarecrows } from "stardew-valley-data";
```

## Factory function

```ts
rarecrows(source?: Rarecrow[]): RarecrowQuery
```

## Sort methods

| Method                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `sortByNumber(order?)` | Sort by rarecrow number. Default: `asc`. |

## Terminal methods

| Method             | Returns                 | Description                      |
| ------------------ | ----------------------- | -------------------------------- |
| `get()`            | `Rarecrow[]`            | All results as an array.         |
| `first()`          | `Rarecrow \| undefined` | First result.                    |
| `find(id)`         | `Rarecrow \| undefined` | Find by exact ID (`"1"`–`"8"`).  |
| `findByName(name)` | `Rarecrow \| undefined` | Find by name (case-insensitive). |
| `count()`          | `number`                | Number of results.               |

## Examples

```ts
// All rarecrows in order
rarecrows().sortByNumber().get();

// Find a specific rarecrow
rarecrows().find("3"); // Casino rarecrow

// Count total
rarecrows().count(); // 8
```

## Rarecrow fields

| Field    | Type     | Description                              |
| -------- | -------- | ---------------------------------------- |
| `id`     | `string` | Rarecrow number as string (`"1"`–`"8"`). |
| `number` | `number` | Rarecrow number (1–8).                   |
| `name`   | `string` | e.g. `"Rarecrow 1"`.                     |
| `image`  | `string` | Path to the rarecrow image.              |
| `obtain` | `string` | How to obtain this rarecrow.             |
