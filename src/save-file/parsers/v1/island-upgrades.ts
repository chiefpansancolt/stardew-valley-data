import upgradeData from '@/data/island-upgrades.json';
import type { SaveIslandUpgrades } from '../../types';

const UPGRADE_IDS = upgradeData.map((u: { id: string }) => u.id);

/** Parse Ginger Island upgrade status using pre-computed mail flags. */
export function parseIslandUpgrades(mail: Set<string>): SaveIslandUpgrades {
  return UPGRADE_IDS.map((id) => ({
    id,
    unlocked: mail.has(id),
  }));
}
