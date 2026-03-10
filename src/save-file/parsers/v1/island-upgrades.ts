import type { SaveIslandUpgrades } from '../../types';

/** Parse Ginger Island upgrade status using pre-computed mail flags. */
export function parseIslandUpgrades(mail: Set<string>): SaveIslandUpgrades {
  return {
    firstParrot: mail.has('Island_FirstParrot'),
    turtle: mail.has('Island_Turtle'),
    house: mail.has('Island_UpgradeHouse'),
    resort: mail.has('Island_Resort'),
    trader: mail.has('Island_UpgradeTrader'),
    bridge: mail.has('Island_UpgradeBridge'),
    parrotPlatforms: mail.has('Island_UpgradeParrotPlatform'),
    mailbox: mail.has('Island_UpgradeHouse_Mailbox'),
    obelisk: mail.has('Island_W_Obelisk'),
    volcanoBridge: mail.has('Island_VolcanoBridge'),
    volcanoShortcut: mail.has('Island_VolcanoShortcutOut'),
  };
}
