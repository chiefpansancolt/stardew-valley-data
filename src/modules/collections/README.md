# Collections

Query items by in-game collection tab. Each accessor resolves stored IDs against all loaded data
modules and returns `{ id, name, image }` for each matched item.

## Usage

```ts
import { collections } from "stardew-valley-data";

// Count items in each collection
collections().fish().count(); // number of resolvable fish items
collections().minerals().count(); // museum mineral donations
collections().artifacts().count(); // museum artifact donations
collections().cooking().count(); // cooked recipes
collections().itemsShipped().count(); // shippable items
collections().crafting().count(); // crafting recipes (populated in future update)

// Get all items in a collection
const fishItems = collections().fish().get();
// → CollectionItem[]  ({ id, name, image })

// Inherited from QueryBase
collections().minerals().first(); // CollectionItem | undefined
collections().artifacts().find("96"); // CollectionItem | undefined
collections().cooking().findByName("Pizza"); // CollectionItem | undefined
```

## Methods

| Method         | Returns             | Description                                                   |
| -------------- | ------------------- | ------------------------------------------------------------- |
| itemsShipped() | CollectionItemQuery | Items that appear in the Items Shipped tab                    |
| fish()         | CollectionItemQuery | Items that appear in the Fish tab                             |
| artifacts()    | CollectionItemQuery | Items that appear in the Artifacts tab                        |
| minerals()     | CollectionItemQuery | Items that appear in the Minerals tab                         |
| cooking()      | CollectionItemQuery | Items that appear in the Cooking tab                          |
| crafting()     | CollectionItemQuery | Items that appear in the Crafting tab (empty until populated) |

## CollectionItemQuery

Returned by all collection methods. Inherits from `QueryBase<CollectionItem>`.

| Method           | Returns                     | Description                     |
| ---------------- | --------------------------- | ------------------------------- |
| get()            | CollectionItem[]            | All resolved items              |
| first()          | CollectionItem \| undefined | First item                      |
| find(id)         | CollectionItem \| undefined | Find by id                      |
| findByName(name) | CollectionItem \| undefined | Find by name (case-insensitive) |
| count()          | number                      | Number of resolved items        |

## Types

```ts
interface CollectionItem {
  id: string;
  name: string;
  image: string;
}
```

## Notes

- IDs are stored in `data/collections.json`. Items not found in any loaded data module are silently
  excluded from results.
- The `crafting` collection is prepped but empty — IDs will be sourced and added in a future update.
