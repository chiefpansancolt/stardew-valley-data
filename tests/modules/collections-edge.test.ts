/**
 * Edge-case test for collections: farm animal without produce.
 * Uses jest.mock to provide animal data with a farm animal missing produce/deluxeProduce.
 */

const actualAnimals = jest.requireActual('@/data/animals.json') as Array<Record<string, unknown>>;

const animalsWithEdgeCase = [
  ...actualAnimals,
  {
    id: 'mock-no-produce',
    name: 'Mock Animal',
    type: 'farm-animal',
    image: 'images/mock.png',
    // produce and deluxeProduce intentionally omitted
  },
];

jest.mock('@/data/animals.json', () => animalsWithEdgeCase);

describe('collections with farm animal missing produce', () => {
  it('still resolves collection items without crashing', () => {
    const { collections } = require('@/modules/collections');
    const query = collections();
    expect(query.itemsShipped().count()).toBeGreaterThan(0);
  });
});
