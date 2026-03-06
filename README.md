# stardew-valley-data

A comprehensive dataset for Stardew Valley — including structured JSON data and image assets for
game items, crops, fish, villagers, and more.

## Installation

```bash
npm install stardew-valley-data
```

## Image Assets

All images are organized under the `images/` directory into the following categories:

| Folder              | Description                                                             |
| ------------------- | ----------------------------------------------------------------------- |
| `animals/`          | Farm animals, pets, and animal produce                                  |
| `artifacts/`        | Museum artifacts and Island Field Office donations                      |
| `artisan-goods/`    | Artisan products (wine, cheese, jelly, etc.)                            |
| `buildings/`        | Farm buildings (barn, coop, shed, cabin, house, etc.)                   |
| `bundles/`          | Community Center bundle icons and images                                |
| `cooking/`          | Cooked dishes and recipes                                               |
| `craftable/`        | Craftable items organized by type (sprinklers, bombs, fertilizer, etc.) |
| `crops/`            | Crops with seed, growth stages, and harvest images                      |
| `fish/`             | Fish, bait, tackle, jelly, trash, and other catchables                  |
| `footwear/`         | Boots and shoes                                                         |
| `forageables/`      | Forageable items by season and location                                 |
| `hats/`             | Hats and headwear                                                       |
| `maps/`             | Farm map icons and full farm map images                                 |
| `medical-supplies/` | Items from Harvey's Clinic                                              |
| `minerals/`         | Ores, bars, gems, geodes, foraged minerals, and mining nodes            |
| `misc/`             | Miscellaneous items (quality icons, currency, golden walnuts, etc.)     |
| `monsters/`         | Monster sprites                                                         |
| `rings/`            | Rings and accessories                                                   |
| `scarecrows/`       | Scarecrow and Rarecrow variants                                         |
| `seasons/`          | Season icons                                                            |
| `shop/`             | Shop inventory items                                                    |
| `skills/`           | Skill icons (Farming, Fishing, Foraging, Mining, Combat)                |
| `special-items/`    | Special items, powers, and books                                        |
| `tools/`            | Tools organized by type                                                 |
| `trees/`            | Fruit trees and regular trees with growth stages                        |
| `villagers/`        | Villager portraits and spouse portraits                                 |
| `weapons/`          | Weapons organized by type (swords, daggers, clubs, slingshots)          |
| `weather/`          | Weather icons                                                           |

### Crop & Tree Structure

Crops and trees follow a consistent folder structure:

```text
crops/
  parsnip/
    seed.png
    stage-1.png
    stage-2.png
    ...
    crop.png
    giant.png       # only for giant crop variants

trees/
  apple/
    seed.png
    stage-1.png
    ...
    stage-5.png
    harvest.png     # tree with fruit
    crop.png        # harvested fruit item
```

### Minerals Structure

```text
minerals/
  ore/              # Copper, Iron, Gold, Iridium, Radioactive ore
  bars/             # Copper, Iron, Gold, Iridium, Radioactive bars + Refined Quartz
  gems/             # Emerald, Ruby, Diamond, etc.
  geodes/           # Geode, Frozen Geode, Magma Geode, Omni Geode + special
  foraged-minerals/ # Quartz, Earth Crystal, Frozen Tear, Fire Quartz
  geode-minerals/   # All minerals found inside geodes
  nodes/            # Mining node sprites
```

## License

MIT
