import { SecretNoteQuery, secretNotes } from '@/modules/secret-notes';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('secretNotes', () => secretNotes());

describe('SecretNoteQuery filters', () => {
  it('notes() returns only secret-note type', () => {
    const results = secretNotes().notes().get();
    expect(results.length).toBeGreaterThan(0);
    for (const n of results) {
      expect(n.type).toBe('secret-note');
    }
  });

  it('journalScraps() returns only journal-scrap type', () => {
    const results = secretNotes().journalScraps().get();
    expect(results.length).toBeGreaterThan(0);
    for (const n of results) {
      expect(n.type).toBe('journal-scrap');
    }
  });

  it('notes() + journalScraps() = all', () => {
    const total = secretNotes().count();
    const notes = secretNotes().notes().count();
    const scraps = secretNotes().journalScraps().count();
    expect(notes + scraps).toBe(total);
  });
});

testFilterImmutability(
  'notes',
  () => secretNotes(),
  (q) => (q as SecretNoteQuery).notes(),
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new SecretNoteQuery().count()).toBeGreaterThan(0);
  });
});
