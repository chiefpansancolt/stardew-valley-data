# perfection

Query the Perfection Tracker categories shown in Qi's Walnut Room. Each category contributes a
weighted percentage toward the overall 100% perfection score.

## Usage

```ts
import { perfection } from "stardew-valley-data";

// All categories
perfection().count(); // 11
perfection().totalWeight(); // 100

// Find a specific category
perfection().find("fish-caught");
perfection().findByName("Fish Caught");

// List all categories with their weights
perfection().get();
```

## Factory function

```ts
function perfection(source?: PerfectionCategory[]): PerfectionQuery;
```

## Terminal methods

| Method           | Returns                         | Description                                    |
| ---------------- | ------------------------------- | ---------------------------------------------- |
| get()            | PerfectionCategory[]            | All categories in the current query            |
| first()          | PerfectionCategory \| undefined | First category                                 |
| find(id)         | PerfectionCategory \| undefined | Find by slug ID (e.g. "fish-caught")           |
| findByName(name) | PerfectionCategory \| undefined | Find by name (case-insensitive)                |
| count()          | number                          | Number of categories in current query          |
| totalWeight()    | number                          | Sum of all category weights (100 for full set) |

## Examples

```ts
// Check weight of a category
perfection().find("golden-clock-on-farm")?.weight; // 10

// List categories sorted by weight descending
perfection()
  .get()
  .sort((a, b) => b.weight - a.weight);
```

## Categories

| ID                       | Name                     | Count | Unit         | Weight |
| ------------------------ | ------------------------ | ----- | ------------ | ------ |
| `produce-forage-shipped` | Produce & Forage Shipped | 154   | items        | 15%    |
| `great-friends`          | Great Friends            | 34    | villagers    | 11%    |
| `golden-clock-on-farm`   | Golden Clock on Farm     | 1     | building     | 10%    |
| `monster-slayer-hero`    | Monster Slayer Hero      | 12    | goals        | 10%    |
| `found-all-stardrops`    | Found All Stardrops      | 7     | stardrops    | 10%    |
| `cooking-recipes-made`   | Cooking Recipes Made     | 81    | recipes      | 10%    |
| `crafting-recipes-made`  | Crafting Recipes Made    | 149   | items        | 10%    |
| `fish-caught`            | Fish Caught              | 72    | species      | 10%    |
| `farmer-level`           | Farmer Level             | 25    | skill levels | 5%     |
| `golden-walnuts-found`   | Golden Walnuts Found     | 130   | walnuts      | 5%     |
| `obelisks-on-farm`       | Obelisks on Farm         | 4     | obelisks     | 4%     |

## PerfectionCategory fields

| Field       | Type   | Description                                         |
| ----------- | ------ | --------------------------------------------------- |
| id          | string | Slug identifier (e.g. "fish-caught")                |
| name        | string | Display name shown in the Perfection Tracker        |
| requirement | string | What must be done to complete this category         |
| count       | number | Number of items/goals/etc. required                 |
| unit        | string | Unit label for count (e.g. "items", "goals")        |
| weight      | number | Percentage weight toward overall perfection (0–100) |
