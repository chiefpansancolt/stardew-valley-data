# crafting

Query crafting recipes. Each recipe includes its output item (with ID sourced from BigCraftables or
Objects game data), ingredients, category, and unlock source.

## Usage

```ts
import { crafting } from "stardew-valley-data";

// All recipes
crafting().count(); // 150

// Filter by category
crafting().byCategory("Artisan Equipment").get();
crafting().byCategory("Bombs").count(); // 3

// Filter by source
crafting().bySource("Farming Level").get(); // all Farming skill recipes
crafting().bySource("Starter").get(); // always-known recipes

// Find specific recipe
crafting().find("Keg"); // CraftingRecipe | undefined
crafting().findByName("Keg"); // same
crafting().findByOutputId("12"); // find by output item ID

// Sort
crafting().sortByName().get();
crafting().sortByCategory().get();

// Chain
crafting().byCategory("Fishing").sortByName().get();
```

## Factory function

```ts
function crafting(source?: CraftingRecipe[]): CraftingQuery;
```

## Filter methods

| Method               | Returns       | Description                             |
| -------------------- | ------------- | --------------------------------------- |
| byCategory(category) | CraftingQuery | Exact category match (case-insensitive) |
| bySource(source)     | CraftingQuery | Partial source match (case-insensitive) |

## Sort methods

| Method                 | Returns       | Description                |
| ---------------------- | ------------- | -------------------------- |
| sortByName(order?)     | CraftingQuery | Sort by recipe name        |
| sortByCategory(order?) | CraftingQuery | Sort by category then name |

## Terminal methods

| Method             | Returns                     | Description                        |
| ------------------ | --------------------------- | ---------------------------------- |
| get()              | CraftingRecipe[]            | All recipes in the current query   |
| first()            | CraftingRecipe \| undefined | First recipe                       |
| find(id)           | CraftingRecipe \| undefined | Find by recipe id (= recipe name)  |
| findByName(name)   | CraftingRecipe \| undefined | Find by name (case-insensitive)    |
| findByOutputId(id) | CraftingRecipe \| undefined | Find by output item ID             |
| count()            | number                      | Number of recipes in current query |

## Examples

```ts
// All artisan equipment recipes
const artisan = crafting().byCategory("Artisan Equipment").get();
// → [Bee House, Cask, Cheese Press, Dehydrator, Fish Smoker, Keg, Loom, …]

// Recipes unlocked by Fishing skill
const fishingRecipes = crafting().bySource("Fishing Level").get();

// Keg recipe details
const keg = crafting().find("Keg");
// keg.output → { id: "12", name: "Keg", quantity: 1, isBigCraftable: true }
// keg.ingredients → [{ id: "388", name: "Wood", quantity: 30 }, …]
// keg.source → "Farming Level 8"
```

## Categories

| Category           | Count | Description                                |
| ------------------ | ----- | ------------------------------------------ |
| Artisan Equipment  | 10    | Keg, Preserves Jar, Cheese Press, etc.     |
| Bombs              | 3     | Cherry Bomb, Bomb, Mega Bomb               |
| Combat             | 6     | Oil Of Garlic, Life Elixir, etc.           |
| Decor              | 4     | Tub o' Flowers, Wicked Statue, etc.        |
| Farming            | 13    | Scarecrow, Tapper, Slime Incubator, etc.   |
| Fences             | 5     | Wood Fence, Stone Fence, Iron Fence, etc.  |
| Fishing            | 14    | Bait, Crab Pot, Spinner, etc.              |
| Flooring           | 8     | Wood Floor, Stone Floor, etc.              |
| Food               | 1     | Field Snack                                |
| Instruments        | 2     | Drum Block, Flute Block                    |
| Lighting           | 13    | Torch, Campfire, Braziers, Lamp-posts      |
| Misc               | 10    | Staircase, Mini-Obelisk, Farm Computer, …  |
| Paths              | 5     | Wood Path, Gravel Path, etc.               |
| Refining Equipment | 10    | Furnace, Recycling Machine, etc.           |
| Rings              | 7     | Iridium Band, Warrior Ring, etc.           |
| Seeds & Fertilizer | 22    | Basic Fertilizer, Wild Seeds, etc.         |
| Signs              | 4     | Wood Sign, Stone Sign, etc.                |
| Sprinklers         | 3     | Sprinkler, Quality Sprinkler, etc.         |
| Storage            | 5     | Chest, Big Chest, Stone Chest, etc.        |
| Totems             | 9     | Warp Totems, Rain Totem, Cookout Kit, etc. |

## CraftingRecipe fields

| Field       | Type                 | Description                       |
| ----------- | -------------------- | --------------------------------- |
| id          | string               | Recipe name (used as unique ID)   |
| name        | string               | Display name                      |
| description | string               | Item description                  |
| category    | string               | Recipe category (see table above) |
| source      | string               | How the recipe is unlocked        |
| output      | CraftingOutput       | The item produced                 |
| ingredients | CraftingIngredient[] | Required materials                |
| image       | string               | Image path of the output item     |

## CraftingOutput fields

| Field          | Type    | Description                                       |
| -------------- | ------- | ------------------------------------------------- |
| id             | string  | Item ID (from BigCraftables.json or Objects.json) |
| name           | string  | Output item name                                  |
| quantity       | number  | Number of items produced                          |
| isBigCraftable | boolean | Whether the output is a big craftable             |

## CraftingIngredient fields

| Field    | Type   | Description     |
| -------- | ------ | --------------- |
| id       | string | Item ID         |
| name     | string | Ingredient name |
| quantity | number | Amount required |
