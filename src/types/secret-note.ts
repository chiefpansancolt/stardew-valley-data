export type SecretNoteType = 'secret-note' | 'journal-scrap';

export interface SecretNote {
  /** Unique identifier in kebab-case */
  id: string;
  /** Display name (e.g. "Secret Note #1" or "Journal Scrap #1") */
  name: string;
  /** Whether this is a Secret Note or a Ginger Island Journal Scrap */
  type: SecretNoteType;
  /** Text content of the note (image-only notes have a brief description) */
  description: string;
}
