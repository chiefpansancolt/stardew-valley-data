import { parseRarecrows } from '../../../../src/save-file/parsers/v1/rarecrows';

function makeRoot(locations: unknown[]) {
  return { locations: { GameLocation: locations } };
}

function makeLocation(name: string, objectItems: unknown[], buildings: unknown[] = []) {
  return {
    name,
    objects: { item: objectItems },
    buildings: { Building: buildings },
  };
}

function makePlacedObject(name: string, itemId: string) {
  return {
    key: { Vector2: { X: 0, Y: 0 } },
    value: { Object: { name, itemId } },
  };
}

function makeChestObject(items: unknown[]) {
  return {
    key: { Vector2: { X: 1, Y: 1 } },
    value: { Object: { name: 'Chest', itemId: '130', items: { Item: items } } },
  };
}

function makeChestItem(name: string, itemId: string) {
  return { name, itemId };
}

describe('parseRarecrows()', () => {
  it('finds rarecrows placed in location objects', () => {
    const root = makeRoot([
      makeLocation('Farm', [
        makePlacedObject('Rarecrow', '137'),
        makePlacedObject('Scarecrow', '8'),
        makePlacedObject('Rarecrow', '138'),
      ]),
    ]);
    const result = parseRarecrows(root);
    expect(result.placed).toHaveLength(2);
    expect(result.placed).toContain('137');
    expect(result.placed).toContain('138');
  });

  it('finds rarecrows stored in chests', () => {
    const root = makeRoot([
      makeLocation('Farm', [
        makeChestObject([
          makeChestItem('Rarecrow', '110'),
          makeChestItem('Wood', '388'),
          makeChestItem('Rarecrow', '113'),
        ]),
      ]),
    ]);
    const result = parseRarecrows(root);
    expect(result.placed).toHaveLength(2);
    expect(result.placed).toContain('110');
    expect(result.placed).toContain('113');
  });

  it('finds rarecrows in building interior objects', () => {
    const building = {
      indoors: {
        objects: {
          item: [makePlacedObject('Rarecrow', '139')],
        },
      },
    };
    const root = makeRoot([makeLocation('Farm', [], [building])]);
    const result = parseRarecrows(root);
    expect(result.placed).toContain('139');
  });

  it('deduplicates the same rarecrow ID appearing twice', () => {
    const root = makeRoot([
      makeLocation('Farm', [
        makePlacedObject('Rarecrow', '137'),
        makePlacedObject('Rarecrow', '137'),
      ]),
    ]);
    const result = parseRarecrows(root);
    expect(result.placed).toHaveLength(1);
    expect(result.placed).toContain('137');
  });

  it('collects rarecrows across multiple locations', () => {
    const root = makeRoot([
      makeLocation('Farm', [makePlacedObject('Rarecrow', '137')]),
      makeLocation('IslandWest', [makePlacedObject('Rarecrow', '140')]),
    ]);
    const result = parseRarecrows(root);
    expect(result.placed).toContain('137');
    expect(result.placed).toContain('140');
  });

  it('returns empty array when no rarecrows present', () => {
    const root = makeRoot([makeLocation('Farm', [makePlacedObject('Scarecrow', '8')])]);
    expect(parseRarecrows(root).placed).toEqual([]);
  });

  it('returns empty array for empty root', () => {
    expect(parseRarecrows({}).placed).toEqual([]);
  });

  it('handles a single item (not array) in objects', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            objects: {
              item: makePlacedObject('Rarecrow', '136'),
            },
          },
        ],
      },
    };
    const result = parseRarecrows(root);
    expect(result.placed).toContain('136');
  });
});
