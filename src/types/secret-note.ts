export type SecretNoteType = 'secret-note' | 'journal-scrap';

export interface SecretNote {
  id: string;
  name: string;
  type: SecretNoteType;
  description: string;
}
