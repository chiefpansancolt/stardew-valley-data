import type { SaveWalnuts } from '../types';
import { ensureArray, num, str } from './util';

/** Parse golden walnut collection progress from the save file root. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseWalnuts(root: any): SaveWalnuts {
  const collected = ensureArray(root.collectedNutTracker?.string)
    .map((s) => str(s))
    .filter(Boolean);

  return {
    found: num(root.goldenWalnutsFound),
    collected,
  };
}
