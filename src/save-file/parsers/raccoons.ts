import type { SaveRaccoons } from '../types';
import { num } from './util';

/** Parse raccoon quest progress from the save file root and pre-computed mail flags. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseRaccoons(root: any, mail: Set<string>): SaveRaccoons {
  return {
    timesFed: num(root.timesFedRaccoons),
    daysPlayedWhenLastFinished: num(root.daysPlayedWhenLastRaccoonBundleWasFinished),
    treeFallen: mail.has('raccoonTreeFallen'),
    movedIn: mail.has('raccoonMovedIn'),
  };
}
