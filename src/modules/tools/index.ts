import { QueryBase } from '@/common/query-base';
import toolData from '@/data/tools.json';
import { Backpack, FishingRod, SimpleTool, Tool, ToolType, UpgradeableTool } from '@/types';

const toolsData: Tool[] = toolData as Tool[];

/**
 * Query builder for tool data (upgradeable tools, fishing rods, simple tools, backpacks).
 * All filter and sort methods return a new ToolQuery for chaining.
 */
export class ToolQuery extends QueryBase<Tool> {
  constructor(data: Tool[] = toolsData) {
    super(data);
  }

  /** Filter by tool type string. Use the convenience methods below for type-narrowed results. */
  byType(type: ToolType): ToolQuery {
    return new ToolQuery(this.data.filter((t) => t.type === type));
  }

  /** Filter to upgradeable tools (Hoe, Watering Can, Pickaxe, Axe, Trash Can). */
  upgradeable(): ToolQuery {
    return new ToolQuery(this.data.filter((t): t is UpgradeableTool => t.type === 'upgradeable'));
  }

  /** Filter to fishing rods. */
  fishingRods(): ToolQuery {
    return new ToolQuery(this.data.filter((t): t is FishingRod => t.type === 'fishing-rod'));
  }

  /** Filter to simple tools (no upgrades). */
  simple(): ToolQuery {
    return new ToolQuery(this.data.filter((t): t is SimpleTool => t.type === 'simple'));
  }

  /** Filter to backpacks. */
  backpacks(): ToolQuery {
    return new ToolQuery(this.data.filter((t): t is Backpack => t.type === 'backpack'));
  }

  /** Filter to tools that can be enchanted at the Forge. */
  canEnchant(): ToolQuery {
    return new ToolQuery(
      this.data.filter(
        (t): t is UpgradeableTool | FishingRod =>
          t.type !== 'simple' && t.type !== 'backpack' && t.canEnchant,
      ),
    );
  }

  /** Sort alphabetically by name. Default: `'asc'`. */
  sortByName(order: 'asc' | 'desc' = 'asc'): ToolQuery {
    return new ToolQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }
}

/** Returns a ToolQuery for all tool data. Pass `source` to wrap a pre-filtered array. */
export function tools(source: Tool[] = toolsData): ToolQuery {
  return new ToolQuery(source);
}
