import type { SaveCommunityCenter } from '../../types';

/** Parse Community Center status using pre-computed mail flags and events. */
export function parseCommunityCenter(mail: Set<string>, events: Set<string>): SaveCommunityCenter {
  return {
    unlocked: mail.has('ccDoorUnlock'),
    bundlesActive: mail.has('wizardJunimoNote'),
    completed: mail.has('ccIsComplete'),
    ceremonyAttended: events.has('191393'),
    jojaAbandoned: mail.has('abandonedJojaMartAccessible'),
    rooms: {
      boilerRoom: mail.has('ccBoilerRoom'),
      craftsRoom: mail.has('ccCraftsRoom'),
      pantry: mail.has('ccPantry'),
      fishTank: mail.has('ccFishTank'),
      vault: mail.has('ccVault'),
      bulletin: mail.has('ccBulletin'),
    },
  };
}
