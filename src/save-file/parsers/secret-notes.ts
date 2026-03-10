import type { SaveSecretNotes } from '../types';
import { ensureArray, num } from './util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseSecretNotes(player: any, mail: Set<string>): SaveSecretNotes {
  const allNotes = ensureArray(player.secretNotesSeen?.int).map(num);

  return {
    notesFound: allNotes.filter((n) => n < 1000),
    journalScrapsFound: allNotes.filter((n) => n >= 1000).map((n) => n - 1000),
    hasMagnifyingGlass:
      mail.has('HasMagnifyingGlass') ||
      player.hasMagnifyingGlass === true ||
      player.hasMagnifyingGlass === 'true',
  };
}
