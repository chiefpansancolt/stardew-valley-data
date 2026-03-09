# farmhouse

Farmhouse upgrade tiers and house renovations available from Robin at the Carpenter's Shop.

## Usage

```ts
import { houseRenovations, houseUpgrades } from "stardew-valley-data";

houseUpgrades().sortByTier().get();
houseRenovations().sortByPrice().get();
houseRenovations().free().get();
```

## Factory functions

```ts
function houseUpgrades(source?: HouseUpgrade[]): HouseUpgradeQuery;
function houseRenovations(source?: HouseRenovation[]): HouseRenovationQuery;
```

## HouseUpgradeQuery — filter methods

| Method    | Returns           | Description               |
| --------- | ----------------- | ------------------------- |
| byTier(n) | HouseUpgradeQuery | Filter to a specific tier |

## HouseUpgradeQuery — sort methods

| Method             | Returns           | Description         |
| ------------------ | ----------------- | ------------------- |
| sortByTier(order?) | HouseUpgradeQuery | Sort by tier number |

## HouseUpgradeQuery — terminal methods

| Method           | Returns                   | Description                     |
| ---------------- | ------------------------- | ------------------------------- |
| get()            | HouseUpgrade[]            | All upgrades in current query   |
| first()          | HouseUpgrade \| undefined | First upgrade                   |
| find(id)         | HouseUpgrade \| undefined | Find by ID                      |
| findByName(name) | HouseUpgrade \| undefined | Find by name (case-insensitive) |
| count()          | number                    | Number of upgrades              |

## HouseRenovationQuery — filter methods

| Method             | Returns              | Description                                      |
| ------------------ | -------------------- | ------------------------------------------------ |
| free()             | HouseRenovationQuery | Filter to renovations with no gold cost          |
| withPrerequisite() | HouseRenovationQuery | Filter to renovations that require another first |

## HouseRenovationQuery — sort methods

| Method              | Returns              | Description                 |
| ------------------- | -------------------- | --------------------------- |
| sortByPrice(order?) | HouseRenovationQuery | Sort by cost                |
| sortByName(order?)  | HouseRenovationQuery | Sort alphabetically by name |

## HouseRenovationQuery — terminal methods

| Method           | Returns                      | Description                      |
| ---------------- | ---------------------------- | -------------------------------- |
| get()            | HouseRenovation[]            | All renovations in current query |
| first()          | HouseRenovation \| undefined | First renovation                 |
| find(id)         | HouseRenovation \| undefined | Find by ID                       |
| findByName(name) | HouseRenovation \| undefined | Find by name (case-insensitive)  |
| count()          | number                       | Number of renovations            |

## Examples

```ts
// All upgrades in order
houseUpgrades().sortByTier().get();

// The cellar upgrade
houseUpgrades().find("cellar");

// All renovations sorted cheapest first
houseRenovations().sortByPrice().get();

// Free renovations
houseRenovations().free().get();

// Renovations with prerequisites
houseRenovations().withPrerequisite().get();
```

## House Upgrades (4 total)

Upgrades are sequential — each must be completed before the next. Robin takes 3 days to complete
each upgrade.

| Tier | Name                | Cost     | Materials    |
| ---- | ------------------- | -------- | ------------ |
| 1    | Starting Farmhouse  | Free     | —            |
| 2    | Farmhouse Upgrade 1 | 10,000g  | 450 Wood     |
| 3    | Farmhouse Upgrade 2 | 65,000g  | 100 Hardwood |
| 4    | Cellar              | 100,000g | —            |

## House Renovations (9 total)

Renovations are available after Upgrade 2 and are completed instantly by Robin. All can be refunded
in full provided the expanded area is unoccupied.

| Name               | Cost     | Prerequisite    |
| ------------------ | -------- | --------------- |
| Remove Crib        | Free     | —               |
| Open Bedroom       | 10,000g  | —               |
| Cubby              | 10,000g  | —               |
| Open Dining Room   | 10,000g  | —               |
| Add Corner Room    | 20,000g  | —               |
| Add Southern Room  | 30,000g  | —               |
| Add Attic          | 60,000g  | —               |
| Expand Corner Room | 100,000g | Add Corner Room |
| Dining Room        | 150,000g | —               |

## HouseUpgrade fields

| Field        | Type                   | Description                                      |
| ------------ | ---------------------- | ------------------------------------------------ |
| id           | string                 | Unique kebab-case identifier                     |
| name         | string                 | Display name                                     |
| tier         | number                 | Upgrade tier (1 = starting home, 2–4 = upgrades) |
| cost         | number                 | Cost in gold (0 for the starting farmhouse)      |
| materials    | HouseUpgradeMaterial[] | Materials required in addition to gold           |
| description  | string                 | What this upgrade adds                           |
| image        | string                 | Image path relative to package root              |
| prerequisite | string \| null         | ID of the upgrade that must be done first        |

## HouseUpgradeMaterial fields

| Field    | Type   | Description       |
| -------- | ------ | ----------------- |
| item     | string | Item name         |
| quantity | number | Quantity required |

## HouseRenovation fields

| Field        | Type           | Description                                  |
| ------------ | -------------- | -------------------------------------------- |
| id           | string         | Unique kebab-case identifier                 |
| name         | string         | Display name                                 |
| cost         | number         | Cost in gold (0 for free renovations)        |
| description  | string         | What this renovation adds                    |
| image        | string         | Image path relative to package root          |
| prerequisite | string \| null | ID of the renovation that must be done first |
