# field-office

Query fossil donation collections at the Island Field Office on Ginger Island. Donating all items in
a collection earns Golden Walnuts and a sapling reward. Completing all four collections awards the
Ostrich Incubator recipe.

## Usage

```ts
import { fieldOffice, fieldOfficeDonations } from "stardew-valley-data";

// All collections
fieldOffice().count(); // 4

// Large animal collection details
fieldOffice().find("large-animal");

// All individual donations
fieldOfficeDonations().count(); // 9

// Donations for the snake collection
fieldOfficeDonations().byCollection("snake").get();

// Find a specific fossil
fieldOfficeDonations().findByName("Fossilized Skull");
```

## Factory functions

```ts
function fieldOffice(source?: FieldOfficeCollectionData[]): FieldOfficeQuery;
function fieldOfficeDonations(source?: FieldOfficeDonation[]): FieldOfficeDonationQuery;
```

## FieldOfficeQuery filter methods

| Method           | Returns          | Description                           |
| ---------------- | ---------------- | ------------------------------------- |
| byCollection(id) | FieldOfficeQuery | Filter to a specific collection by ID |

## FieldOfficeQuery sort methods

| Method             | Returns          | Description                 |
| ------------------ | ---------------- | --------------------------- |
| sortByName(order?) | FieldOfficeQuery | Sort by name alphabetically |

## FieldOfficeQuery terminal methods

| Method           | Returns                                | Description                          |
| ---------------- | -------------------------------------- | ------------------------------------ |
| get()            | FieldOfficeCollectionData[]            | All collections in the current query |
| first()          | FieldOfficeCollectionData \| undefined | First collection                     |
| find(id)         | FieldOfficeCollectionData \| undefined | Find by collection ID                |
| findByName(name) | FieldOfficeCollectionData \| undefined | Find by name (case-insensitive)      |
| count()          | number                                 | Number of collections                |

## FieldOfficeDonationQuery filter methods

| Method           | Returns                  | Description                          |
| ---------------- | ------------------------ | ------------------------------------ |
| byCollection(id) | FieldOfficeDonationQuery | Filter to donations for a collection |

## FieldOfficeDonationQuery sort methods

| Method             | Returns                  | Description                 |
| ------------------ | ------------------------ | --------------------------- |
| sortByName(order?) | FieldOfficeDonationQuery | Sort by name alphabetically |

## FieldOfficeDonationQuery terminal methods

| Method           | Returns                          | Description                        |
| ---------------- | -------------------------------- | ---------------------------------- |
| get()            | FieldOfficeDonation[]            | All donations in the current query |
| first()          | FieldOfficeDonation \| undefined | First donation                     |
| find(id)         | FieldOfficeDonation \| undefined | Find by item ID                    |
| findByName(name) | FieldOfficeDonation \| undefined | Find by name (case-insensitive)    |
| count()          | number                           | Number of donations                |

## Examples

```ts
// All collections with their rewards
fieldOffice()
  .get()
  .map((c) => ({
    name: c.name,
    walnuts: c.reward.goldenWalnuts,
    item: c.reward.item?.name,
  }));

// What do I need for the large animal collection?
fieldOfficeDonations().byCollection("large-animal").get();
// → [Fossilized Skull ×1, Fossilized Spine ×1, Fossilized Ribs ×1, Fossilized Leg ×2, Fossilized Tail ×1]
```

## Collections

| ID             | Name           | Reward                            |
| -------------- | -------------- | --------------------------------- |
| large-animal   | Large Animal   | 6 Golden Walnuts + Banana Sapling |
| snake          | Snake          | 3 Golden Walnuts + Mango Sapling  |
| mummified-frog | Mummified Frog | 1 Golden Walnut                   |
| mummified-bat  | Mummified Bat  | 1 Golden Walnut                   |

Completing all four collections awards the **Ostrich Incubator** recipe.

## FieldOfficeCollectionData fields

| Field     | Type                  | Description                          |
| --------- | --------------------- | ------------------------------------ |
| id        | FieldOfficeCollection | Collection identifier                |
| name      | string                | Display name                         |
| reward    | FieldOfficeReward     | Reward for completing the collection |
| donations | FieldOfficeDonation[] | Fossil items required                |

## FieldOfficeReward fields

| Field         | Type    | Description                            |
| ------------- | ------- | -------------------------------------- |
| goldenWalnuts | number  | Number of Golden Walnuts awarded       |
| item          | object? | Optional item reward (id, name, image) |

## FieldOfficeDonation fields

| Field       | Type                  | Description                               |
| ----------- | --------------------- | ----------------------------------------- |
| id          | string                | Game item ID                              |
| name        | string                | Display name                              |
| description | string                | Item description                          |
| image       | string                | Image path                                |
| collection  | FieldOfficeCollection | Which collection this donation belongs to |
| quantity    | number                | How many of this item are required        |

## FieldOfficeCollection values

`"large-animal"` | `"snake"` | `"mummified-frog"` | `"mummified-bat"`
