import { QueryBase } from '@/common/query-base';
import secretNotesData from '@/data/secret-notes.json';
import { SecretNote, SecretNoteType } from '@/types';

const allSecretNotes: SecretNote[] = secretNotesData as SecretNote[];

/** Query builder for secret note and journal scrap data. All filter and sort methods return a new SecretNoteQuery for chaining. */
export class SecretNoteQuery extends QueryBase<SecretNote> {
  constructor(data: SecretNote[] = allSecretNotes) {
    super(data);
  }

  /** Filter to notes of the given type. */
  byType(type: SecretNoteType): SecretNoteQuery {
    return new SecretNoteQuery(this.data.filter((n) => n.type === type));
  }

  /** Filter to Secret Notes only (found in The Valley). */
  notes(): SecretNoteQuery {
    return this.byType('secret-note');
  }

  /** Filter to Journal Scraps only (found on Ginger Island). */
  journalScraps(): SecretNoteQuery {
    return this.byType('journal-scrap');
  }
}

/** Returns a SecretNoteQuery for all secret notes and journal scraps. Pass `source` to wrap a pre-filtered array. */
export function secretNotes(source: SecretNote[] = allSecretNotes): SecretNoteQuery {
  return new SecretNoteQuery(source);
}
