import { minerals } from '@/modules/minerals';
import { BarItem, GeodeContainer, MineralItem, NodeItem, OreItem } from '@/types';
import { existsSync } from 'fs';

function checkImage(name: string, image: string): boolean {
  if (existsSync(image)) return true;
  console.error(`  MISSING image for ${name}: ${image}`);
  return false;
}

export function run(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  console.log('\n=== MINERALS ===');
  console.log(
    `Total: ${minerals().count()} (${minerals().mineralItems().count()} minerals, ${minerals().geodes().count()} geodes, ${minerals().ores().count()} ores, ${minerals().bars().count()} bars, ${minerals().nodes().count()} nodes, ${minerals().resources().count()} resources)`,
  );

  // Most valuable minerals
  const top5 = minerals().mineralItems().sortBySellPrice().get().slice(0, 5) as MineralItem[];
  console.log('\nTop 5 minerals by sell price:');
  for (const m of top5) {
    console.log(`  ${m.name} — ${m.sellPrice}g (Gemologist: ${m.gemologistPrice}g)`);
  }

  // Minerals from each geode type
  const geodeTypes = ['Geode', 'Frozen Geode', 'Magma Geode', 'Omni Geode'];
  for (const geodeType of geodeTypes) {
    const items = minerals().fromGeode(geodeType).mineralItems().sortByName();
    console.log(`\n${geodeType} minerals (${items.count()}):`);
    for (const m of items.get() as MineralItem[]) {
      console.log(`  ${m.name} — ${m.sellPrice}g`);
    }
  }

  // Geode containers
  console.log('\nGeode containers:');
  for (const g of minerals().geodes().get() as GeodeContainer[]) {
    console.log(`  [${g.id}] ${g.name} — ${g.sellPrice}g`);
  }

  // Ores
  console.log('\nOres:');
  for (const o of minerals().ores().sortBySellPrice('asc').get() as OreItem[]) {
    console.log(`  [${o.id}] ${o.name} — ${o.sellPrice}g`);
  }

  // Bars
  console.log('\nBars:');
  for (const b of minerals().bars().sortBySellPrice('asc').get() as BarItem[]) {
    console.log(`  [${b.id}] ${b.name} — ${b.sellPrice}g`);
  }

  // Nodes
  console.log('\nMining nodes:');
  for (const n of minerals().nodes().sortByName().get() as NodeItem[]) {
    console.log(`  [${n.id}] ${n.name} — ${n.miningXP} XP`);
  }

  // Resources
  console.log('\nResources:');
  for (const r of minerals().resources().get()) {
    console.log(`  [${r.id}] ${r.name}`);
  }

  // Image validation
  console.log('\n--- Image validation ---');
  for (const m of minerals().sortByName().get()) {
    if (checkImage(m.name, m.image)) passed++;
    else failed++;
  }

  console.log('─'.repeat(60));
  return { passed, failed };
}
