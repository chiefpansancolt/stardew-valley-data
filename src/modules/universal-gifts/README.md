# universal-gifts

Universal gift preferences shared across all giftable villagers in Stardew Valley.

## Usage

```ts
import { universalGifts } from "stardew-valley-data";
```

## Factory function

```ts
universalGifts(): UniversalGifts
```

Returns the full `UniversalGifts` object with all five preference tiers.

## Examples

```ts
const gifts = universalGifts();

// Items loved by all villagers
gifts.loves;
// [{ id: '724', name: 'Prismatic Shard' }, { id: '432', name: 'Rabbit's Foot' }, ...]

// Items hated by all villagers
gifts.hates;
```

## UniversalGifts fields

| Field    | Type                           | Description                                 |
| -------- | ------------------------------ | ------------------------------------------- |
| loves    | { id: string; name: string }[] | Items universally loved by all villagers    |
| likes    | { id: string; name: string }[] | Items universally liked by all villagers    |
| neutral  | { id: string; name: string }[] | Items that are neutral for all villagers    |
| dislikes | { id: string; name: string }[] | Items universally disliked by all villagers |
| hates    | { id: string; name: string }[] | Items universally hated by all villagers    |

Note: Individual villagers may have specific loves/likes that override these universal preferences.
See the `villagers` module for per-villager gift data.
