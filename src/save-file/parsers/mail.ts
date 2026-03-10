import type { SaveSpecialOrders } from '../types';
import { ensureArray, str } from './util';

const QI_ORDER_IDS = new Set([
  'QiChallenge',
  'QiChallenge2',
  'QiChallenge3',
  'QiChallenge4',
  'QiChallenge5',
  'QiChallenge6',
  'QiChallenge7',
  'QiChallenge8',
  'QiChallenge9',
  'QiChallenge10',
  'QiChallenge12',
]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseMail(mailReceived: any): string[] {
  return ensureArray(mailReceived?.string)
    .map((m) => str(m))
    .filter(Boolean);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseSpecialOrders(root: any): SaveSpecialOrders {
  const completed = ensureArray(root.completedSpecialOrders?.string)
    .map((m) => str(m))
    .filter(Boolean);

  const townCompleted = completed.filter((id) => !QI_ORDER_IDS.has(id));
  const qiCompleted = completed.filter((id) => QI_ORDER_IDS.has(id));

  return { completed, townCompleted, qiCompleted };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseBooksRead(player: any): string[] {
  const books: string[] = [];
  const items = ensureArray(player.stats?.Values?.item) as Array<Record<string, unknown>>;
  for (const item of items) {
    const key = String((item.key as Record<string, unknown>)?.string ?? '');
    if (key.startsWith('Book_')) {
      books.push(key.replace('Book_', ''));
    }
  }
  return books;
}
