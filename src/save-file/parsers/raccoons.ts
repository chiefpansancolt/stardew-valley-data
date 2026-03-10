import type { SaveRaccoons } from '../types';
import { num } from './util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseRaccoons(root: any, mail: Set<string>): SaveRaccoons {
  return {
    timesFed: num(root.timesFedRaccoons),
    daysPlayedWhenLastFinished: num(root.daysPlayedWhenLastRaccoonBundleWasFinished),
    treeFallen: mail.has('raccoonTreeFallen'),
    movedIn: mail.has('raccoonMovedIn'),
  };
}
