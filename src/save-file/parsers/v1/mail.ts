import specialOrdersData from '@/data/special-orders.json';
import type { SaveSpecialOrders } from '../../types';
import { ensureArray, str } from '../util';

const QI_ORDER_IDS = new Set(
  (specialOrdersData as Array<{ id: string; type: string }>)
    .filter((o) => o.type === 'qi')
    .map((o) => o.id),
);

/** Parse the list of received mail flags from the player's mailReceived node. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseMail(mailReceived: any): string[] {
  return ensureArray(mailReceived?.string)
    .map((m) => str(m))
    .filter(Boolean);
}

/** Parse completed special orders from the save file root, split into town and Qi categories. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseSpecialOrders(root: any): SaveSpecialOrders {
  const completed = ensureArray(root.completedSpecialOrders?.string)
    .map((m) => str(m))
    .filter(Boolean);

  const townCompleted = completed.filter((id) => !QI_ORDER_IDS.has(id));
  const qiCompleted = completed.filter((id) => QI_ORDER_IDS.has(id));

  return { completed, townCompleted, qiCompleted };
}

/** Extract the list of books read from the player node's stats. */
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
