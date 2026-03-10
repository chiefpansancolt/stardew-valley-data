import { tools } from '@/modules/tools';
import { Backpack, FishingRod, SimpleTool, UpgradeableTool } from '@/types';
import { existsSync } from 'fs';

function checkImage(label: string, image: string): boolean {
  if (existsSync(image)) return true;
  console.error(`  MISSING image for ${label}: ${image}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== TOOLS ===');
  console.log(`Total tools: ${tools().count()}`);
  console.log(`  Upgradeable:  ${tools().upgradeable().count()}`);
  console.log(`  Fishing rods: ${tools().fishingRods().count()}`);
  console.log(`  Simple:       ${tools().simple().count()}`);
  console.log(`  Backpacks:    ${tools().backpacks().count()}`);
  console.log(`  Enchantable:  ${tools().canEnchant().count()}`);

  // Upgradeable tools
  console.log('\n--- UPGRADEABLE TOOLS ---');
  for (const tool of tools().upgradeable().get() as UpgradeableTool[]) {
    console.log(`\n  ${tool.name}`);
    for (const level of tool.levels) {
      const costStr = level.upgradeCost
        ? ` — ${level.upgradeCost.toLocaleString()}g + ${level.materialQuantity}x ${level.materialName}`
        : ' — starter';
      console.log(`    [${level.level}]${costStr}`);
      console.log(`      ${level.description}`);
      if (level.image) {
        if (checkImage(`${tool.name} (${level.level})`, level.image)) passed++;
        else failed++;
      }
    }
  }

  // Fishing rods
  console.log('\n--- FISHING RODS ---');
  for (const rod of tools().fishingRods().get() as FishingRod[]) {
    const costStr = rod.cost ? `${rod.cost.toLocaleString()}g` : 'mastery reward';
    const levelStr = rod.fishingLevelRequired ? ` (level ${rod.fishingLevelRequired}+)` : '';
    const features = [
      rod.bait ? 'bait' : null,
      rod.tackleSlots > 0
        ? `${rod.tackleSlots} tackle slot${rod.tackleSlots > 1 ? 's' : ''}`
        : null,
    ]
      .filter(Boolean)
      .join(', ');
    console.log(`  ${rod.name} — ${costStr}${levelStr}${features ? ` [${features}]` : ''}`);
    if (checkImage(rod.name, rod.image)) passed++;
    else failed++;
  }

  // Simple tools
  console.log('\n--- SIMPLE TOOLS ---');
  for (const tool of tools().simple().get() as SimpleTool[]) {
    const costStr = tool.cost ? `${tool.cost.toLocaleString()}g` : 'free';
    console.log(`  ${tool.name} — ${costStr}`);
    if (checkImage(tool.name, tool.image)) passed++;
    else failed++;
  }

  // Backpacks
  console.log('\n--- BACKPACKS ---');
  for (const pack of tools().backpacks().get() as Backpack[]) {
    console.log(`  ${pack.name} — ${pack.cost.toLocaleString()}g (${pack.slots} slots)`);
    if (checkImage(pack.name, pack.image)) passed++;
    else failed++;
  }

  console.log('\n--- Image validation ---');
  console.log(`Images: ${passed} OK, ${failed} missing`);
  console.log('\n' + '─'.repeat(60));
  return { passed, failed };
}
