import developmentData from '@/data/joja-development.json';
import type { SaveJoja } from '../../types';

const DEVELOPMENT_IDS = developmentData.map((d: { id: string }) => d.id);

/** Parse Joja membership, development project completion, and route status. */
export function parseJoja(mail: Set<string>, events: Set<string>): SaveJoja {
  return {
    isMember: mail.has('JojaMember'),
    completed: events.has('502261'),
    developments: DEVELOPMENT_IDS.map((id) => ({
      id,
      purchased: mail.has(id),
    })),
  };
}
