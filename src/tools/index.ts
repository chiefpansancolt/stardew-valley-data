import toolData from '@/data/tools.json';
import { Backpack, FishingRod, SimpleTool, Tool, ToolType, UpgradeableTool } from '@/types';

const toolsData: Tool[] = toolData as Tool[];

export class ToolQuery {
  constructor(private data: Tool[] = toolsData) {}

  byType(type: ToolType): ToolQuery {
    return new ToolQuery(this.data.filter((t) => t.type === type));
  }

  upgradeable(): ToolQuery {
    return new ToolQuery(this.data.filter((t): t is UpgradeableTool => t.type === 'upgradeable'));
  }

  fishingRods(): ToolQuery {
    return new ToolQuery(this.data.filter((t): t is FishingRod => t.type === 'fishing-rod'));
  }

  simple(): ToolQuery {
    return new ToolQuery(this.data.filter((t): t is SimpleTool => t.type === 'simple'));
  }

  backpacks(): ToolQuery {
    return new ToolQuery(this.data.filter((t): t is Backpack => t.type === 'backpack'));
  }

  canEnchant(): ToolQuery {
    return new ToolQuery(
      this.data.filter(
        (t): t is UpgradeableTool | FishingRod =>
          t.type !== 'simple' && t.type !== 'backpack' && t.canEnchant,
      ),
    );
  }

  sortByName(order: 'asc' | 'desc' = 'asc'): ToolQuery {
    return new ToolQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  get(): Tool[] {
    return this.data;
  }

  first(): Tool | undefined {
    return this.data[0];
  }

  find(id: string): Tool | undefined {
    return this.data.find((t) => t.id === id);
  }

  findByName(name: string): Tool | undefined {
    const q = name.toLowerCase();
    return this.data.find((t) => t.name.toLowerCase() === q);
  }

  count(): number {
    return this.data.length;
  }
}

export function tools(source: Tool[] = toolsData): ToolQuery {
  return new ToolQuery(source);
}
